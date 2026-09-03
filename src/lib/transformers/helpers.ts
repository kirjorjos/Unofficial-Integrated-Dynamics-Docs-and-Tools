import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { getReaderClassByTypeName } from "lib/IntegratedDynamicsClasses/readers/readerRegistry";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { iError } from "lib/IntegratedDynamicsClasses/typeWrappers/iError";
import { ASTtoOperator } from "lib/transformers/Operator";

export interface FlattenedBaseOperatorApplication {
  operator: TypeAST.Operator;
  args: TypeAST.AST[];
  fullyApplied: boolean;
}

export const flattenAnonymousBaseOperatorApplication = (
  node: TypeAST.AST
): FlattenedBaseOperatorApplication | null => {
  if (node.type !== "Curry") return null;

  const args = [...node.args];
  let currentBase = node.base;

  while (currentBase.type === "Curry" && !currentBase.varName) {
    args.unshift(...currentBase.args);
    currentBase = currentBase.base;
  }

  if (currentBase.type !== "Operator") return null;

  const opClass = operatorRegistry[currentBase.opName];
  if (
    typeof opClass !== "function" ||
    !(opClass.prototype instanceof BaseOperator)
  ) {
    return null;
  }

  return {
    operator: currentBase,
    args,
    fullyApplied: args.length === getArity(currentBase),
  };
};

export const evaluateFullyAppliedCurry = (
  node: TypeAST.AST
): IntegratedValue | undefined => {
  const flat = flattenAnonymousBaseOperatorApplication(node);
  if (!flat || !flat.fullyApplied || flat.operator.type !== "Operator") {
    return undefined;
  }

  const resolveArg = (arg: IntegratedValue): IntegratedValue => {
    if (arg instanceof Operator) {
      const result = arg.getFn()(null);
      if (
        result != null &&
        typeof result !== "function" &&
        !(result instanceof Operator)
      ) {
        return result;
      }
    }
    return arg;
  };

  try {
    const argValues: IntegratedValue[] = [];
    for (const argAst of flat.args) {
      try {
        argValues.push(resolveArg(ASTtoOperator(argAst)));
      } catch {}
    }

    const baseOp = ASTtoOperator(flat.operator);
    if (!(baseOp instanceof Operator)) {
      return undefined;
    }

    let result: unknown = baseOp.getFn();
    for (const argVal of argValues) {
      if (typeof result === "function") {
        result = (result as (arg: IntegratedValue) => unknown)(argVal);
      } else if (result instanceof Operator) {
        result = result.apply(argVal);
      } else {
        break;
      }
    }

    if (typeof result === "function" || result instanceof Operator) {
      return undefined;
    }
    return result as IntegratedValue;
  } catch {
    return undefined;
  }
};

export interface StepLikeWithNode {
  variableId: number;
  node?: TypeAST.AST;
}

export const isVariableValueByIdReader = (ast: TypeAST.AST): boolean => {
  if (ast.type !== "Reader") return false;
  const aspect = getReaderClassByTypeName(ast.value.reader)?.aspects[
    ast.value.aspect
  ];
  return (aspect?.signature?.length ?? 0) > 0;
};

export const astContainsVariableValueByIdReader = (
  ast: TypeAST.AST
): boolean => {
  if (isVariableValueByIdReader(ast)) return true;
  switch (ast.type) {
    case "Curry":
      return (
        astContainsVariableValueByIdReader(ast.base) ||
        ast.args.some(astContainsVariableValueByIdReader)
      );
    case "List":
      return ast.value.some(astContainsVariableValueByIdReader);
    case "Pipe":
      return (
        astContainsVariableValueByIdReader(ast.op1) ||
        astContainsVariableValueByIdReader(ast.op2)
      );
    case "Pipe2":
      return (
        astContainsVariableValueByIdReader(ast.op1) ||
        astContainsVariableValueByIdReader(ast.op2) ||
        astContainsVariableValueByIdReader(ast.op3)
      );
    case "Flip":
      return astContainsVariableValueByIdReader(ast.arg);
    default:
      return false;
  }
};

export const buildVariableValueByIdOperator = (
  steps: StepLikeWithNode[]
): Operator<IntegratedValue, IntegratedValue> => {
  return new Operator({
    parsedSignature: new ParsedSignature(
      {
        type: "Function",
        from: { type: "Integer" },
        to: { type: "Any", typeID: ParsedSignature.getNewTypeID() },
      },
      false
    ),
    function: (n: IntegratedValue): IntegratedValue => {
      const id = Number((n as any)?.valueOf?.());
      const step = steps.find((s) => s.variableId === id);
      if (!step?.node) {
        throw new iError(`Variable with id ${id} is not in the network`);
      }
      return ASTtoOperator(step.node);
    },
    interactName: "variableValueById",
    baseDisplayName: "Variable Value By ID",
  });
};

