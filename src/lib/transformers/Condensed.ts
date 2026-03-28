import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import {
  getOpName,
  getArity,
  expectsOperatorArgument,
} from "lib/HelperClasses/UtilityFunctions";

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

    if (
      !state.inString &&
      state.inJSON === 0 &&
      char === "-" &&
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
      tokens.push({ type: "structural", value: "->" });
      i++; // Skip ">"
      continue;
    }

    const isStructural =
      !state.inString && state.inJSON === 0 && /^[(),\\]$/.test(char);
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
    | {
        type: "Recipe";
        value: TypeAST.Recipe["value"];
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
      const arrow = tokens[pos];
      if (
        arrow &&
        arrow.type === "structural" &&
        (arrow.value === "=>" || arrow.value === "->")
      ) {
        return params;
      }
    } else if (next.type === "structural" && next.value === "\\") {
      pos++; // consume \
      const paramToken = tokens[pos];
      if (!paramToken || paramToken.type !== "identifier") {
        pos = startPos;
        return null;
      }
      const dotIdx = paramToken.value.lastIndexOf(".");
      if (dotIdx !== -1) {
        const param = paramToken.value.substring(0, dotIdx);
        const rest = paramToken.value.substring(dotIdx + 1);
        tokens[pos] = { type: "structural", value: "." };
        if (rest)
          tokens.splice(pos + 1, 0, { type: "identifier", value: rest });
        tokens.splice(pos, 0, { type: "identifier", value: param });
        pos++;
        return [param];
      }
    } else if (next.type === "identifier") {
      const p = tokens[pos++];
      const arrow = tokens[pos];
      if (
        arrow &&
        arrow.type === "structural" &&
        (arrow.value === "=>" || arrow.value === "->")
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
      const sep = tokens[pos];
      if (
        sep &&
        sep.type === "structural" &&
        (sep.value === "=>" || sep.value === "->" || sep.value === ".")
      ) {
        pos++; // consume separator
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

  function handleCall(
    name: string,
    args: InternalAST[],
    scope: Set<string>
  ): InternalAST {
    const internalKey = operatorRegistry.operatorByNickname(name);
    if (scope.has(name)) {
      throw new Error(`Non-base operator not directly callable, use apply`);
    }
    const base: InternalAST = externalScope.has(name)
      ? (externalScope.get(name)! as InternalAST)
      : internalKey
        ? { type: "Operator", opName: internalKey }
        : [
              "block",
              "item",
              "fluid",
              "entity",
              "ingredients",
              "recipe",
            ].includes(name.toLowerCase())
          ? { type: "Identifier", value: name }
          : handleLiteral({ type: "identifier", value: name }, scope);

    return handleCallInternal(base, args);
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
            throw new Error(`Incorrect arity`);
          }
        }
      }
    }

    if (base.type === "Curry" && !base.varName) {
      return handleCallInternal(base.base, [...base.args, ...args]);
    }

    let op: BaseOperator<IntegratedValue, IntegratedValue> | void = undefined;
    if (base.type === "Operator") {
      const opClass = operatorRegistry[base.opName];
      if (opClass) {
        try {
          op = new opClass(false);
        } catch (e) {}
      }
      if (!op) op = operatorRegistry.find(base.opName);

      const arity = getArity(base as TypeAST.Operator);
      if (args.length > arity && arity !== 0) {
        if (!op || op.serializer !== "integrateddynamics:curry") {
          throw new Error(
            `Incorrect arity: operator expects ${arity} arguments but received ${args.length}.`
          );
        }
      }
    }

    let isApplyOp = false;
    if (op && (op as any).serializer === "integrateddynamics:curry") {
      isApplyOp = true;
    }

    if (isApplyOp && args.length >= 1) {
      const [newBase, ...rest] = args;
      if (
        newBase!.type === "Operator" ||
        (newBase!.type === "Curry" && !newBase.varName)
      ) {
        const remainingArity = getArity(newBase as any);
        if (rest.length <= remainingArity) {
          return handleCallInternal(newBase!, rest);
        }
      }
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
            value: (args[0] as TypeAST.Ingredients).value,
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
              const arg2 = args[2]!;
              if (arg2.type === "NBT" || arg2.type === "Identifier") {
                props = arg2.value;
              }
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
        const val = (args[0] as { value: TypeAST.Recipe["value"] }).value;
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
        } as InternalAST;
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

    if (args.length === 0) return base;
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
  const APPLY_OP = ID_OP("OPERATOR_APPLY" as TypeOperatorKey);
  const CONST_OP = ID_OP("GENERAL_CONSTANT" as TypeOperatorKey);
  const IDEN_OP = ID_OP("GENERAL_IDENTITY" as TypeOperatorKey);

  function abstract(param: string, body: InternalAST): InternalAST {
    if (body.type === "Curry" && body.args.length === 1) {
      const f = body.base;
      const arg = body.args[0]!;

      if (
        arg.type === "Variable" &&
        arg.name === param &&
        !containsVar(param, f as InternalAST)
      ) {
        return f as InternalAST;
      }

      if (f.type === "Curry" && f.args.length === 1) {
        const g = f.base;
        const arg1 = f.args[0]!;
        if (
          arg1.type === "Variable" &&
          arg1.name === param &&
          !containsVar(param, g as InternalAST) &&
          !containsVar(param, arg as InternalAST)
        ) {
          return {
            type: "Curry",
            base: { type: "Flip", arg: g as TypeAST.AST } as TypeAST.AST,
            args: [arg as TypeAST.AST],
          } as InternalAST;
        }
      }
    }

    if (body.type === "Variable" && body.name === param) {
      return IDEN_OP;
    }

    if (!containsVar(param, body)) {
      return { type: "Curry", base: CONST_OP, args: [body as TypeAST.AST] };
    }

    if (body.type === "Curry" && body.args.length === 1) {
      const E1 = body.base;
      const E2 = body.args[0]!;

      const xInE1 = containsVar(param, E1);
      const xInE2 = containsVar(param, E2);

      if (xInE1 && xInE2) {
        if (
          E1.type === "Curry" &&
          E1.args.length === 1 &&
          !containsVar(param, E1.base)
        ) {
          return {
            type: "Pipe2",
            op1: abstract(param, E1.args[0]!) as TypeAST.AST,
            op2: abstract(param, E2) as TypeAST.AST,
            op3: E1.base as TypeAST.AST,
          };
        }

        return {
          type: "Pipe2",
          op1: abstract(param, E1) as TypeAST.AST,
          op2: abstract(param, E2) as TypeAST.AST,
          op3: APPLY_OP as TypeAST.AST,
        };
      } else if (xInE1) {
        const flipApply: InternalAST = {
          type: "Flip",
          arg: APPLY_OP as TypeAST.AST,
        };
        const callback: InternalAST = {
          type: "Curry",
          base: flipApply as TypeAST.AST,
          args: [E2 as TypeAST.AST],
        };
        return {
          type: "Pipe",
          op1: abstract(param, E1) as TypeAST.AST,
          op2: callback as TypeAST.AST,
        };
      } else {
        if (E2.type === "Variable" && E2.name === param) {
          return E1;
        }

        return {
          type: "Pipe",
          op1: abstract(param, E2) as TypeAST.AST,
          op2: E1 as TypeAST.AST,
        };
      }
    } else if (body.type === "Curry" && body.args.length > 1) {
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

    if (body.type === "Pipe") {
      return {
        type: "Pipe2",
        op1: abstract(param, body.op1) as TypeAST.AST,
        op2: abstract(param, body.op2) as TypeAST.AST,
        op3: ID_OP("OPERATOR_PIPE") as TypeAST.AST,
      };
    }

    if (body.type === "Flip") {
      return {
        type: "Pipe",
        op1: abstract(param, body.arg) as TypeAST.AST,
        op2: ID_OP("OPERATOR_FLIP") as TypeAST.AST,
      };
    }

    throw new Error(`Could not abstract "${param}" from expression`);
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
        const lower = token.value.toLowerCase();
        if (
          [
            "block",
            "item",
            "fluid",
            "entity",
            "ingredients",
            "recipe",
          ].includes(lower)
        ) {
          return { type: "Identifier", value: token.value };
        }
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

export const ASTToCondensed = (ast: TypeAST.AST, isTopLevel = true): string => {
  const stringify = (node: TypeAST.AST, topLevel = false): string => {
    if (node.varName && !topLevel) {
      return node.varName;
    }

    let result = "UNKNOWN";

    switch (node.type) {
      case "Integer":
        result = node.value;
        break;
      case "Long":
        result = node.value + "l";
        break;
      case "Double": {
        let val = node.value;
        if (!val.includes(".") && !/[dD]$/.test(val)) {
          val += ".0";
        }
        result = val;
        break;
      }
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

      case "Block":
      case "Item":
      case "Fluid":
      case "Entity": {
        const val = node.value as jsonObject;
        const args = [JSON.stringify(val["id"])];
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
        result = `Recipe(${JSON.stringify(node.value)})`;
        break;

      case "Operator": {
        result = getOpName(node.opName);
        break;
      }

      case "Curry": {
        const arity = getArity(node.base);
        if (node.base.type === "Operator" && node.args.length === arity) {
          const base = stringify(node.base, false);
          const argsStr = node.args.map((a) => stringify(a, false)).join(", ");
          result = `${base}(${argsStr})`;
        } else {
          let currentBase = stringify(node.base, false);
          let i = 0;
          const n = node.args.length;
          if (n === 0) {
            result = currentBase;
          } else {
            while (i < n) {
              const take = Math.min(n - i, 3);
              const argsChunk = node.args
                .slice(i, i + take)
                .map((a) => stringify(a, false))
                .join(", ");
              const applyName = take === 1 ? "apply" : `apply${take}`;
              currentBase = `${applyName}(${currentBase}, ${argsChunk})`;
              i += take;
            }
            result = currentBase;
          }
        }
        break;
      }

      case "Pipe":
        result = `${getOpName("OPERATOR_PIPE")}(${stringify(node.op1, false)}, ${stringify(
          node.op2,
          false
        )})`;
        break;

      case "Pipe2":
        result = `${getOpName("OPERATOR_PIPE2")}(${stringify(node.op1, false)}, ${stringify(
          node.op2,
          false
        )}, ${stringify(node.op3, false)})`;
        break;

      case "Flip":
        result = `${getOpName("OPERATOR_FLIP")}(${stringify(node.arg, false)})`;
        break;
    }

    if (node.varName && topLevel) {
      return `${node.varName} = ${result}`;
    }
    return result;
  };

  return stringify(ast, isTopLevel);
};
