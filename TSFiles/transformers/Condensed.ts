import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";
import { BaseOperator } from "IntegratedDynamicsClasses/operators/BaseOperator";

type char = string;
interface State {
  inString: boolean;
  isEscaped: boolean;
  inJSON: number;
}

const charTokenCheckers: Record<string, (c: char, state: State) => boolean> = {
  integer: (c, state) =>
    !state.inString && state.inJSON === 0 && /^-|\d$/.test(c),
  long: (c, state) =>
    !state.inString && state.inJSON === 0 && /^[-\dlL]$/.test(c),
  double: (c, state) =>
    !state.inString && state.inJSON === 0 && /^[-\d\.dD]$/.test(c),
  string: (c, state) => state.inString || c === '"',
  nbt: (c, state) => state.inJSON > 0 || c === "{",
  boolean: (c, state) =>
    !state.inString && state.inJSON === 0 && /^[truefalse]$/i.test(c),
  null: (c, state) =>
    !state.inString && state.inJSON === 0 && /^[nul]$/i.test(c),
  identifier: (c, state) =>
    !state.inString &&
    state.inJSON === 0 &&
    (BaseOperator.nicknameRegex.test(c) || c === "="),
};

const resolveType = (value: string, possible: string[]): string => {
  const lower = value.toLowerCase();
  if (lower === "null" && possible.includes("null")) return "null";
  if ((lower === "true" || lower === "false") && possible.includes("boolean"))
    return "boolean";
  if (possible.includes("integer") && /^-?\d+$/.test(value)) {
    const num = BigInt(value);
    if (num >= BigInt(-2147483648) && num <= BigInt(2147483647))
      return "integer";
    return "long";
  }
  if (possible.includes("long") && /^-?\d+[lL]$/.test(value)) return "long";
  if (possible.includes("double")) {
    if (/^-?(?:\d+\.\d+[dD]?|\d+\.|\d+[dD])$/.test(value)) return "double";
  }
  if (value.startsWith('"')) return "string";
  if (value.startsWith("{")) return "nbt";
  return "identifier";
};

