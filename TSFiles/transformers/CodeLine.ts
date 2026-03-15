import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";

const getOpName = (opName: TypeOperatorKey): string => {
  const opClass = operatorRegistry[opName];
  if (!opClass) return opName;
  return opClass.interactName;
};

export const ASTToCodeLine = (ast: TypeAST.AST): string => {
  const stringify = (node: TypeAST.AST, topLevel = false): string => {
    const isAtomic = (node: TypeAST.AST) =>
      node.type === "Integer" ||
      node.type === "Long" ||
      node.type === "Double" ||
      node.type === "String" ||
      node.type === "Boolean" ||
      node.type === "Null" ||
      node.type === "NBT" ||
      node.type === "Operator";

    const wrap = (node: TypeAST.AST) => (isAtomic(node) ? stringify(node) : `(${stringify(node)})`);

    switch (node.type) {
      case "Integer": return node.value;
      case "Long": return node.value + "l";
      case "Double": return node.value.includes(".") ? node.value : node.value + ".0";
      case "String": return JSON.stringify(node.value);
      case "Boolean": return node.value ? "true" : "false";
      case "Null": return "null";
      case "NBT": return JSON.stringify(node.value);

      case "Operator": return getOpName(node.opName);

      case "Curry": {
        const base = stringify(node.base);
        const args = node.args.map(wrap).join(" ");
        const res = `${base} ${args}`;
        return topLevel ? res : `(${res})`;
      }

      case "Pipe": {
        const res = `${getOpName("OPERATOR_PIPE")} ${wrap(node.op1)} ${wrap(node.op2)}`;
        return topLevel ? res : `(${res})`;
      }

      case "Pipe2": {
        const res = `${getOpName("OPERATOR_PIPE2")} ${wrap(node.op1)} ${wrap(node.op2)} ${wrap(node.op3)}`;
        return topLevel ? res : `(${res})`;
      }

      case "Flip": {
        const res = `${getOpName("OPERATOR_FLIP")} ${wrap(node.arg)}`;
        return topLevel ? res : `(${res})`;
      }

      case "Block":
      case "Item":
      case "Fluid":
      case "Entity":
        if (
          node.value &&
          typeof node.value === "object" &&
          Object.keys(node.value).length === 1 &&
          "id" in node.value
        ) {
          return `${node.type}(${JSON.stringify(node.value["id"])})`;
        }
        return `${node.type}(${JSON.stringify(node.value)})`;
      case "Ingredients":
        return `${node.type}(${JSON.stringify(node.value)})`;

      case "Recipe":
        return `Recipe(${ASTToCodeLine(node.value.in)}, ${ASTToCodeLine(node.value.out)})`;
    }
  };

  return stringify(ast, true);
};