export const evaluateFullyAppliedCurryWithSteps = (
  node: TypeAST.AST,
  steps: StepLikeWithNode[]
): IntegratedValue | undefined => {
  const flat = flattenAnonymousBaseOperatorApplication(node);
  if (!flat || !flat.fullyApplied || flat.operator.type !== "Operator") {
    return undefined;
  }

  const resolveArgAst = (argAst: TypeAST.AST): IntegratedValue | undefined => {
    if (isVariableValueByIdReader(argAst)) {
      return buildVariableValueByIdOperator(steps);
    }
    if (argAst.type === "Curry") {
      const nested = evaluateFullyAppliedCurryWithSteps(argAst, steps);
      if (nested !== undefined) return nested;
    }
    try {
      const op = ASTtoOperator(argAst);
      if (op instanceof Operator) {
        const result = op.getFn()(null);
        if (
          result != null &&
          typeof result !== "function" &&
          !(result instanceof Operator)
        ) {
          return result;
        }
      }
      return op;
    } catch {
      return undefined;
    }
  };

  try {
    const argValues = flat.args.map(resolveArgAst);
    if (argValues.some((value) => value === undefined)) return undefined;
    const resolvedArgs = argValues as IntegratedValue[];

    const baseOp = ASTtoOperator(flat.operator);
    if (!(baseOp instanceof Operator)) return undefined;

    let result: unknown = baseOp.getFn();
    for (const argVal of resolvedArgs) {
      if (typeof result === "function") {
        result = (result as (arg: IntegratedValue) => unknown)(argVal);
      } else if (result instanceof Operator) {
        result = result.apply(argVal);
      } else {
        break;
      }
    }

    if (typeof result === "function" || result instanceof Operator) {
      return undefined;
    }
    return result as IntegratedValue;
  } catch {
    return undefined;
  }
};

const operatorSourceNameMap = new WeakMap<TypeAST.BaseOperator, string>();

export const setOperatorSourceName = <T extends TypeAST.BaseOperator>(
  node: T,
  sourceName: string
): T => {
  operatorSourceNameMap.set(node, sourceName);
  return node;
};

export const getOperatorSourceName = (
  node: TypeAST.BaseOperator
): string | undefined => {
  return operatorSourceNameMap.get(node);
};

export const getOpName = (opName: TypeOperatorKey): string => {
  const opClass = operatorRegistry[opName];
  if (opClass && opClass.interactName) return opClass.interactName;
  const internalKey = operatorRegistry.operatorByNickname(opName);
  if (internalKey) {
    const opClass2 = operatorRegistry[internalKey];
    if (opClass2 && opClass2.interactName) return opClass2.interactName;
  }
  const op = operatorRegistry.find(opName);
  if (op)
    return (
      op.constructor as typeof BaseOperator<IntegratedValue, IntegratedValue>
    ).interactName;
  return opName;
};

export const getNicknameRegex = (): RegExp =>
  new RegExp(
    `^(?!.*--)(?!.*::)(?!.*=>)(?!.*->)[^${BaseOperator.nicknameRegexDisallowedChars.join("")}]+$`
  );

const hasUnbalancedBraces = (name: string): boolean => {
  let depth = 0;
  for (const char of name) {
    if (char === "{") depth++;
    else if (char === "}") depth--;
  }
  return depth !== 0;
};

const isLiteralLikeName = (name: string): boolean => {
  const lower = name.toLowerCase();
  if (lower === "null" || lower === "true" || lower === "false") return true;
  if (/^-?\d+$/.test(name)) return true;
  if (/^-?\d+[lL]$/.test(name)) return true;
  if (/^-?(?:\d+\.\d+[dD]?|\d+\.|\d+[dD])$/.test(name)) return true;
  return false;
};

export const isVarNameExpandedSafe = (name: string): boolean =>
  getNicknameRegex().test(name) &&
  !name.includes("=") &&
  !name.includes("'") &&
  name !== "{}" &&
  !hasUnbalancedBraces(name) &&
  !isLiteralLikeName(name);

export const formatVarName = (name: string): string =>
  isVarNameExpandedSafe(name) ? name : `Variable(${JSON.stringify(name)})`;

