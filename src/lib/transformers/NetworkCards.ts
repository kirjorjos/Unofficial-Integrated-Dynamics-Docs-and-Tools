import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { flattenAnonymousBaseOperatorApplication } from "lib/transformers/helpers";
import type { NormalizedSegment } from "lib/transformers/MixedLists";
import { astChildren } from "lib/transformers/astTraversal";
import { getSourceCards } from "lib/transformers/sourceNodes";

export const isVarRefNode = (node: TypeAST.AST): node is TypeAST.Variable =>
  node.type === "Variable" &&
  (node.id !== undefined || node.label !== undefined);

export const varRefName = (node: TypeAST.Variable): `@${string}` => {
  if (node.label !== undefined) return `@${node.label}`;
  if (node.id !== undefined) return `@${node.id}`;
  throw new Error("A Variable node requires an id or a label");
};

export const assertValidVariable = (node: TypeAST.Variable): void => {
  if (node.id === undefined && node.label === undefined) {
    throw new Error("A Variable node requires an id or a label");
  }
  if (node.id !== undefined && !/^\d+$/.test(node.id)) {
    throw new Error(`Invalid variable id "${node.id}": expected a decimal id`);
  }
};

export const astContentKey = (ast: TypeAST.AST): string => {
  switch (ast.type) {
    case "Operator":
      return `Operator:${ast.opName}`;
    case "Curry":
      return `Curry:${astContentKey(ast.base)}(${ast.args
        .map(astContentKey)
        .join(",")})`;
    case "Pipe":
      return `Pipe(${astContentKey(ast.op1)},${astContentKey(ast.op2)})`;
    case "Pipe2":
      return `Pipe2(${astContentKey(ast.op1)},${astContentKey(ast.op2)},${astContentKey(ast.op3)})`;
    case "Flip":
      return `Flip(${astContentKey(ast.arg)})`;
    case "List":
      return `List[${ast.value.map(astContentKey).join(",")}]`;
    case "Lambda":
      return `Lambda(${ast.params
        .map((param) => `${param.name}:${param.type ?? "Any"}`)
        .join(",")})=>${astContentKey(ast.body)}|text:${
        ast.text === undefined ? "<none>" : JSON.stringify(ast.text)
      }`;
    case "Param":
      return `Param:${ast.index}:${ast.binderDepth ?? 0}:${ast.name ?? ""}`;
    case "Variable":
      return `Variable:${ast.id ?? ""}:${ast.label ?? ""}:${ast.valueType ?? ""}`;
    case "String":
      return `String:${ast.value}`;
    case "Boolean":
      return `Boolean:${ast.value}`;
    case "Integer":
    case "Long":
    case "Double":
      return `${ast.type}:${ast.value}`;
    case "Null":
      return "Null";
    case "NBT":
      return `NBT:${JSON.stringify(ast.value)}`;
    case "Block":
    case "Item":
    case "Fluid":
    case "Entity":
    case "Ingredients":
    case "Recipe":
      return `${ast.type}:${JSON.stringify(ast.value)}`;
    case "Reader":
      return `Reader:${ast.value.reader}:${ast.value.aspect}:${ast.value.partId ?? ""}:${
        ast.value.settings ? JSON.stringify(ast.value.settings) : ""
      }:${ast.value.simulatedOutput ? astContentKey(ast.value.simulatedOutput) : ""}`;
    case "Materialize":
    case "Dynamic":
    case "Static":
    case "Display":
    case "Card":
      return `${ast.type}:${astContentKey(ast.value)}`;
    case "VarStore":
      return `VarStore:${ast.value.id ?? ""}:[${ast.value.cards
        .map(astContentKey)
        .join(",")}]`;
    case "DisplayPanel":
    case "Writer":
    case "Exporter":
    case "Importer": {
      const partType =
        ast.type === "DisplayPanel"
          ? "integrateddynamics:display_panel"
          : ast.value.partType;
      return `${ast.type}:${partType}:${ast.value.id ?? ""}:${
        ast.value.settings ? JSON.stringify(ast.value.settings) : ""
      }:[${getSourceCards(ast).map(astContentKey).join(",")}]`;
    }
    case "NetworkCards":
      return `NetworkCards[${ast.definitions
        .map((d) => `${d.name}:${astContentKey(d.node)}`)
        .join(",")}]`;
    default:
      return (ast as TypeAST.AST).type;
  }
};

export const MAX_APPLY_ARGS = 3;

export const applyOperatorKeyForArgs = (argCount: number): TypeOperatorKey => {
  switch (argCount) {
    case 0:
      return "OPERATOR_APPLY_0";
    case 2:
      return "OPERATOR_APPLY_2";
    case 3:
      return "OPERATOR_APPLY_3";
    default:
      return "OPERATOR_APPLY";
  }
};

