import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import {
  getOpName,
  resolveImplicitFlipOperator,
  setOperatorSourceName,
  flattenAnonymousBaseOperatorApplication,
} from "lib/transformers/helpers";

export const ASTToCodeLine = (ast: TypeAST.AST, isTopLevel = true): string => {
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
      node.type === "List" ||
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
      case "List":
        result = `[${node.value.map((entry) => stringify(entry)).join(", ")}]`;
        break;
      case "NBT":
        result = JSON.stringify(node.value);
        break;

      case "Operator":
        result = getOpName(node.opName);
        break;

      case "Curry": {
        const flattened = flattenAnonymousBaseOperatorApplication(node);
        const base = stringify(
          flattened?.fullyApplied ? flattened.operator : node.base
        );
        const args = (flattened?.fullyApplied ? flattened.args : node.args)
          .map((a) => wrap(a))
          .join(" ");
        result = `${base} ${args}`;
        // if (!topLevel) result = `(${result})`;
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
    } else if (
      char === "(" ||
      char === ")" ||
      char === "," ||
      char === "\\" ||
      char === "[" ||
      char === "]"
    ) {
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
    | { type: "List"; value: InternalAST[]; varName?: string }
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

    if (token === "[") {
      const values: InternalAST[] = [];
      while (pos < tokens.length && tokens[pos] !== "]") {
        values.push(parseExpression(scope));
        if (tokens[pos] === ",") pos++;
      }
      if (tokens[pos] !== "]") throw new Error("Expected ']'");
      pos++;
      return { type: "List", value: values };
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
      return setOperatorSourceName(
        { type: "Operator", opName: internalKey as TypeOperatorKey },
        token
      );
    }

    const implicitFlip = resolveImplicitFlipOperator(token);
    if (implicitFlip) return implicitFlip;

    throw new Error(`Unknown identifier: ${token}`);
  }

  function parseSequence(scope: Set<string>, consumeAll: boolean): InternalAST {
    let result: InternalAST | undefined = undefined;

    while (pos < tokens.length && (consumeAll || tokens[pos] !== ")")) {
      const next = tokens[pos];
      if (next === ")") break;

      const expr = parseExpression(scope);
      if (result === undefined) {
        result = expr;
      } else {
        result = handleCallInternal(result, [expr]);
      }

      if (tokens[pos] === ",") {
        pos++;
      }
    }

    if (result === undefined) throw new Error("Empty sequence");
    return result;
  }

  function handleCallInternal(
    base: InternalAST,
    args: InternalAST[]
  ): InternalAST {
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
  const FLIP_OP = ID_OP("OPERATOR_FLIP");
  const PIPE_OP = ID_OP("OPERATOR_PIPE");

  function condense(body: InternalAST): InternalAST {
    if (body.type === "Pipe") {
      if (
        body.op1.type === "Operator" &&
        body.op1.opName === "GENERAL_IDENTITY"
      ) {
        return condense(body.op2);
      }
      if (
        body.op2.type === "Operator" &&
        body.op2.opName === "GENERAL_IDENTITY"
      ) {
        return condense(body.op1);
      }
      if (body.op2.type === "Operator" && body.op2.opName === "LOGICAL_NOT") {
        return condense({
          type: "Curry",
          base: ID_OP("OPERATOR_NEGATION"),
          args: [body.op1],
        });
      }
    }
    if (body.type === "Curry") {
      if (body.base.type === "Curry") {
        return condense({
          type: "Curry",
          base: body.base.base,
          args: [...body.base.args, ...body.args],
        });
      }
    }
    if (body.type === "Pipe2") {
      if (body.op3.type === "Operator" && body.op3.opName === "LOGICAL_AND") {
        return condense({
          type: "Curry",
          base: ID_OP("OPERATOR_CONJUNCTION"),
          args: [body.op1, body.op2],
        });
      }
      if (body.op3.type === "Operator" && body.op3.opName === "LOGICAL_OR") {
        return condense({
          type: "Curry",
          base: ID_OP("OPERATOR_DISJUNCTION"),
          args: [body.op1, body.op2],
        });
      }
    }
    return body;
  }

  function abstract(param: string, body: InternalAST): InternalAST {
    if (!containsVar(param, body)) {
      return condense({
        type: "Curry",
        base: CONST_OP,
        args: [body],
      });
    } else if (body.type === "Variable") {
      return IDEN_OP;
    } else if (body.type === "Curry") {
      const fun = body.base;
      if (containsVar(param, fun)) {
        return abstract(param, {
          type: "Curry",
          base: APPLY_OP,
          args: [fun, ...body.args],
        });
      }
      if (body.args.length === 0) {
        return condense({
          type: "Curry",
          base: CONST_OP,
          args: [fun],
        });
      }
      if (body.args.length === 1) {
        return condense({
          type: "Pipe",
          op1: abstract(param, body.args[0]!),
          op2: fun,
        });
      }

      if (body.args.length === 2) {
        const arg1 = body.args[0]!;
        const arg2 = body.args[1]!;

        const arg1Contains = containsVar(param, arg1);
        const arg2Contains = containsVar(param, arg2);

        if (arg1Contains && arg2Contains) {
          return condense({
            type: "Pipe2",
            op1: abstract(param, arg1),
            op2: abstract(param, arg2),
            op3: fun,
          });
        } else if (arg2Contains) {
          return condense({
            type: "Pipe",
            op1: abstract(param, arg2),
            op2: {
              type: "Curry",
              base: fun,
              args: [arg1],
            },
          });
        } else {
          return condense({
            type: "Pipe",
            op1: abstract(param, arg1),
            op2: {
              type: "Curry",
              base: {
                type: "Flip",
                arg: fun,
              },
              args: [arg2],
            },
          });
        }
      }

      const firstArgs = body.args.slice(0, -2);
      const secondLastArg = body.args[body.args.length - 2]!;
      const lastArg = body.args[body.args.length - 1]!;

      if (firstArgs.some((arg) => containsVar(param, arg))) {
        return abstract(param, {
          type: "Curry",
          base: APPLY_OP,
          args: [
            abstract(param, {
              type: "Curry",
              base: fun,
              args: [...firstArgs, secondLastArg],
            }),
            lastArg,
          ],
        });
      }

      const secondLastContains = containsVar(param, secondLastArg);
      const lastContains = containsVar(param, lastArg);

      if (secondLastContains && lastContains) {
        return condense({
          type: "Pipe2",
          op1: abstract(param, secondLastArg),
          op2: abstract(param, lastArg),
          op3: {
            type: "Curry",
            base: fun,
            args: firstArgs,
          },
        });
      } else if (lastContains) {
        return condense({
          type: "Pipe",
          op1: abstract(param, lastArg),
          op2: {
            type: "Curry",
            base: fun,
            args: [...firstArgs, secondLastArg],
          },
        });
      } else {
        return condense({
          type: "Pipe",
          op1: abstract(param, secondLastArg),
          op2: {
            type: "Curry",
            base: {
              type: "Flip",
              arg: {
                type: "Curry",
                base: fun,
                args: firstArgs,
              },
            },
            args: [lastArg],
          },
        });
      }
    } else if (body.type === "Pipe") {
      return abstract(param, {
        type: "Curry",
        base: PIPE_OP,
        args: [body.op1, body.op2],
      });
    } else if (body.type === "Flip") {
      return condense({
        type: "Pipe",
        op1: abstract(param, body.arg),
        op2: FLIP_OP,
      });
    } else if (body.type === "Pipe2") {
      return abstract(param, {
        type: "Curry",
        base: ID_OP("OPERATOR_PIPE2"),
        args: [body.op1, body.op2, body.op3],
      });
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