export const tokenize = (condensed: string) => {
  const tokens: { type: string; value: string }[] = [];
  let currentToken = "";
  let state: State = { inString: false, isEscaped: false, inJSON: 0 };
  let possibleTypes = Object.keys(charTokenCheckers);

  for (let i = 0; i < condensed.length; i++) {
    const char = condensed[i]!;

    if (
      !state.inString &&
      state.inJSON === 0 &&
      char === "=" &&
      condensed[i + 1] === ">"
    ) {
      if (currentToken) {
        tokens.push({
          type: resolveType(currentToken, possibleTypes),
          value: currentToken,
        });
        currentToken = "";
        state.isEscaped = false;
        possibleTypes = Object.keys(charTokenCheckers);
      }
      tokens.push({ type: "structural", value: "=>" });
      i++; // Skip ">"
      continue;
    }

    const isStructural =
      !state.inString && state.inJSON === 0 && /^[(),]$/.test(char);
    const isWhitespace =
      !state.inString && state.inJSON === 0 && /^\s$/.test(char);

    if (isStructural || isWhitespace) {
      if (currentToken) {
        tokens.push({
          type: resolveType(currentToken, possibleTypes),
          value: currentToken,
        });
        currentToken = "";
        state.isEscaped = false;
        possibleTypes = Object.keys(charTokenCheckers);
      }
      if (isStructural) {
        tokens.push({ type: "structural", value: char });
      }
      continue;
    }

    if (state.inString) {
      if (state.isEscaped) {
        if (!/^[nrtbf"\\\/]$/.test(char)) {
          throw new Error(
            `Invalid escape sequence "\\${char}" at position ${i}`
          );
        }
        state.isEscaped = false;
      } else if (char === "\\") {
        state.isEscaped = true;
      } else if (char === '"') {
        state.inString = false;
      }
    } else {
      if (char === '"') {
        state.inString = true;
        state.isEscaped = false;
      } else if (char === "{") {
        state.inJSON++;
      }
    }

    const nextPossible = possibleTypes.filter((t) =>
      charTokenCheckers[t]!(char, state)
    );

    if (nextPossible.length === 0) {
      if (currentToken) {
        tokens.push({
          type: resolveType(currentToken, possibleTypes),
          value: currentToken,
        });
        currentToken = "";
        state.isEscaped = false;
        possibleTypes = Object.keys(charTokenCheckers);
        i--; // cause recheck of current char to start next token
        continue;
      } else {
        throw new Error(`Unexpected character "${char}" at position ${i}`);
      }
    }

    if (!state.inString && char === "}") {
      state.inJSON--;
    }

    currentToken += char;
    possibleTypes = nextPossible;
  }

  if (currentToken) {
    tokens.push({
      type: resolveType(currentToken, possibleTypes),
      value: currentToken,
    });
  }

  return tokens;
};

export const CondensedToAST = (
  condensed: string,
  externalScope: Map<string, TypeAST.AST> = new Map()
): TypeAST.AST => {
  const tokens = tokenize(condensed);
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
    | { type: "Ingredients"; value: any; varName?: string }
    | { type: "Recipe"; value: { in: any; out: any }; varName?: string }
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
    | { type: "Variable"; name: string };

  function tryParseParams(): string[] | null {
    const startPos = pos;
    const next = tokens[pos];
    if (!next) return null;

    if (next.type === "structural" && next.value === "(") {
      pos++; // consume (
      const params: string[] = [];
      const seenParams = new Set<string>();
      while (
        tokens[pos] &&
        !(tokens[pos]!.type === "structural" && tokens[pos]!.value === ")")
      ) {
        const p = tokens[pos++];
        if (!p || p.type !== "identifier") {
          pos = startPos;
          return null;
        }
        if (operatorRegistry.operatorByNickname(p.value)) {
          throw new Error(
            `Variable name "${p.value}" clashes with an existing operator nickname`
          );
        }
        if (seenParams.has(p.value)) {
          throw new Error(`Duplicate variable name "${p.value}" in lambda`);
        }
        params.push(p.value);
        seenParams.add(p.value);
        if (
          tokens[pos] &&
          tokens[pos]!.type === "structural" &&
          tokens[pos]!.value === ","
        ) {
          pos++; // consume ,
        }
      }
      if (!tokens[pos]) {
        pos = startPos;
        return null;
      }
      pos++; // consume )
      if (
        tokens[pos] &&
        tokens[pos]!.type === "structural" &&
        tokens[pos]!.value === "=>"
      ) {
        return params;
      }
    } else if (next.type === "identifier") {
      const p = tokens[pos++];
      if (
        tokens[pos] &&
        tokens[pos]!.type === "structural" &&
        tokens[pos]!.value === "=>"
      ) {
        if (operatorRegistry.operatorByNickname(p!.value)) {
          throw new Error(
            `Variable name "${p!.value}" clashes with an existing operator nickname`
          );
        }
        return [p!.value];
      }
    }
    pos = startPos;
    return null;
  }

  function parseExpression(scope: Set<string>): InternalAST {
    const params = tryParseParams();
    if (params !== null) {
      if (
        tokens[pos] &&
        tokens[pos]!.type === "structural" &&
        tokens[pos]!.value === "=>"
      ) {
        pos++; // consume =>
        const body = parseExpression(new Set([...scope, ...params]));
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

    if (token.type === "structural") {
      if (token.value === "(") {
        const expr = parseExpression(scope);
        if (!tokens[pos] || tokens[pos]!.value !== ")")
          throw new Error("Expected ')' after grouping");
        pos++; // consume ')'
        return expr;
      }
      throw new Error(`Unexpected structural token: ${token.value}`);
    }

    if (
      tokens[pos] &&
      tokens[pos]!.type === "structural" &&
      tokens[pos]!.value === "("
    ) {
      pos++; // consume '('
      const args: InternalAST[] = [];
      while (
        tokens[pos] &&
        !(tokens[pos]!.type === "structural" && tokens[pos]!.value === ")")
      ) {
        const arg = parseExpression(scope);
        args.push(arg);
        if (
          tokens[pos] &&
          tokens[pos]!.type === "structural" &&
          tokens[pos]!.value === ","
        ) {
          pos++; // consume ','
        }
      }
      if (!tokens[pos]) throw new Error("Expected ')'");
      pos++; // consume ')'

      return handleCall(token.value, args, scope);
    }

    return handleLiteral(token, scope);
  }

  function containsVar(name: string, ast: InternalAST): boolean {
    if (ast.type === "Variable") return ast.name === name;
    if (ast.type === "Curry")
      return (
        containsVar(name, ast.base) ||
        ast.args.some((a) => containsVar(name, a))
      );
    if (ast.type === "Pipe")
      return containsVar(name, ast.op1) || containsVar(name, ast.op2);
    if (ast.type === "Pipe2")
      return (
        containsVar(name, ast.op1) ||
        containsVar(name, ast.op2) ||
        containsVar(name, ast.op3)
      );
    if (ast.type === "Flip") return containsVar(name, ast.arg);
    return false;
  }

  const ID_OP = (opName: TypeOperatorKey): InternalAST => ({
    type: "Operator",
    opName,
  });
  const APPLY_OP = ID_OP("OPERATOR_APPLY" as any);
  const CONST_OP = ID_OP("GENERAL_CONSTANT" as any);
  const IDEN_OP = ID_OP("GENERAL_IDENTITY" as any);

  function abstract(param: string, body: InternalAST): InternalAST {
    if (body.type === "Curry" && body.args.length === 1) {
      const f = body.base;
      const arg = body.args[0]!;

      if (
        arg.type === "Variable" &&
        arg.name === param &&
        !containsVar(param, f)
      ) {
        return f;
      }

      if (f.type === "Curry" && f.args.length === 1) {
        const g = f.base;
        const arg1 = f.args[0]!;
        if (
          arg1.type === "Variable" &&
          arg1.name === param &&
          !containsVar(param, g) &&
          !containsVar(param, arg)
        ) {
          return {
            type: "Curry",
            base: { type: "Flip", arg: g },
            args: [arg],
          };
        }
      }
    }

    if (body.type === "Variable" && body.name === param) {
      return IDEN_OP;
    }

    if (body.type === "Curry" && body.args.length === 1) {
      const E1 = body.base;
      const E2 = body.args[0]!;
      if (
        E2.type === "Variable" &&
        E2.name === param &&
        !containsVar(param, E1)
      ) {
        return E1;
      }
    }

    if (!containsVar(param, body)) {
      return { type: "Curry", base: CONST_OP, args: [body] };
    }

    if (body.type === "Curry") {
      if (body.args.length === 1) {
        const E1 = body.base;
        const E2 = body.args[0]!;

        const xInE1 = containsVar(param, E1);
        const xInE2 = containsVar(param, E2);

        if (xInE1 && xInE2) {
          if (
            E2.type === "Variable" &&
            E2.name === param &&
            E1.type === "Curry" &&
            E1.args.length === 1
          ) {
            const f = E1.base;
            const arg1 = E1.args[0]!;
            if (
              arg1.type === "Variable" &&
              arg1.name === param &&
              !containsVar(param, f)
            ) {
              return {
                type: "Pipe2",
                op1: IDEN_OP,
                op2: IDEN_OP,
                op3: f,
              };
            }
          }

          return {
            type: "Pipe2",
            op1: abstract(param, E1),
            op2: abstract(param, E2),
            op3: APPLY_OP,
          };
        } else if (xInE1) {
          const flipApply: InternalAST = { type: "Flip", arg: APPLY_OP };
          const callback: InternalAST = {
            type: "Curry",
            base: flipApply,
            args: [E2],
          };
          return {
            type: "Pipe",
            op1: abstract(param, E1),
            op2: callback,
          };
        } else if (xInE2) {
          return {
            type: "Pipe",
            op1: abstract(param, E2),
            op2: {
              type: "Curry",
              base: APPLY_OP,
              args: [E1],
            },
          };
        }
      } else if (body.args.length > 1) {
        const lastArg = body.args[body.args.length - 1]!;
        const rest: InternalAST = {
          ...body,
          args: body.args.slice(0, -1),
        };
        return abstract(param, {
          type: "Curry",
          base: rest,
          args: [lastArg],
        });
      }
    }

    if (body.type === "Pipe") {
      return {
        type: "Pipe2",
        op1: abstract(param, body.op1),
        op2: abstract(param, body.op2),
        op3: ID_OP("OPERATOR_PIPE"),
      };
    }

    if (body.type === "Flip") {
      return {
        type: "Pipe",
        op1: abstract(param, body.arg),
        op2: ID_OP("OPERATOR_FLIP"),
      };
    }

    throw new Error(`Could not abstract "${param}" from expression`);
  }

  function handleCall(
    name: string,
    args: InternalAST[],
    scope: Set<string>
  ): InternalAST {
    const lowerName = name.toLowerCase();

    // Callable
    if (!scope.has(name) && !externalScope.has(name)) {
      if (
        lowerName === "block" ||
        lowerName === "item" ||
        lowerName === "fluid" ||
        lowerName === "entity"
      ) {
        const arg = args[0]!;
        let value: jsonData;
        if (arg.type === "String") {
          value = { id: arg.value };
        } else if (arg.type === "NBT") {
          value =
            typeof arg.value === "string" ? JSON.parse(arg.value) : arg.value;
        } else {
          throw new Error(`${name} expects a string or Property argument`);
        }
        const type = name.charAt(0).toUpperCase() + lowerName.slice(1);
        return { type, value } as TypeAST.AST;
      }

      if (lowerName === "nbt") {
        const arg = args[0]!;
        if (arg.type !== "NBT")
          throw new Error("NBT() expects a SNBT/JSON argument");
        return arg as TypeAST.AST;
      }

      if (lowerName === "ingredients") {
        const arg = args[0]!;
        if (arg.type !== "NBT")
          throw new Error("Ingredients() expects a JSON argument");
        return {
          type: "Ingredients",
          value:
            typeof arg.value === "string" ? JSON.parse(arg.value) : arg.value,
        } as TypeAST.AST;
      }

      if (lowerName === "recipe") {
        if (args.length !== 2) throw new Error("Recipe() expects 2 arguments");
        return {
          type: "Recipe",
          value: {
            in: args[0],
            out: args[1],
          },
        } as TypeAST.AST;
      }

      if (lowerName === "pipe" && args.length === 2) {
        return {
          type: "Pipe",
          op1: args[0]!,
          op2: args[1]!,
        };
      }
      if (lowerName === "pipe2" && args.length === 3) {
        return {
          type: "Pipe2",
          op1: args[0]!,
          op2: args[1]!,
          op3: args[2]!,
        };
      }
      if (lowerName === "flip" && args.length === 1) {
        return { type: "Flip", arg: args[0]! };
      }
      if (lowerName === "apply" && args.length >= 2) {
        return {
          type: "Curry",
          base: args[0]!,
          args: args.slice(1),
        };
      }

      const internalName = operatorRegistry.operatorByNickname(name);
      if (internalName) {
        const baseOp: InternalAST = {
          type: "Operator",
          opName: internalName,
        };
        if (args.length > 0) {
          return { type: "Curry", base: baseOp, args: args };
        }
        return baseOp;
      }
    }

    const base: InternalAST = scope.has(name)
      ? { type: "Variable", name }
      : externalScope.has(name)
        ? (externalScope.get(name)! as InternalAST)
        : handleLiteral({ type: "identifier", value: name }, scope);
    if (args.length > 0) {
      return {
        type: "Curry",
        base: base,
        args: args,
      };
    }
    return base;
  }

  function handleLiteral(
    token: { type: string; value: string },
    scope: Set<string>
  ): InternalAST {
    switch (token.type) {
      case "integer":
        return { type: "Integer", value: token.value as TypeNumericString };
      case "long":
        return {
          type: "Long",
          value: token.value.replace(/[lL]$/, "") as TypeNumericString,
        };
      case "double":
        return {
          type: "Double",
          value: token.value.replace(/[dD]$/, "") as TypeNumericString,
        };
      case "string":
        return { type: "String", value: token.value.slice(1, -1) };
      case "boolean":
        return { type: "Boolean", value: token.value.toLowerCase() === "true" };
      case "null":
        return { type: "Null" };
      case "nbt":
        return { type: "NBT", value: JSON.parse(token.value) };
      case "identifier":
        if (scope.has(token.value))
          return { type: "Variable", name: token.value };
        if (externalScope.has(token.value))
          return externalScope.get(token.value)! as InternalAST;
        const internalName = operatorRegistry.operatorByNickname(token.value);
        if (internalName) return { type: "Operator", opName: internalName };
        throw new Error(`Unknown identifier: ${token.value}`);
      default:
        throw new Error(`Unexpected token type: ${token.type}`);
    }
  }

  const result = parseExpression(new Set());
  if (pos < tokens.length) {
    throw new Error(
      `Unexpected trailing tokens in Condensed: ${tokens
        .slice(pos)
        .map((t) => t.value)
        .join(" ")}`
    );
  }
  return result as TypeAST.AST;
};

export const ASTToCondensed = (ast: TypeAST.AST): string => {
  switch (ast.type) {
    case "Integer":
      return ast.value;
    case "Long":
      return ast.value + "l";
    case "Double": {
      let val = ast.value;
      if (!val.includes(".") && !/[dD]$/.test(val)) {
        val += ".0";
      }
      return val;
    }
    case "String":
      return JSON.stringify(ast.value);
    case "Boolean":
      return ast.value ? "true" : "false";
    case "Null":
      return "null";
    case "NBT":
      return JSON.stringify(ast.value);

    case "Block":
    case "Item":
    case "Fluid":
    case "Entity":
    case "Ingredients":
      return `${ast.type}(${JSON.stringify(ast.value)})`;

    case "Recipe":
      return `Recipe(${ASTToCondensed(ast.value.in)}, ${ASTToCondensed(
        ast.value.out
      )})`;

    case "Operator": {
      const opClass = operatorRegistry[ast.opName];
      if (!opClass) throw new Error(`Unknown operator: ${ast.opName}`);
      return opClass.interactName;
    }

    case "Curry": {
      const args = ast.args.map(ASTToCondensed).join(", ");
      const base = ASTToCondensed(ast.base);
      return `apply(${base}, ${args})`;
    }

    case "Pipe":
      return `pipe(${ASTToCondensed(ast.op1)}, ${ASTToCondensed(ast.op2)})`;

    case "Pipe2":
      return `pipe2(${ASTToCondensed(ast.op1)}, ${ASTToCondensed(
        ast.op2
      )}, ${ASTToCondensed(ast.op3)})`;

    case "Flip":
      return `flip(${ASTToCondensed(ast.arg)})`;
  }
};
