import { astChildren, mapAst } from "lib/transformers/astTraversal";
import {
  createDelaySimulationContext,
  evaluateAtTick,
} from "lib/transformers/delaySimulation";
import {
  getNetworkDefLastCardIds,
  getRefInfo,
  getRefName,
} from "lib/transformers/NetworkCards";

const VALUE_WRAPPERS = new Set<TypeAST.AST["type"]>([
  "Materialize",
  "Static",
  "Dynamic",
  "Display",
  "Card",
]);

interface DefinitionValues {
  byName: Map<string, TypeAST.AST>;
  bySegment: Map<number, TypeAST.AST>;
  byCardId: Map<string, TypeAST.AST>;
}

export const isDelayValueNode = (node: TypeAST.AST): boolean => {
  let current: TypeAST.AST = node;
  while (VALUE_WRAPPERS.has(current.type)) {
    current = (current as { value: TypeAST.AST }).value;
  }
  return current.type === "Delay";
};

export const astContainsDelay = (
  node: TypeAST.AST,
  seen: Set<TypeAST.AST> = new Set()
): boolean => {
  if (node.type === "Delay") return true;
  if (seen.has(node)) return false;
  seen.add(node);
  return astChildren(node).some((child) => astContainsDelay(child, seen));
};

const withVarName = (
  node: TypeAST.AST,
  varName: string | undefined
): TypeAST.AST => (varName === undefined ? node : { ...node, varName });

const referencedValue = (
  node: TypeAST.AST,
  values: DefinitionValues
): TypeAST.AST | undefined => {
  if (node.type === "Variable") {
    const key = node.label ?? node.id;
    return key === undefined ? undefined : values.byName.get(key);
  }
  if (node.type === "Integer") {
    if (getRefInfo(node) === undefined) return undefined;
    const byCardId = values.byCardId.get(node.value);
    if (byCardId !== undefined) return byCardId;
  }
  const refName = getRefName(node);
  if (refName === undefined) return undefined;
  const target = refName.slice(1);
  if (/^\d+$/.test(target)) {
    return values.bySegment.get(Number(target)) ?? values.byName.get(target);
  }
  return values.byName.get(target);
};

const collectRefKeys = (
  node: TypeAST.AST,
  keys: { cardId?: string; name?: string }[] = [],
  seen: Set<TypeAST.AST> = new Set()
): { cardId?: string; name?: string }[] => {
  if (node.type === "Variable") {
    keys.push({ name: node.label ?? node.id });
    return keys;
  }
  if (node.type === "Integer" && getRefInfo(node) !== undefined) {
    keys.push({ cardId: node.value });
    return keys;
  }
  if (seen.has(node)) return keys;
  seen.add(node);
  for (const child of astChildren(node)) collectRefKeys(child, keys, seen);
  return keys;
};

const substituteRefs = (
  node: TypeAST.AST,
  values: DefinitionValues,
  seen: Set<TypeAST.AST> = new Set()
): TypeAST.AST => {
  const value = referencedValue(node, values);
  if (value !== undefined) return value;
  if (seen.has(node)) return node;
  seen.add(node);
  return mapAst(node, (child) => substituteRefs(child, values, seen));
};

const withReplacedNode = (
  definition: TypeAST.NetworkCards["definitions"][number],
  node: TypeAST.AST
): TypeAST.NetworkCards["definitions"][number] => {
  const replacement = { ...definition, node };
  const descriptor = Object.getOwnPropertyDescriptor(
    definition,
    "segmentIndex"
  );
  if (descriptor !== undefined) {
    Object.defineProperty(replacement, "segmentIndex", descriptor);
  }
  return replacement;
};

export const foldDelayDependent = (
  ast: TypeAST.AST,
  targetTick: number,
  startVariableId = 0
): TypeAST.AST => {
  if (ast.type !== "NetworkCards") {
    if (!astContainsDelay(ast) || isDelayValueNode(ast)) return ast;
    const value = evaluateAtTick(ast, targetTick);
    return value === undefined ? ast : withVarName(value, ast.varName);
  }

  const values: DefinitionValues = {
    byName: new Map(),
    bySegment: new Map(),
    byCardId: new Map(),
  };
  const lastCardIds = getNetworkDefLastCardIds(ast, startVariableId);
  const context = createDelaySimulationContext(
    new Map(
      ast.definitions
        .filter((definition) => definition.name !== "")
        .map((definition) => [definition.name, definition.node] as const)
    )
  );
  const dependentNames = new Set<string>();
  const dependentCardIds = new Set<string>();
  let changed = false;
  const definitions = ast.definitions.map((definition) => {
    const cardId = lastCardIds.get(definition.node);
    const resolved = substituteRefs(definition.node, values);
    const value = evaluateAtTick(resolved, targetTick, context);
    if (value !== undefined) {
      if (definition.name !== "") values.byName.set(definition.name, value);
      if (definition.segmentIndex !== undefined) {
        values.bySegment.set(definition.segmentIndex, value);
        values.byName.set(`#${definition.segmentIndex}`, value);
      }
      if (cardId !== undefined) values.byCardId.set(String(cardId), value);
    }

    const dependsOnDelay =
      astContainsDelay(definition.node) ||
      collectRefKeys(definition.node).some((key) =>
        key.cardId !== undefined
          ? dependentCardIds.has(key.cardId)
          : key.name !== undefined && dependentNames.has(key.name)
      );
    if (dependsOnDelay) {
      if (definition.name !== "") dependentNames.add(definition.name);
      if (definition.segmentIndex !== undefined) {
        dependentNames.add(`#${definition.segmentIndex}`);
      }
      if (cardId !== undefined) dependentCardIds.add(String(cardId));
    }

    if (
      value === undefined ||
      !dependsOnDelay ||
      isDelayValueNode(definition.node)
    ) {
      return definition;
    }
    changed = true;
    const varName = definition.node.varName ?? (definition.name || undefined);
    return withReplacedNode(definition, withVarName(value, varName));
  });

  return changed ? { ...ast, definitions } : ast;
};
