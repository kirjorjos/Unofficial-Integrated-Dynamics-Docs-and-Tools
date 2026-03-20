import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";
import { BaseOperator } from "IntegratedDynamicsClasses/operators/BaseOperator";
import {
  getOpName,
  expectsOperatorArgument,
} from "HelperClasses/UtilityFunctions";

export const ASTToCodeLine = (ast: TypeAST.AST, isTopLevel = false): string => {
  const stringify = (node: TypeAST.AST, topLevel = false): string => {
    if (node.varName && !topLevel) {
      return node.varName;
    }

    const isAtomic = (node: TypeAST.AST) =>
      node.varName ||
      node.type === "Integer" ||
      node.type === "Long" ||
      node.type === "Double" ||
      node.type === "String" ||
      node.type === "Boolean" ||
      node.type === "Null" ||
      node.type === "NBT" ||
      node.type === "Operator" ||
      node.type === "Block" ||
      node.type === "Item" ||
      node.type === "Fluid" ||
      node.type === "Entity" ||
      node.type === "Ingredients" ||
      node.type === "Recipe";

    const wrap = (node: TypeAST.AST) => {
      if (isAtomic(node)) {
        if (node.type === "Operator") return `(${stringify(node)})`;
        return stringify(node);
      }
      return `(${stringify(node)})`;
    };

    let result = "UNKNOWN";

    switch (node.type) {
      case "Integer":
        result = node.value;
        break;
      case "Long":
        result = node.value + "l";
        break;
      case "Double":
        result = node.value.includes(".") ? node.value : node.value + ".0";
        break;
      case "String":
        result = JSON.stringify(node.value);
        break;
      case "Boolean":
        result = node.value ? "true" : "false";
        break;
      case "Null":
        result = "null";
        break;
      case "NBT":
        result = JSON.stringify(node.value);
        break;

      case "Operator":
        result = getOpName(node.opName);
        break;

      case "Curry": {
        const base = stringify(node.base);
        const args = node.args.map((a) => wrap(a)).join(" ");
        result = `${base} ${args}`;
        if (!topLevel) result = `(${result})`;
        break;
      }

      case "Pipe": {
        const res = `${getOpName("OPERATOR_PIPE")} ${wrap(
          node.op1
        )} ${wrap(node.op2)}`;
        result = topLevel ? res : `(${res})`;
        break;
      }

      case "Pipe2": {
        const res = `${getOpName("OPERATOR_PIPE2")} ${wrap(
          node.op1
        )} ${wrap(node.op2)} ${wrap(node.op3)}`;
        result = topLevel ? res : `(${res})`;
        break;
      }

      case "Flip": {
        const res = `${getOpName("OPERATOR_FLIP")} ${wrap(node.arg)}`;
        result = topLevel ? res : `(${res})`;
        break;
      }

      case "Block":
      case "Item":
      case "Fluid":
      case "Entity": {
        const val = node.value;
        const args = [JSON.stringify(val["id"])];
        if (node.type === "Block" && val["size"] !== undefined) {
          args.push(val["size"] as string);
        }
        if (node.type === "Item" && val["size"] !== undefined) {
          args.push(val["size"] as string);
        }
        if (node.type === "Fluid" && val["amount"] !== undefined) {
          args.push(val["amount"] as string);
        }
        if (node.type === "Block" && val["properties"] !== undefined) {
          args.push(JSON.stringify(val["properties"]));
        } else if (val["tag"] !== undefined) {
          args.push(JSON.stringify(val["tag"]));
        }
        result = `${node.type}(${args.join(", ")})`;
        break;
      }

      case "Ingredients":
        result = `${node.type}(${JSON.stringify(node.value)})`;
        break;

      case "Recipe":
        result = `${node.type}(${JSON.stringify(node.value)})`;
        break;
    }

    if (node.varName && topLevel) {
      return `${node.varName} = ${result}`;
    }
    return result;
  };

  return stringify(ast, isTopLevel);
};

