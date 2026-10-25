import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import {
  operatorAliasForms,
  operatorRegistry,
} from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import {
  clearOperatorSourceName,
  getNicknameRegex,
  getOperatorSourceName,
} from "lib/transformers/helpers";
import { getSourceCards } from "lib/transformers/sourceNodes";

export type OperatorShadowMode = "error" | "warn";

export interface NameShadowOptions {
  operatorShadow?: OperatorShadowMode;
  warnings?: string[];
}

const RESERVED_NAMES = new Set([
  "true",
  "false",
  "null",
  "operator",
  "variable",
  "block",
  "item",
  "fluid",
  "entity",
  "ingredients",
  "recipe",
  "materialize",
  "dynamic",
  "static",
  "display",
  "card",
]);

export const isReservedName = (name: string): boolean =>
  RESERVED_NAMES.has(name.toLowerCase());

export const reservedNameMessage = (name: string): string =>
  `"${name}" is a reserved name and cannot be defined.`;

export const shadowedOperatorKey = (
  name: string
): TypeOperatorKey | undefined =>
  operatorRegistry.operatorByNickname(name) || undefined;

export const operatorLabel = (key: TypeOperatorKey): string => {
  const opClass = operatorRegistry[key];
  if (typeof opClass !== "function") return key;
  const named = opClass as unknown as {
    displayName?: string;
    interactName?: string;
  };
  return named.displayName || named.interactName || key;
};

export const validAliasesFor = (key: TypeOperatorKey): string[] => {
  const opClass = operatorRegistry[key];
  if (typeof opClass !== "function") return [];
  const regex = getNicknameRegex();
  return [
    ...new Set(
      operatorAliasForms(key, opClass as unknown as typeof BaseOperator)
    ),
  ].filter((name) => regex.test(name));
};

export const aliasesAfterShadowing = (
  key: TypeOperatorKey,
  shadowed: ReadonlySet<string>
): string[] => validAliasesFor(key).filter((name) => !shadowed.has(name));

export interface OperatorShadowDecision {
  allowed: boolean;
  message?: string;
  fallbackAlias?: string;
}

export const decideOperatorShadow = ({
  name,
  key,
  mode,
  shadowed,
}: {
  name: string;
  key: TypeOperatorKey;
  mode: OperatorShadowMode;
  shadowed: ReadonlySet<string>;
}): OperatorShadowDecision => {
  const label = operatorLabel(key);
  if (mode === "error") {
    return {
      allowed: false,
      message: `Variable name "${name}" overshadows an operator nickname (${label}). Rename it, or set "Operator shadow" to Warn.`,
    };
  }
  const remaining = aliasesAfterShadowing(key, new Set([...shadowed, name]));
  if (remaining.length === 0) {
    return {
      allowed: false,
      message: `Variable name "${name}" would shadow the last remaining name of operator ${label}. Rename the variable.`,
    };
  }
  return { allowed: true, fallbackAlias: remaining[0] };
};

const walkAst = (
  node: TypeAST.AST,
  visitOperator: (node: TypeAST.BaseOperator) => void,
  seen: Set<TypeAST.AST>
): void => {
  if (seen.has(node)) return;
  seen.add(node);

  switch (node.type) {
    case "Operator":
      visitOperator(node as unknown as TypeAST.BaseOperator);
      return;
    case "Curry":
      walkAst(node.base, visitOperator, seen);
      for (const arg of node.args) walkAst(arg, visitOperator, seen);
      return;
    case "Pipe":
      walkAst(node.op1, visitOperator, seen);
      walkAst(node.op2, visitOperator, seen);
      return;
    case "Pipe2":
      walkAst(node.op1, visitOperator, seen);
      walkAst(node.op2, visitOperator, seen);
      walkAst(node.op3, visitOperator, seen);
      return;
    case "Flip":
      walkAst(node.arg, visitOperator, seen);
      return;
    case "List":
      for (const entry of node.value) walkAst(entry, visitOperator, seen);
      return;
    case "Reader":
      if (node.value.simulatedOutput) {
        walkAst(node.value.simulatedOutput, visitOperator, seen);
      }
      return;
    case "Materialize":
    case "Dynamic":
    case "Static":
    case "Display":
    case "Card":
      walkAst(node.value, visitOperator, seen);
      return;
    case "NetworkCards":
      for (const def of node.definitions) {
        walkAst(def.node, visitOperator, seen);
      }
      return;
    case "VarStore":
    case "DisplayPanel":
    case "Writer":
    case "Exporter":
    case "Importer":
      for (const card of getSourceCards(node)) {
        walkAst(card, visitOperator, seen);
      }
      return;
    default:
      return;
  }
};

export const collectOperatorSourceNames = (
  node: TypeAST.AST,
  record: (name: string) => void
): void => {
  walkAst(
    node,
    (operator) => {
      const sourceName = getOperatorSourceName(operator);
      if (sourceName) record(sourceName);
    },
    new Set()
  );
};

export const clearShadowedOperatorNames = (
  node: TypeAST.AST,
  shadowed: ReadonlySet<string>
): void => {
  if (shadowed.size === 0) return;
  walkAst(
    node,
    (operator) => {
      const sourceName = getOperatorSourceName(operator);
      if (sourceName && shadowed.has(sourceName)) {
        clearOperatorSourceName(operator);
      }
    },
    new Set()
  );
};