export const getCurryChunks = (
  ast: TypeAST.Curried
): { args: TypeAST.AST[] }[] => {
  const flattened = flattenAnonymousBaseOperatorApplication(ast);
  if (flattened?.fullyApplied) return [];

  const chunks: { args: TypeAST.AST[] }[] = [];
  const isApplyN =
    ast.base.type === "Operator" &&
    operatorRegistry[ast.base.opName]?.internalName ===
      "integrateddynamics:operator_apply_n";

  const maxTake = ast.base.type === "Operator" ? 1 : MAX_APPLY_ARGS;

  let currentBase: TypeAST.Operator = ast.base;
  let index = 0;

  while (index < ast.args.length) {
    let take = Math.max(1, Math.min(maxTake, ast.args.length - index));
    if (isApplyN && index === 0 && ast.args.length >= 2) {
      take = 2;
    }

    const chunkArgs = ast.args.slice(index, index + take);
    chunks.push({ args: chunkArgs });

    currentBase = {
      type: "Curry",
      base: currentBase,
      args: chunkArgs,
    } as TypeAST.Curried;
    index += take;
  }

  return chunks;
};

export const countCards = (
  ast: TypeAST.AST,
  seen: Set<TypeAST.AST>,
  contentSeen: Set<string>
): number => {
  if (seen.has(ast)) return 0;

  const contentKey = astContentKey(ast);
  if (contentSeen.has(contentKey)) return 0;

  seen.add(ast);
  contentSeen.add(contentKey);

  switch (ast.type) {
    case "Operator":
      return 1;
    case "Curry": {
      const flattened = flattenAnonymousBaseOperatorApplication(ast);
      if (flattened?.fullyApplied && flattened.operator.type === "Operator") {
        let count = 1;
        for (const arg of flattened.args) {
          count += countCards(arg, seen, contentSeen);
        }
        return count;
      }
      let count = countCards(ast.base, seen, contentSeen);
      for (const chunk of getCurryChunks(ast)) {
        for (const arg of chunk.args) {
          count += countCards(arg, seen, contentSeen);
        }
        count += 1;
      }
      return count;
    }
    case "Pipe":
      return (
        1 +
        countCards(ast.op1, seen, contentSeen) +
        countCards(ast.op2, seen, contentSeen)
      );
    case "Pipe2":
      return (
        1 +
        countCards(ast.op1, seen, contentSeen) +
        countCards(ast.op2, seen, contentSeen) +
        countCards(ast.op3, seen, contentSeen)
      );
    case "Flip":
      return 1 + countCards(ast.arg, seen, contentSeen);
    case "Display":
    case "Card":
      return countCards(ast.value, seen, contentSeen);
    case "VarStore":
    case "DisplayPanel":
    case "Writer":
    case "Exporter":
    case "Importer": {
      let count = 0;
      for (const card of getSourceCards(ast)) {
        count += countCards(card, seen, contentSeen);
      }
      return count;
    }
    case "List": {
      let count = 1;
      for (const entry of ast.value) {
        count += countCards(entry, seen, contentSeen);
      }
      return count;
    }
    default:
      return 1;
  }
};

export interface ResolvedRefInfo {
  segmentIndex?: number;
  isFinalCalculation: boolean;
}

const REF_INFO = "__resolvedRef";
const REF_NAME = "__resolvedRefName";

export const getRefInfo = (node: TypeAST.AST): ResolvedRefInfo | undefined =>
  (node as unknown as Record<string, ResolvedRefInfo | undefined>)[REF_INFO];

export const getRefName = (node: TypeAST.AST): string | undefined =>
  (node as unknown as Record<string, string | undefined>)[REF_NAME];

