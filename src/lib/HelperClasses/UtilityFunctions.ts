import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";

export function sanitizeForRe2(pattern: string): string {
  return pattern
    .replaceAll(/\(\?(?!P)(?<name>[a-zA-Z0-9_]+)>/g, "(?P<$1>")
    .replaceAll(/\\u\{([0-9A-Fa-f]+)\}/g, "\\x{$1}");
}

export function sanitizeReplacement(replacement: string): string {
  return replacement
    .replaceAll(/\${(\w+)}/g, "$<$1>")
    .replaceAll(/(?<!\\)\$0(?!\d)/g, "$$&")
    .replaceAll(/\\(\$)/g, "$$$$");
}

export const getNicknameRegex = (): RegExp =>
  new RegExp(`^[${BaseOperator.nicknameRegexAllowedChars}]+$`);

export const getNicknameCharacterRegex = (): RegExp =>
  new RegExp(`^[${BaseOperator.nicknameRegexAllowedChars}]$`);

export const getImplicitFlipNameRegex = (): RegExp => {
  return new RegExp(
    `^flip([A-Z][${BaseOperator.nicknameRegexAllowedChars}]*)$`
  );
};

export const resolveImplicitFlipOperator = (
  name: string
): TypeAST.AST | undefined => {
  const match = name.match(getImplicitFlipNameRegex());
  if (!match) return undefined;

  const baseNickname = match[1]!.charAt(0).toLowerCase() + match[1]!.slice(1);
  const internalName = operatorRegistry.operatorByNickname(baseNickname);
  if (!internalName) return undefined;

  const originalOp = new operatorRegistry[internalName]();
  if (originalOp instanceof BaseOperator && originalOp.flipTarget) {
    return {
      type: "Operator",
      opName: originalOp.flipTarget,
    };
  }

  return {
    type: "Flip",
    arg: { type: "Operator", opName: internalName },
  };
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

export const getArity = (node: TypeAST.Operator): number => {
  const isOperatorNode = (n: TypeAST.AST): n is TypeAST.Operator => {
    return (
      n.type === "Operator" ||
      n.type === "Curry" ||
      n.type === "Pipe" ||
      n.type === "Pipe2" ||
      n.type === "Flip"
    );
  };

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
    let op: BaseOperator<IntegratedValue, IntegratedValue>;
    if (opClass) {
      try {
        op = new opClass(false);
      } catch (e) {}
    }
    if (!op!) op = operatorRegistry.find(current.opName)!;

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
