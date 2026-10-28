import { getExpandedVarName } from "lib/transformers/Expanded";
import { astContentKey } from "lib/transformers/NetworkCards";
import { lowerLambda } from "lib/transformers/lambdaLowering";
import {
  getSourceCards,
  isSourceNode,
  sourceToNetworkCards,
  withSourceCards,
} from "lib/transformers/sourceNodes";

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
  const raw = getExpandedVarName(node.type === "Dynamic" ? node.value : node);
  const base = isValidParamName(raw) ? raw : `arg${index}`;
  return makeUniqueName(base, used);
};

export const abstractDynamicParts = (expr: TypeAST.AST): DynamicAbstraction => {
  const params: AbstractedParam[] = [];
  const used = new Set<string>();
  const paramByContent = new Map<string, number>();

  const rewrite = (
    node: TypeAST.AST,
    staticProtected: boolean,
    lambdaDepth = 0
  ): TypeAST.AST => {
    if (node.type === "Static") {
      return { ...node, value: rewrite(node.value, true, lambdaDepth) };
    }

    if (node.type === "Materialize") {
      return { ...node, value: rewrite(node.value, true, lambdaDepth) };
    }

    if (isSourceNode(node)) {
      return withSourceCards(
        node,
        getSourceCards(node).map((card) =>
          rewrite(card, staticProtected, lambdaDepth)
        )
      );
    }

    const isDynamicLeaf = node.type === "Dynamic";
    if (isDynamicLeaf && !staticProtected) {
      const contentKey = astContentKey(node);
      const existing = paramByContent.get(contentKey);
      if (existing !== undefined) {
        return {
          type: "Param",
          index: existing,
          ...(lambdaDepth > 0 ? { binderDepth: lambdaDepth } : {}),
          name: params[existing]!.name,
        };
      }

      const name = deriveParamName(node, params.length, used);
      params.push({ name, node });
      paramByContent.set(contentKey, params.length - 1);
      return {
        type: "Param",
        index: params.length - 1,
        ...(lambdaDepth > 0 ? { binderDepth: lambdaDepth } : {}),
        name,
      };
    }

    switch (node.type) {
      case "Dynamic":
        return {
          ...node,
          value: rewrite(node.value, staticProtected, lambdaDepth),
        };
      case "Curry":
        return {
          ...node,
          base: rewrite(
            node.base,
            staticProtected,
            lambdaDepth
          ) as TypeAST.Operator,
          args: node.args.map((arg) =>
            rewrite(arg, staticProtected, lambdaDepth)
          ),
        };
      case "Pipe":
        return {
          ...node,
          op1: rewrite(
            node.op1,
            staticProtected,
            lambdaDepth
          ) as TypeAST.Operator,
          op2: rewrite(
            node.op2,
            staticProtected,
            lambdaDepth
          ) as TypeAST.Operator,
        };
      case "Pipe2":
        return {
          ...node,
          op1: rewrite(
            node.op1,
            staticProtected,
            lambdaDepth
          ) as TypeAST.Operator,
          op2: rewrite(
            node.op2,
            staticProtected,
            lambdaDepth
          ) as TypeAST.Operator,
          op3: rewrite(
            node.op3,
            staticProtected,
            lambdaDepth
          ) as TypeAST.Operator,
        };
      case "Flip":
        return {
          ...node,
          arg: rewrite(
            node.arg,
            staticProtected,
            lambdaDepth
          ) as TypeAST.Operator,
        };
      case "List":
        return {
          ...node,
          value: node.value.map((entry) =>
            rewrite(entry, staticProtected, lambdaDepth)
          ),
        };
      case "Reader":
        return node.value.simulatedOutput
          ? {
              ...node,
              value: {
                ...node.value,
                simulatedOutput: rewrite(
                  node.value.simulatedOutput,
                  staticProtected,
                  lambdaDepth
                ),
              },
            }
          : node;
      case "NetworkCards":
        return {
          ...node,
          definitions: node.definitions.map((def) => ({
            ...def,
            node: rewrite(def.node, staticProtected, lambdaDepth),
          })),
        };
      case "Lambda":
        return {
          ...node,
          body: rewrite(node.body, staticProtected, lambdaDepth + 1),
        };
      case "Display":
      case "Card":
        return {
          ...node,
          value: rewrite(node.value, staticProtected, lambdaDepth),
        };
      default:
        return node;
    }
  };

  const openBody = rewrite(
    isSourceNode(expr) ? sourceToNetworkCards(expr) : expr,
    false
  );

  let lambda: TypeAST.AST = openBody;
  if (params.length > 0) {
    lambda = lowerLambda({
      type: "Lambda",
      params: params.map((param) => ({ name: param.name })),
      body: openBody,
    });
  } else if (openBody.type === "Lambda") {
    lambda = lowerLambda(openBody);
  }

  return { params, openBody, lambda };
};