const resolveVarRefs = (
  node: TypeAST.AST,
  resolve: (ref: TypeAST.Variable) => { id: string; info: ResolvedRefInfo }
): void => {
  if (isVarRefNode(node)) {
    assertValidVariable(node);
    const refName = varRefName(node);
    const { id, info } = resolve(node);
    (node as unknown as { type: string; value?: string }).type = "Integer";
    (node as unknown as { value?: string }).value = id;
    delete (node as unknown as { id?: string }).id;
    delete (node as unknown as { label?: string }).label;
    delete (node as unknown as { valueType?: string }).valueType;
    Object.defineProperty(node, REF_INFO, {
      value: info,
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(node, REF_NAME, {
      value: refName,
      enumerable: false,
      configurable: true,
    });
    return;
  }

  switch (node.type) {
    case "Curry":
      resolveVarRefs(node.base, resolve);
      for (const arg of node.args) resolveVarRefs(arg, resolve);
      break;
    case "Pipe":
      resolveVarRefs(node.op1, resolve);
      resolveVarRefs(node.op2, resolve);
      break;
    case "Pipe2":
      resolveVarRefs(node.op1, resolve);
      resolveVarRefs(node.op2, resolve);
      resolveVarRefs(node.op3, resolve);
      break;
    case "Flip":
      resolveVarRefs(node.arg, resolve);
      break;
    case "List":
      for (const entry of node.value) resolveVarRefs(entry, resolve);
      break;
    case "Reader":
      if (node.value.simulatedOutput) {
        resolveVarRefs(node.value.simulatedOutput, resolve);
      }
      break;
    case "Materialize":
    case "Dynamic":
    case "Static":
    case "Display":
    case "Card":
      resolveVarRefs(node.value, resolve);
      break;
    case "VarStore":
    case "DisplayPanel":
    case "Writer":
    case "Exporter":
    case "Importer":
      for (const card of getSourceCards(node)) resolveVarRefs(card, resolve);
      break;
    case "Lambda":
      resolveVarRefs(node.body, resolve);
      break;
    default:
      break;
  }
};

export const buildNetworkCards = (
  segments: NormalizedSegment[],
  startVariableId = 0,
  names?: string[]
): TypeAST.NetworkCards => {
  if (segments.length === 0) {
    throw new Error("NetworkCards must contain at least one definition");
  }

  const definitions: {
    name: string;
    node: TypeAST.AST;
    segmentIndex?: number;
  }[] = [];
  const segmentFlatIndex: number[] = [];
  const nameToIndex = new Map<string, number>();

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]!;
    for (const hoisted of segment.hoisted) {
      definitions.push({ name: hoisted.name, node: hoisted.node });
      nameToIndex.set(hoisted.name, definitions.length - 1);
    }
    const segmentName = names?.[i] ?? segment.node.varName ?? "";
    definitions.push({ name: segmentName, node: segment.node });
    if (segmentName) nameToIndex.set(segmentName, definitions.length - 1);
    segmentFlatIndex[i] = definitions.length - 1;
    Object.defineProperty(definitions[definitions.length - 1], "segmentIndex", {
      value: i,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  const finalSegmentDefIndex = segmentFlatIndex[segments.length - 1]!;

  const resolveRefIndex = (
    ref: TypeAST.Variable,
    refName: string,
    currentIndex: number
  ): number => {
    if (ref.label === "calculation" || refName === "@calculation") {
      if (finalSegmentDefIndex === currentIndex) {
        throw new Error(
          `Card reference @calculation points at the definition it is used in, so it has no card to refer to (definition ${currentIndex})`
        );
      }
      return finalSegmentDefIndex;
    }
    let index: number | undefined;
    if (ref.label !== undefined) {
      index = nameToIndex.get(ref.label);
    } else if (ref.id !== undefined) {
      const segmentIndex = parseInt(ref.id, 10);
      index = segmentFlatIndex[segmentIndex];
    }
    if (index === undefined) {
      throw new Error(`Unknown card reference: ${refName}`);
    }
    if (index >= currentIndex) {
      throw new Error(
        `Card reference ${refName} points to a card that is not created yet (referenced from definition ${currentIndex})`
      );
    }
    return index;
  };

  const seen = new Set<TypeAST.AST>();
  const prefixSums: number[] = [];
  let cumulative = 0;
  for (let i = 0; i < definitions.length; i++) {
    cumulative += countCards(definitions[i]!.node, seen, new Set());
    prefixSums[i] = cumulative;
  }

  for (let i = 0; i < definitions.length; i++) {
    const definition = definitions[i]!;
    resolveVarRefs(definition.node, (ref) => {
      const index = resolveRefIndex(ref, varRefName(ref), i);
      const id = startVariableId + prefixSums[index]! - 1;
      return {
        id: String(id),
        info: {
          segmentIndex: definitions[index]!.segmentIndex,
          isFinalCalculation: index === finalSegmentDefIndex,
        },
      };
    });
  }

  return { type: "NetworkCards", definitions };
};

export const assertNoVarRefs = (ast: TypeAST.AST): void => {
  resolveVarRefs(ast, () => {
    throw new Error(
      "@-references are only valid inside a multi-statement (network) input"
    );
  });
};

export const assertNoTopLevelVarRefs = (ast: TypeAST.AST): void => {
  const visit = (node: TypeAST.AST, insideLambda: boolean): void => {
    if (isVarRefNode(node)) {
      if (insideLambda) return;
      throw new Error(
        "@-references are only valid inside a multi-statement (network) input"
      );
    }
    if (node.type === "Lambda") {
      visit(node.body, true);
      return;
    }
    if (node.type === "NetworkCards") return;
    for (const child of astChildren(node)) visit(child, insideLambda);
  };
  visit(ast, false);
};

export const getNetworkDefLastCardIds = (
  ast: TypeAST.AST,
  startVariableId = 0
): Map<TypeAST.AST, number> => {
  const map = new Map<TypeAST.AST, number>();
  if (ast.type === "NetworkCards") {
    const seen = new Set<TypeAST.AST>();
    let cumulative = 0;
    for (const def of ast.definitions) {
      cumulative += countCards(def.node, seen, new Set());
      map.set(def.node, startVariableId + cumulative - 1);
    }
  }
  return map;
};

export const getNetworkSegmentRefs = (
  ast: TypeAST.AST
): Map<TypeAST.AST, { segmentIndex: number; totalSegments: number }> | null => {
  if (ast.type !== "NetworkCards") return null;
  const segmentEntries = ast.definitions.filter(
    (def) => def.segmentIndex !== undefined
  );
  if (segmentEntries.length === 0) return null;
  const totalSegments = segmentEntries.length;
  const map = new Map<
    TypeAST.AST,
    { segmentIndex: number; totalSegments: number }
  >();
  for (const def of segmentEntries) {
    map.set(def.node, {
      segmentIndex: def.segmentIndex!,
      totalSegments,
    });
  }
  return map;
};
