import { ASTToCondensed, CondensedToAST } from "lib/transformers/Condensed";
import { getExpandedVarName } from "lib/transformers/Expanded";
import { astContentKey } from "lib/transformers/NetworkCards";

export interface AbstractedParam {
  name: string;
  node: TypeAST.AST;
}

export interface DynamicAbstraction {
  params: AbstractedParam[];
  openBody: TypeAST.AST;
  lambda: TypeAST.AST;
}

const isValidParamName = (name: string): boolean =>
  /^[A-Za-z_][A-Za-z0-9_]*$/.test(name);

const makeUniqueName = (base: string, used: Set<string>): string => {
  let name = base;
  let counter = 1;
  while (used.has(name)) {
    name = `${base}${counter++}`;
  }
  used.add(name);
  return name;
};

const deriveParamName = (
  node: TypeAST.AST,
  index: number,
  used: Set<string>
): string => {
  const raw = getExpandedVarName(node);
  const base = isValidParamName(raw) ? raw : `arg${index}`;
  return makeUniqueName(base, used);
};

export const abstractDynamicParts = (expr: TypeAST.AST): DynamicAbstraction => {
  const params: AbstractedParam[] = [];
  const used = new Set<string>();
  const paramByContent = new Map<string, AbstractedParam>();

  const rewrite = (
    node: TypeAST.AST,
    staticProtected: boolean
  ): TypeAST.AST => {
    if (node.type === "Static") {
      return { ...node, value: rewrite(node.value, true) };
    }

    if (node.type === "Materialize") {
      return { ...node, value: rewrite(node.value, true) };
    }

    const isDynamicLeaf = node.type === "Reader" || node.type === "Dynamic";
    if (isDynamicLeaf && !staticProtected) {
      const contentKey = astContentKey(node);
      const existing = paramByContent.get(contentKey);
      if (existing) return { type: "Variable", name: existing.name };

      const name = deriveParamName(node, params.length, used);
      const param: AbstractedParam = { name, node };
      params.push(param);
      paramByContent.set(contentKey, param);
      return { type: "Variable", name };
    }

    switch (node.type) {
      case "Dynamic":
        return { ...node, value: rewrite(node.value, staticProtected) };
      case "Curry":
        return {
          ...node,
          base: rewrite(node.base, staticProtected) as TypeAST.Operator,
          args: node.args.map((arg) => rewrite(arg, staticProtected)),
        };
      case "Pipe":
        return {
          ...node,
          op1: rewrite(node.op1, staticProtected) as TypeAST.Operator,
          op2: rewrite(node.op2, staticProtected) as TypeAST.Operator,
        };
      case "Pipe2":
        return {
          ...node,
          op1: rewrite(node.op1, staticProtected) as TypeAST.Operator,
          op2: rewrite(node.op2, staticProtected) as TypeAST.Operator,
          op3: rewrite(node.op3, staticProtected) as TypeAST.Operator,
        };
      case "Flip":
        return {
          ...node,
          arg: rewrite(node.arg, staticProtected) as TypeAST.Operator,
        };
      case "List":
        return {
          ...node,
          value: node.value.map((entry) => rewrite(entry, staticProtected)),
        };
      case "Reader":
        return node.value.simulatedOutput
          ? {
              ...node,
              value: {
                ...node.value,
                simulatedOutput: rewrite(
                  node.value.simulatedOutput,
                  staticProtected
                ),
              },
            }
          : node;
      case "NetworkCards":
        return {
          ...node,
          definitions: node.definitions.map((def) => ({
            ...def,
            node: rewrite(def.node, staticProtected),
          })),
        };
      default:
        return node;
    }
  };

  const openBody = rewrite(expr, false);

  let lambda: TypeAST.AST = openBody;
  if (params.length > 0) {
    const bodyText = ASTToCondensed(openBody);
    const source = `(${params
      .map((param) => param.name)
      .join(", ")}) => ${bodyText}`;
    lambda = CondensedToAST(source);
  }

  return { params, openBody, lambda };
};