export const CodeLineToAST = (codeLine: string): TypeAST.AST => {
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
    } else if (char === "(" || char === ")" || char === ",") {
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

  type InternalAST = TypeAST.AST | { type: "Variable"; name: string } | { type: "Identifier"; value: string };

  function tryParseParams(): string[] | null {
    const startPos = pos;
    let next = tokens[pos];
    if (!next) return null;

    if (next === "(") {
      pos++;
      const params: string[] = [];
      while (tokens[pos] && tokens[pos] !== ")") {
        const p = tokens[pos++];
        if (!p || !/^[A-Za-z_][A-Za-z0-9_]*$/.test(p)) {
          pos = startPos;
          return null;
        }
        params.push(p);
        if (tokens[pos] === ",") pos++;
      }
      if (tokens[pos] !== ")") {
        pos = startPos;
        return null;
      }
      pos++;
      if (tokens[pos] === "=>") return params;
    } else if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(next)) {
      pos++;
      if (tokens[pos] === "=>") return [next];
    }
    pos = startPos;
    return null;
  }

  function parseExpression(scope: Set<string>): InternalAST {
    const params = tryParseParams();
    if (params !== null) {
      if (tokens[pos] === "=>") {
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

    if (token.startsWith('"')) return { type: "String", value: JSON.parse(token) };
    if (token.startsWith("{")) return { type: "NBT", value: JSON.parse(token) };
    if (/^-?\d+$/.test(token)) return { type: "Integer", value: token as TypeNumericString };
    if (/^-?\d+l$/i.test(token)) return { type: "Long", value: token.slice(0, -1) as TypeNumericString };
    if (/^-?\d+\.\d+$/.test(token)) return { type: "Double", value: token as TypeNumericString };
    if (token === "true") return { type: "Boolean", value: true };
    if (token === "false") return { type: "Boolean", value: false };
    if (token === "null") return { type: "Null" };

    if (scope.has(token)) return { type: "Variable", name: token };

    const lowerToken = token.toLowerCase();
    if (["block", "item", "fluid", "entity", "ingredients"].includes(lowerToken)) {
      return { type: "Identifier", value: token };
    }

    const internalName = operatorRegistry.operatorByNickname(token);
    if (internalName) return { type: "Operator", opName: internalName };

    throw new Error(`Unknown identifier: ${token}`);
  }

  function parseSequence(scope: Set<string>, consumeAll: boolean): InternalAST {
    const exprs: InternalAST[] = [];
    while (pos < tokens.length && (consumeAll || tokens[pos] !== ")")) {
      exprs.push(parseExpression(scope));
      if (tokens[pos] === ",") pos++;
    }

    if (exprs.length === 0) throw new Error("Empty sequence");
    const [base, ...args] = exprs;
    if (args.length === 0) return base!;

    return handleCall(base!, args);
  }

  function handleCall(base: InternalAST, args: InternalAST[]): InternalAST {
    const isCombinator =
      base.type === "Operator" &&
      ["OPERATOR_PIPE", "OPERATOR_PIPE2", "OPERATOR_FLIP"].includes(
        base.opName
      );

    if (!isCombinator) {
      for (let i = 0; i < args.length - 1; i++) {
        if (args[i]!.type === "Operator") {
          throw new Error(
            `Ambiguous expression: operator "${getOpName(
              (args[i] as TypeAST.BaseOperator).opName
            )}".`
          );
        }
      }
    }

    if (base.type === "Operator") {
      const name = base.opName;
      if (name === "OPERATOR_PIPE" && args.length === 2) {
        return { type: "Pipe", op1: args[0] as TypeAST.AST, op2: args[1] as TypeAST.AST };
      }
      if (name === "OPERATOR_PIPE2" && args.length === 3) {
        return { type: "Pipe2", op1: args[0] as TypeAST.AST, op2: args[1] as TypeAST.AST, op3: args[2] as TypeAST.AST };
      }
      if (name === "OPERATOR_FLIP" && args.length === 1) {
        return { type: "Flip", arg: args[0] as TypeAST.AST };
      }
    }

    if (base.type === "Identifier") {
      const name = base.value;
      const lowerName = name.toLowerCase();
      if (["block", "item", "fluid", "entity", "ingredients"].includes(lowerName)) {
        const arg = args[0]!;
        let value: string | jsonData;
        if (arg.type === "String") {
          value = { id: arg.value };
        } else if (arg.type === "NBT") {
          value = arg.value;
        } else {
          throw new Error(`${name} expects a string or NBT argument`);
        }
        const type = name.charAt(0).toUpperCase() + lowerName.slice(1);
        return { type, value } as TypeAST.Constant;
      }
    }

    return { type: "Curry", base: base as TypeAST.AST, args: args as TypeAST.AST[] };
  }

  function containsVar(name: string, ast: InternalAST): boolean {
    if (ast.type === "Variable") return ast.name === name;
    if (ast.type === "Curry") return containsVar(name, ast.base) || ast.args.some((a) => containsVar(name, a));
    if (ast.type === "Pipe") return containsVar(name, ast.op1) || containsVar(name, ast.op2);
    if (ast.type === "Pipe2") return containsVar(name, ast.op1) || containsVar(name, ast.op2) || containsVar(name, ast.op3);
    if (ast.type === "Flip") return containsVar(name, ast.arg);
    return false;
  }

  const ID_OP = (opName: TypeOperatorKey): TypeAST.BaseOperator => ({ type: "Operator", opName });
  const APPLY_OP = ID_OP("OPERATOR_APPLY");
  const CONST_OP = ID_OP("GENERAL_CONSTANT");
  const IDEN_OP = ID_OP("GENERAL_IDENTITY");

  function abstract(param: string, body: InternalAST): InternalAST {
    if (body.type === "Curry" && body.args.length === 1) {
      const f = body.base as InternalAST;
      const arg = body.args[0]! as InternalAST;
      if (arg.type === "Variable" && arg.name === param && !containsVar(param, f)) return f;
    }
    if (body.type === "Variable" && body.name === param) return IDEN_OP;
    if (!containsVar(param, body)) return { type: "Curry", base: CONST_OP, args: [body as TypeAST.AST] };

    if (body.type === "Curry") {
      if (body.args.length === 1) {
        const E1 = body.base as InternalAST;
        const E2 = body.args[0]! as InternalAST;
        const xInE1 = containsVar(param, E1);
        const xInE2 = containsVar(param, E2);

        if (xInE1 && xInE2) {
          return { type: "Pipe2", op1: abstract(param, E1) as TypeAST.AST, op2: abstract(param, E2) as TypeAST.AST, op3: APPLY_OP };
        } else if (xInE1) {
          return { type: "Pipe", op1: abstract(param, E1) as TypeAST.AST, op2: { type: "Curry", base: { type: "Flip", arg: APPLY_OP } as TypeAST.AST, args: [E2 as TypeAST.AST] } as TypeAST.AST };
        } else {
          return { type: "Pipe", op1: abstract(param, E2) as TypeAST.AST, op2: { type: "Curry", base: APPLY_OP, args: [E1 as TypeAST.AST] } as TypeAST.AST };
        }
      } else {
        const lastArg = body.args[body.args.length - 1]!;
        const rest = { ...body, args: body.args.slice(0, -1) } as InternalAST;
        return abstract(param, { type: "Curry", base: rest as TypeAST.AST, args: [lastArg] });
      }
    }
    if (body.type === "Pipe") {
      return { type: "Pipe2", op1: abstract(param, body.op1) as TypeAST.AST, op2: abstract(param, body.op2) as TypeAST.AST, op3: ID_OP("OPERATOR_PIPE") };
    }
    if (body.type === "Flip") {
      return { type: "Pipe", op1: abstract(param, body.arg) as TypeAST.AST, op2: ID_OP("OPERATOR_FLIP") };
    }
    throw new Error(`Could not abstract "${param}" from expression`);
  }

  return parseSequence(new Set(), true) as TypeAST.AST;
};