export const getNicknameCharacterRegex = (): RegExp =>
  new RegExp(`^[^${BaseOperator.nicknameRegexDisallowedChars.join("")}]$`);

export const getImplicitFlipNameRegex = (): RegExp => {
  return new RegExp(
    `^(?!.*--)(?!.*::)(?!.*=>)(?!.*->)flip([A-Z][^${BaseOperator.nicknameRegexDisallowedChars.join("")}]*)$`
  );
};

export const resolveImplicitFlipOperator = (
  name: string
): TypeAST.Flip | undefined => {
  const match = name.match(getImplicitFlipNameRegex());
  if (!match) return undefined;

  const baseNickname = match[1]!.charAt(0).toLowerCase() + match[1]!.slice(1);
  const internalName = operatorRegistry.operatorByNickname(baseNickname);
  if (!internalName) return undefined;

  return {
    type: "Flip",
    arg: setOperatorSourceName(
      { type: "Operator", opName: internalName },
      baseNickname
    ),
  };
};

const isOperatorNode = (n: TypeAST.AST): n is TypeAST.Operator => {
  return (
    n.type === "Operator" ||
    n.type === "Curry" ||
    n.type === "Pipe" ||
    n.type === "Pipe2" ||
    n.type === "Flip"
  );
};

export const getArity = (node: TypeAST.Operator): number => {
  if (node.type === "Operator") {
    const opClass = operatorRegistry[node.opName];
    let op: BaseOperator<IntegratedValue, IntegratedValue> | void = undefined;
    if (opClass) {
      try {
        op = new opClass(false);
      } catch (e) {}
    }
    if (!op) op = operatorRegistry.find(node.opName);
    if (op) return op.getSignatureNode().getArity();
    return 0;
  }
  if (node.type === "Pipe" || node.type === "Pipe2") return 1;
  if (node.type === "Flip") return getArity(node.arg);
  if (node.type === "Curry") {
    if (node.base.type === "Operator") {
      const opClass = operatorRegistry[node.base.opName];
      let op: BaseOperator<IntegratedValue, IntegratedValue> | void = undefined;
      if (opClass) {
        try {
          op = new opClass(false);
        } catch (e) {}
      }
      if (!op) op = operatorRegistry.find(node.base.opName);
      if (op && op.serializer === "integrateddynamics:curry") {
        if (node.args.length > 0) {
          const firstArg = node.args[0];
          if (firstArg && isOperatorNode(firstArg)) {
            const innerArity = getArity(firstArg);
            const internalName = (op.constructor as typeof BaseOperator)
              .internalName;
            if (internalName === "integrateddynamics:operator_apply")
              return Math.max(0, innerArity - 1);
            if (internalName === "integrateddynamics:operator_apply2")
              return Math.max(0, innerArity - 2);
            if (internalName === "integrateddynamics:operator_apply3")
              return Math.max(0, innerArity - 3);
            if (internalName === "integrateddynamics:operator_apply_n") {
              if (node.args.length > 1) {
                const listArg = node.args[1];
                if (
                  listArg &&
                  listArg.type === "NBT" &&
                  Array.isArray(listArg.value)
                ) {
                  return Math.max(0, innerArity - listArg.value.length);
                }
              }
            }
          }
        }
      }
    }
    const baseArity = getArity(node.base);
    return Math.max(0, baseArity - node.args.length);
  }
  return 0;
};

export const expectsOperatorArgument = (
  node: TypeAST.AST,
  index: number
): boolean => {
  let effectiveIndex = index;
  let current = node;

  while (current.type === "Curry") {
    effectiveIndex += current.args.length;
    current = current.base;
  }

  if (current.type === "Operator") {
    const opClass = operatorRegistry[current.opName];
    let op: BaseOperator<IntegratedValue, IntegratedValue> | undefined;
    if (opClass) {
      try {
        op = new opClass(false);
      } catch (e) {}
    }
    if (!op)
      op = operatorRegistry.find(current.opName) as
        | BaseOperator<IntegratedValue, IntegratedValue>
        | undefined;

    if (!op) return false;

    const sig = op.getSignatureNode();
    try {
      const input = sig.getInput(effectiveIndex);
      const inputType = input.getRootType();
      return inputType === "Operator" || inputType === "Any";
    } catch (e) {
      return false;
    }
  }

  if (current.type === "Pipe") return true;
  if (current.type === "Pipe2") return true;
  if (current.type === "Flip") return true;

  return false;
};