export const CodeLineToAST = (
  codeLine: string,
  externalScope: Map<string, TypeAST.AST> = new Map()
): TypeAST.AST => {
  const tokens: string[] = [];
  let current = "";
  let inString = false;
  let inNBT = 0;

  for (let i = 0; i < codeLine.length; i++) {
    const char = codeLine[i]!;
    if (inString) {
      current += char;
      if (char === '"' && codeLine[i - 1] !== "\\") inString = false;
    } else if (inNBT > 0) {
      current += char;
      if (char === "{") inNBT++;
      else if (char === "}") inNBT--;
    } else if (char === '"') {
      inString = true;
      current += char;
    } else if (char === "{") {
      inNBT = 1;
      current += char;
    } else if (char === "=" && codeLine[i + 1] === ">") {
      if (current.trim()) tokens.push(current.trim());
      tokens.push("=>");
      current = "";
      i++;
    } else if (char === "-" && codeLine[i + 1] === ">") {
      if (current.trim()) tokens.push(current.trim());
      tokens.push("->");
      current = "";
      i++;
    } else if (char === "(" || char === ")" || char === "," || char === "\\") {
      if (current.trim()) tokens.push(current.trim());
      tokens.push(char);
      current = "";
    } else if (/\s/.test(char)) {
      if (current.trim()) tokens.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  if (current.trim()) tokens.push(current.trim());

  let pos = 0;

  type InternalAST =
    | { type: "Integer"; value: TypeNumericString; varName?: string }
    | { type: "Long"; value: TypeNumericString; varName?: string }
    | { type: "Double"; value: TypeNumericString; varName?: string }
    | { type: "String"; value: string; varName?: string }
    | { type: "Boolean"; value: boolean; varName?: string }
    | { type: "Null"; varName?: string }
    | { type: "Block"; value: jsonObject; varName?: string }
    | { type: "Item"; value: jsonObject; varName?: string }
    | { type: "Fluid"; value: jsonObject; varName?: string }
    | { type: "Entity"; value: jsonObject; varName?: string }
    | {
        type: "Ingredients";
        value: TypeAST.Ingredients["value"];
        varName?: string;
      }
    | {
        type: "Recipe";
        value: {
          input: TypeAST.Ingredients;
          output: TypeAST.Ingredients;
          inputReuseable: {
            items: number[];
            fluids: number[];
            energies: number[];
          };
        };
        varName?: string;
      }
    | { type: "NBT"; value: jsonData; varName?: string }
    | { type: "Operator"; opName: TypeOperatorKey; varName?: string }
    | { type: "Flip"; arg: InternalAST; varName?: string }
    | { type: "Pipe"; op1: InternalAST; op2: InternalAST; varName?: string }
    | {
        type: "Pipe2";
        op1: InternalAST;
        op2: InternalAST;
        op3: InternalAST;
        varName?: string;
      }
    | {
        type: "Curry";
        base: InternalAST;
        args: InternalAST[];
        varName?: string;
      }
    | { type: "Variable"; name: string }
    | { type: "Identifier"; value: string };

  function tryParseParams(): string[] | null {
    const startPos = pos;
    let next = tokens[pos];
    if (!next) return null;

    if (next === "(") {
      pos++;
      const params: string[] = [];
      while (tokens[pos] && tokens[pos] !== ")") {
        const p = tokens[pos++];
        if (!p || !/^[A-Za-z0-9\\._&|]+$/.test(p)) {
          pos = startPos;
          return null;
        }
        params.push(p);
        if (tokens[pos] === ",") {
          pos++;
        }
      }
      if (tokens[pos] !== ")") {
        pos = startPos;
        return null;
      }
      pos++;
      const arrow = tokens[pos];
      if (arrow === "=>" || arrow === "->") return params;
    } else if (next === "\\") {
      pos++;
      const paramToken = tokens[pos];
      if (!paramToken) {
        pos = startPos;
        return null;
      }
      const dotIdx = paramToken.lastIndexOf(".");
      if (dotIdx !== -1) {
        const param = paramToken.substring(0, dotIdx);
        const rest = paramToken.substring(dotIdx + 1);
        tokens[pos] = ".";
        if (rest) tokens.splice(pos + 1, 0, rest);
        tokens.splice(pos, 0, param);
        pos++;
        return [param];
      }
    } else if (/^[A-Za-z0-9\\._&|]+$/.test(next)) {
      pos++;
      const arrow = tokens[pos];
      if (arrow === "=>" || arrow === "->") return [next];
    }
    pos = startPos;
    return null;
  }

  function parseExpression(scope: Set<string>): InternalAST {
    const params = tryParseParams();
    if (params !== null) {
      const sep = tokens[pos];
      if (sep === "=>" || sep === "->" || sep === ".") {
        pos++;
        const body = parseSequence(new Set([...scope, ...params]), true);
        let result = body;
        for (let i = params.length - 1; i >= 0; i--) {
          const p = params[i];
          if (p) result = abstract(p, result);
        }
        return result;
      }
    }

    const token = tokens[pos++];
    if (!token) throw new Error("Unexpected end of input");

    if (token === "(") {
      const result = parseSequence(scope, false);
      if (tokens[pos] !== ")") throw new Error("Expected ')'");
      pos++;
      return result;
    }

    if (token === ",") {
      return parseExpression(scope);
    }

    if (token.startsWith('"'))
      return { type: "String", value: JSON.parse(token) };
    if (token.startsWith("{")) return { type: "NBT", value: JSON.parse(token) };
    if (/^-?\d+$/.test(token))
      return { type: "Integer", value: token as TypeNumericString };
    if (/^-?\d+l$/i.test(token))
      return { type: "Long", value: token.slice(0, -1) as TypeNumericString };
    if (/^-?\d+\.\d+$/.test(token))
      return { type: "Double", value: token as TypeNumericString };
    if (token === "true") return { type: "Boolean", value: true };
    if (token === "false") return { type: "Boolean", value: false };
    if (token === "null") return { type: "Null" };

    if (scope.has(token)) return { type: "Variable", name: token };
    if (externalScope.has(token))
      return externalScope.get(token)! as InternalAST;

    const lowerToken = token.toLowerCase();
    if (
      ["block", "item", "fluid", "entity", "ingredients", "recipe"].includes(
        lowerToken
      )
    ) {
      if (tokens[pos] === "(") {
        pos++; // consume (
        const args: InternalAST[] = [];
        while (pos < tokens.length && tokens[pos] !== ")") {
          args.push(parseExpression(scope));
          if (tokens[pos] === ",") pos++;
        }
        if (tokens[pos] !== ")") throw new Error("Expected ')'");
        pos++; // consume )
        return handleCallInternal({ type: "Identifier", value: token }, args);
      }
      return { type: "Identifier", value: token };
    }

    const internalKey = operatorRegistry.operatorByNickname(token);
    if (internalKey) {
      return { type: "Operator", opName: internalKey as TypeOperatorKey };
    }

    throw new Error(`Unknown identifier: ${token}`);
  }

  function parseSequence(scope: Set<string>, consumeAll: boolean): InternalAST {
    const exprs: InternalAST[] = [];
    while (pos < tokens.length && (consumeAll || tokens[pos] !== ")")) {
      const next = tokens[pos];
      if (next === ")") break;

      exprs.push(parseExpression(scope));
      if (tokens[pos] === ",") {
        pos++;
      }
    }

    if (exprs.length === 0) throw new Error("Empty sequence");
    const [base, ...args] = exprs;
    if (args.length === 0) return base!;

    return handleCallInternal(base!, args);
  }

  function handleCallInternal(
    base: InternalAST,
    args: InternalAST[]
  ): InternalAST {
    if (args.length > 1) {
      for (let i = 0; i < args.length - 1; i++) {
        const arg = args[i]!;
        if (
          arg.type === "Operator" ||
          (arg.type === "Identifier" &&
            operatorRegistry.operatorByNickname(arg.value))
        ) {
          if (!expectsOperatorArgument(base as TypeAST.AST, i)) {
            throw new Error(
              `Ambiguous expression: operator used as non-final argument in a sequence. Use parentheses to clarify nesting.`
            );
          }
        }
      }
    }

    if (base.type === "Curry" && !base.varName) {
      return handleCallInternal(base.base, [...base.args, ...args]);
    }

    let isApplyOp = false;
    if (base.type === "Operator") {
      const opClass = operatorRegistry[base.opName];
      let op: BaseOperator<IntegratedValue, IntegratedValue> | void = undefined;
      if (opClass) {
        try {
          op = new opClass();
        } catch (e) {}
      }
      if (!op) op = operatorRegistry.find(base.opName);

      if (op && op.serializer === "integrateddynamics:curry") {
        if (base.opName !== "OPERATOR_APPLY_N") {
          isApplyOp = true;
        }
      }
    }

    if (isApplyOp && args.length >= 1) {
      const [newBase, ...rest] = args;
      if (rest.length > 0) {
        return handleCallInternal(newBase!, rest);
      }
      return newBase!;
    }

    if (base.type === "Identifier") {
      const name = base.value;
      const lowerName = name.toLowerCase();
      if (
        ["block", "item", "fluid", "entity", "ingredients"].includes(lowerName)
      ) {
        if (lowerName === "ingredients") {
          return {
            type: "Ingredients",
            value: (args[0] as { value: TypeAST.Ingredients["value"] }).value,
          };
        }

        const id = (args[0] as { value: string }).value;
        let size: TypeNumericString | undefined = undefined;
        let props: jsonData | undefined = undefined;

        if (args.length > 1) {
          const arg1 = args[1]!;
          if (
            arg1.type === "Integer" ||
            arg1.type === "Long" ||
            arg1.type === "Double"
          ) {
            size = arg1.value;
            if (args.length > 2) {
              props = (args[2] as { value: string }).value;
            }
          } else if (arg1.type === "NBT") {
            props = arg1.value;
          }
        }

        const value: jsonObject = { id };
        if (size !== undefined) {
          if (lowerName === "block") value["size"] = size;
          if (lowerName === "item") value["size"] = size;
          if (lowerName === "fluid") value["amount"] = size;
        }
        if (props !== undefined) {
          if (lowerName === "block") value["properties"] = props as jsonObject;
          else value["tag"] = props;
        }

        const type = (name.charAt(0).toUpperCase() + lowerName.slice(1)) as
          | "Block"
          | "Item"
          | "Fluid"
          | "Entity";
        return { type, value } as InternalAST;
      }

      if (lowerName === "recipe") {
        const val = (args[0] as TypeAST.Recipe).value;
        return {
          type: "Recipe",
          value: {
            input: val.input,
            output: val.output,
            inputReuseable: val.inputReuseable || {
              items: [],
              fluids: [],
              energies: [],
            },
          },
        } as TypeAST.Recipe;
      }
    }

    if (base.type === "Operator") {
      const name = base.opName;
      if (name === "OPERATOR_PIPE" && args.length === 2) {
        return {
          type: "Pipe",
          op1: args[0] as TypeAST.AST,
          op2: args[1] as TypeAST.AST,
        };
      }
      if (name === "OPERATOR_PIPE2" && args.length === 3) {
        return {
          type: "Pipe2",
          op1: args[0] as TypeAST.AST,
          op2: args[1] as TypeAST.AST,
          op3: args[2] as TypeAST.AST,
        };
      }
      if (name === "OPERATOR_FLIP" && args.length === 1) {
        return { type: "Flip", arg: args[0] as TypeAST.AST };
      }
    }

    return {
      type: "Curry",
      base: base as TypeAST.AST,
      args: args as TypeAST.AST[],
    };
  }

  function containsVar(name: string, ast: InternalAST): boolean {
    if (ast.type === "Variable") return ast.name === name;
    if (ast.type === "Curry")
      return (
        containsVar(name, ast.base as InternalAST) ||
        ast.args.some((a) => containsVar(name, a as InternalAST))
      );
    if (ast.type === "Pipe")
      return (
        containsVar(name, ast.op1 as InternalAST) ||
        containsVar(name, ast.op2 as InternalAST)
      );
    if (ast.type === "Pipe2")
      return (
        containsVar(name, ast.op1 as InternalAST) ||
        containsVar(name, ast.op2 as InternalAST) ||
        containsVar(name, ast.op3 as InternalAST)
      );
    if (ast.type === "Flip") return containsVar(name, ast.arg as InternalAST);
    return false;
  }

  const ID_OP = (internalName: string): InternalAST => ({
    type: "Operator",
    opName: internalName as TypeOperatorKey,
  });
  const APPLY_OP = ID_OP("OPERATOR_APPLY");
  const CONST_OP = ID_OP("GENERAL_CONSTANT");
  const IDEN_OP = ID_OP("GENERAL_IDENTITY");

  function abstract(param: string, body: InternalAST): InternalAST {
    if (body.type === "Curry" && body.args.length === 1) {
      const f = body.base;
      const arg = body.args[0]!;
      const xInF = containsVar(param, f as InternalAST);
      const xInArg = containsVar(param, arg as InternalAST);

      if (arg.type === "Variable" && arg.name === param && !xInF) {
        return f as InternalAST;
      }

      if (!xInF && arg.type === "Variable" && arg.name === param) {
        return f as InternalAST;
      }

      if (
        f.type === "Curry" &&
        f.args.length === 1 &&
        f.args[0]!.type === "Variable" &&
        (f.args[0]! as { name: string }).name === param &&
        !containsVar(param, f.base as InternalAST) &&
        !xInArg
      ) {
        return {
          type: "Curry",
          base: { type: "Flip", arg: f.base as TypeAST.AST } as TypeAST.AST,
          args: [arg as TypeAST.AST],
        } as InternalAST;
      }
    }

    if (body.type === "Variable" && body.name === param) return IDEN_OP;
    if (!containsVar(param, body))
      return {
        type: "Curry",
        base: CONST_OP as TypeAST.AST,
        args: [body as TypeAST.AST],
      };

    if (body.type === "Curry" && body.args.length === 1) {
      const E1 = body.base;
      const E2 = body.args[0]!;
      const xInE1 = containsVar(param, E1 as InternalAST);
      const xInE2 = containsVar(param, E2 as InternalAST);

      if (xInE1 && xInE2) {
        if (
          E1.type === "Curry" &&
          E1.args.length === 1 &&
          !containsVar(param, E1.base as InternalAST)
        ) {
          return {
            type: "Pipe2",
            op1: abstract(param, E1.args[0]! as InternalAST) as TypeAST.AST,
            op2: abstract(param, E2 as InternalAST) as TypeAST.AST,
            op3: E1.base as TypeAST.AST,
          };
        }

        return {
          type: "Pipe2",
          op1: abstract(param, E1 as InternalAST) as TypeAST.AST,
          op2: abstract(param, E2 as InternalAST) as TypeAST.AST,
          op3: APPLY_OP as TypeAST.AST,
        };
      } else if (xInE1) {
        return {
          type: "Pipe",
          op1: abstract(param, E1 as InternalAST) as TypeAST.AST,
          op2: {
            type: "Curry",
            base: { type: "Flip", arg: APPLY_OP as TypeAST.AST } as TypeAST.AST,
            args: [E2 as TypeAST.AST],
          } as TypeAST.AST,
        };
      } else {
        if (E2.type === "Variable" && E2.name === param) {
          return E1 as InternalAST;
        }

        return {
          type: "Pipe",
          op1: abstract(param, E2 as InternalAST) as TypeAST.AST,
          op2: {
            type: "Curry",
            base: APPLY_OP as TypeAST.AST,
            args: [E1 as TypeAST.AST],
          } as TypeAST.AST,
        };
      }
    } else if (body.type === "Curry" && body.args.length > 1) {
      const lastArg = body.args[body.args.length - 1]!;
      const rest = { ...body, args: body.args.slice(0, -1) } as InternalAST;
      return abstract(param, {
        type: "Curry",
        base: rest,
        args: [lastArg],
      });
    }
    if (body.type === "Pipe") {
      return {
        type: "Pipe2",
        op1: abstract(param, body.op1 as InternalAST) as TypeAST.AST,
        op2: abstract(param, body.op2 as InternalAST) as TypeAST.AST,
        op3: ID_OP("OPERATOR_PIPE") as TypeAST.AST,
      };
    }
    if (body.type === "Flip") {
      return {
        type: "Pipe",
        op1: abstract(param, body.arg as InternalAST) as TypeAST.AST,
        op2: ID_OP("OPERATOR_FLIP") as TypeAST.AST,
      };
    }
    throw new Error(`Could not abstract "${param}" from expression`);
  }

  const result = parseSequence(new Set(), true);
  if (pos < tokens.length) {
    throw new Error(
      `Unexpected trailing tokens: ${tokens.slice(pos).join(" ")}`
    );
  }
  return result as TypeAST.AST;
};
