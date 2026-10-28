import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import {
  InvalidArityParseError,
  StructuralParseError,
  UnknownIdentifierParseError,
} from "lib/transformers/parseErrors";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { assertReaderSimulatedOutputType } from "lib/IntegratedDynamicsClasses/readers/readerSimulatedValueResolver";
import {
  getReaderAspectDisplayName,
  getReaderAspectKey,
  getReaderClassByName,
  getReaderClassByTypeName,
  getReaderConstructorClass,
} from "lib/IntegratedDynamicsClasses/readers/readerRegistry";
import {
  attachNodeComments,
  getOpName,
  formatVarName,
  isVarNameExpandedSafe,
  resolveImplicitFlipOperator,
  setOperatorSourceName,
  flattenAnonymousBaseOperatorApplication,
  getArity,
  parseNumericLiteralToken,
  unwrapParamWrapper,
  type CommentSpan,
  type TokenComment,
} from "lib/transformers/helpers";
import {
  assertNoTopLevelVarRefs,
  buildNetworkCards,
  getNetworkDefLastCardIds,
  getNetworkSegmentRefs,
  getRefInfo,
} from "lib/transformers/NetworkCards";
import { normalizeSegments } from "lib/transformers/MixedLists";
import { BinderScope } from "lib/transformers/binderScope";
import { parseLambdaParamEntry } from "lib/transformers/lambdaParams";
import { variableFromAt, variableFromName } from "lib/transformers/variableRef";
import {
  isReservedName,
  operatorLabel,
  reservedNameMessage,
  shadowedOperatorKey,
  type NameShadowOptions,
} from "lib/transformers/nicknameShadow";
import {
  buildBlockLikeConstructor,
  buildIngredientsConstructor,
  buildRecipeConstructor,
  ingredientsToText,
  recipeToText,
} from "lib/transformers/constructors";
import {
  QuoteDelimiter,
  convenienceAstFor,
  unquoteString,
} from "lib/transformers/Condensed";
import {
  extractCardOperands,
  getCardOperandIndex,
  parseCardOperand,
} from "lib/transformers/cardOperand";
import { sourceToNetworkCards } from "lib/transformers/sourceNodes";
import { isConvenienceExpression } from "lib/transformers/convenienceOperators";

export interface CodeLineOutputOptions {
  joinStatements?: ";" | "\n";
  refStyle?: "varId" | "refs";
  atNameRefs?: boolean;
  varIdRefsByName?: Map<string, string>;
}

export const ASTToCodeLine = (
  ast: TypeAST.AST,
  isTopLevel = true,
  startVariableId = 0,
  outputOpts: CodeLineOutputOptions = {}
): string => {
  const defLastCardIds = getNetworkDefLastCardIds(ast, startVariableId);
  const segmentRefs = getNetworkSegmentRefs(ast);

  const refString = (node: TypeAST.AST): string | null => {
    const lastCardId = defLastCardIds.get(node);
    const refInfo = getRefInfo(node);
    if (lastCardId === undefined && refInfo === undefined) return null;
    const cardId =
      lastCardId !== undefined
        ? String(lastCardId)
        : (node as unknown as { value: string }).value;

    if (outputOpts.refStyle === "refs") {
      const seg = segmentRefs?.get(node);
      if (seg) {
        return seg.segmentIndex === seg.totalSegments - 1
          ? "@calculation"
          : `@${seg.segmentIndex}`;
      }
      if (refInfo) {
        if (refInfo.isFinalCalculation) return "@calculation";
        if (refInfo.segmentIndex !== undefined)
          return `@${refInfo.segmentIndex}`;
      }
    }
    return cardId;
  };

  const paramStack: TypeAST.LambdaParam[][] = [];

  const stringifyParamHeader = (params: TypeAST.LambdaParam[]): string => {
    if (params.length === 1 && params[0]!.type === undefined) {
      return params[0]!.name;
    }
    const entries = params.map((param) =>
      param.type === undefined ? param.name : `${param.name}: ${param.type}`
    );
    return `(${entries.join(", ")})`;
  };

  const stringifyParamReference = (node: TypeAST.Param): string => {
    const depth = node.binderDepth ?? 0;
    const binder = paramStack[paramStack.length - 1 - depth];
    if (!binder) {
      throw new StructuralParseError(
        `Parameter #${node.index + 1} has no enclosing lambda for binder depth ${depth}`
      );
    }
    const param = binder[node.index];
    if (!param) {
      throw new StructuralParseError(
        `Parameter index ${node.index} is out of range for the enclosing lambda`
      );
    }
    if (node.name !== undefined && node.name !== param.name) {
      throw new StructuralParseError(
        `Parameter #${node.index + 1} is named "${node.name}" but its binder calls it "${param.name}"`
      );
    }
    return param.name;
  };

  const stringify = (node: TypeAST.AST, topLevel = false): string => {
    const ref = refString(node);
    if (ref !== null && !topLevel) {
      return ref;
    }

    if (node.varName && !topLevel) {
      const varId = outputOpts.varIdRefsByName?.get(node.varName);
      if (varId !== undefined) return varId;
      const formatted = formatVarName(node.varName);
      if (outputOpts.atNameRefs && !formatted.startsWith("@")) {
        return `@${formatted}`;
      }
      return formatted;
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
      node.type === "Recipe" ||
      node.type === "Variable" ||
      node.type === "Param";

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
      case "Variable": {
        const refName = node.label ?? node.id;
        if (refName === undefined) {
          throw new StructuralParseError(
            "A Variable node requires an id or a label"
          );
        }
        if (node.label === undefined) {
          result = `@${node.id}`;
          break;
        }
        const varId = outputOpts.varIdRefsByName?.get(node.label);
        if (varId !== undefined) {
          result = varId;
          break;
        }
        result = isVarNameExpandedSafe(refName)
          ? `@${refName}`
          : `Variable(${JSON.stringify(refName)})`;
        break;
      }
      case "Param":
        result = stringifyParamReference(node);
        break;
      case "Lambda": {
        paramStack.push(node.params);
        let body: string;
        try {
          body = stringify(node.body, false);
        } finally {
          paramStack.pop();
        }
        result = `${stringifyParamHeader(node.params)} => ${body}`;
        break;
      }
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
        if (node.type === "Entity" && typeof node.value === "string") {
          result = `Entity(${JSON.stringify(node.value)})`;
          break;
        }
        const val = node.value as jsonObject;
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
        result = ingredientsToText(node, (entry) => stringify(entry, false));
        break;

      case "Recipe":
        result = recipeToText(node, (entry) => stringify(entry, false));
        break;

      case "Materialize":
        result = `Materialize(${stringify(node.value, false)})`;
        break;

      case "Dynamic":
        result = `Dynamic(${stringify(node.value, false)})`;
        break;

      case "Static":
        result = `Static(${stringify(node.value, false)})`;
        break;

      case "Display":
      case "Card":
        result = stringify(node.value, false);
        break;

      case "VarStore":
      case "DisplayPanel":
      case "Writer":
      case "Exporter":
      case "Importer":
        return sourceToNetworkCards(node)
          .definitions.map((def) => {
            const oldVarName = def.node.varName;
            delete def.node.varName;
            const statement = stringify(def.node, true);
            if (oldVarName) def.node.varName = oldVarName;
            return statement;
          })
          .join(outputOpts.joinStatements === "\n" ? "\n" : "; ");

      case "Reader": {
        const val = node.value;
        const partIdStr =
          val.partId !== undefined
            ? /^-?\d+(\.\d+)?$/.test(val.partId)
              ? val.partId
              : JSON.stringify(val.partId)
            : "";
        const constructor = `${val.reader}${partIdStr ? `(${partIdStr})` : ""}`;
        const args: string[] = [];
        if (val.settings !== undefined) {
          args.push(JSON.stringify(val.settings));
        }
        if (val.simulatedOutput !== undefined) {
          args.push(stringify(val.simulatedOutput, false));
        }
        const readerClass = getReaderClassByTypeName(val.reader);
        const aspectName = readerClass
          ? getReaderAspectDisplayName(readerClass, val.aspect)
          : val.aspect;
        result = `${constructor}.${aspectName}${
          args.length > 0 ? `(${args.join(", ")})` : ""
        }`;
        break;
      }

      case "NetworkCards":
        return node.definitions
          .map((def) => {
            const oldVarName = def.node.varName;
            delete def.node.varName;
            const statement = stringify(def.node, true);
            if (oldVarName) def.node.varName = oldVarName;
            return statement;
          })
          .join(outputOpts.joinStatements === "\n" ? "\n" : "; ");
    }

    if (node.varName && topLevel) {
      return `${formatVarName(node.varName)} = ${result}`;
    }
    return result;
  };

  return stringify(ast, isTopLevel);
};

export const CodeLineToAST = (
  codeLine: string,
  externalScope: Map<string, TypeAST.AST> = new Map(),
  startVariableId = 0,
  allowVarRefs = false,
  normalizeMixedLists = true,
  opts: NameShadowOptions = {}
): TypeAST.AST => {
  const { text, operands } = extractCardOperands(codeLine);
  codeLine = text;
  const tokens: string[] = [];
  const comments: TokenComment[] = [];
  let current = "";
  let quote: QuoteDelimiter | null = null;
  let inNBT = 0;

  for (let i = 0; i < codeLine.length; i++) {
    const char = codeLine[i]!;
    if (quote !== null) {
      current += char;
      if (quote === '"') {
        if (char === '"' && codeLine[i - 1] !== "\\") quote = null;
      } else if (quote === "'") {
        if (char === "'" && codeLine[i - 1] !== "\\") quote = null;
      } else {
        if (
          char === '"' &&
          codeLine[i + 1] === '"' &&
          codeLine[i + 2] === '"' &&
          codeLine[i - 1] !== "\\"
        ) {
          let run = 1;
          while (codeLine[i + run] === '"') run++;
          if (run === 3) {
            quote = null;
            current += '""';
            i += 2;
          }
        }
      }
    } else if (inNBT > 0) {
      current += char;
      if (char === "{") inNBT++;
      else if (char === "}") inNBT--;
    } else if (
      char === '"' &&
      codeLine[i + 1] === '"' &&
      codeLine[i + 2] === '"'
    ) {
      quote = '"""';
      current += '"""';
      i += 2;
    } else if (char === '"') {
      quote = '"';
      current += char;
    } else if (char === "'") {
      quote = "'";
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
    } else if (char === "-" && codeLine[i + 1] === "-") {
      if (current.trim()) tokens.push(current.trim());
      current = "";
      const commentStart = i;
      while (i < codeLine.length && codeLine[i] !== "\n") i++;
      comments.push({
        afterToken: tokens.length,
        text: codeLine.slice(commentStart, i).trim(),
      });
    } else if (
      char === "(" ||
      char === ")" ||
      char === "," ||
      char === "\\" ||
      char === "[" ||
      char === "]" ||
      char === ";"
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
    | {
        type: "Variable";
        id?: string;
        label?: string;
        valueType?: string;
        varName?: string;
      }
    | {
        type: "Param";
        index: number;
        binderDepth?: number;
        name?: string;
        varName?: string;
      }
    | {
        type: "Lambda";
        params: TypeAST.LambdaParam[];
        body: InternalAST;
        text?: string;
        varName?: string;
      }
    | { type: "Identifier"; value: string }
    | {
        type: "Reader";
        value: TypeAST.Reader["value"];
        varName?: string;
      }
    | { type: "Materialize"; value: InternalAST; varName?: string }
    | { type: "Dynamic"; value: InternalAST; varName?: string }
    | { type: "Static"; value: InternalAST; varName?: string }
    | { type: "Display"; value: InternalAST; varName?: string }
    | { type: "Card"; value: InternalAST; varName?: string };

  const checkParamShadow = (name: string): void => {
    if (isReservedName(name)) {
      throw new StructuralParseError(reservedNameMessage(name));
    }
    const aliasKey = shadowedOperatorKey(name);
    if (!aliasKey) return;
    if ((opts.operatorShadow ?? "error") === "error") {
      throw new StructuralParseError(
        `Variable name "${name}" clashes with an existing operator nickname (${operatorLabel(
          aliasKey
        )}). Rename it, or set "Operator shadow" to Warn.`
      );
    }
    opts.warnings?.push(
      `Parameter "${name}" clashes with an existing operator nickname (${operatorLabel(
        aliasKey
      )}).`
    );
  };

  function tryParseParams(): TypeAST.LambdaParam[] | null {
    const startPos = pos;
    const next = tokens[pos];
    if (!next) return null;

    if (next === "(") {
      pos++;
      const entries: string[][] = [];
      let entry: string[] = [];
      while (tokens[pos] && tokens[pos] !== ")") {
        const p = tokens[pos++]!;
        if (p === ",") {
          entries.push(entry);
          entry = [];
          continue;
        }
        entry.push(p);
      }
      if (tokens[pos] !== ")") {
        pos = startPos;
        return null;
      }
      pos++;
      const arrow = tokens[pos];
      if (arrow !== "=>" && arrow !== "->") {
        pos = startPos;
        return null;
      }
      entries.push(entry);
      const params = entries
        .filter((parts) => !(entries.length === 1 && parts.length === 0))
        .map((parts, index) => {
          const param = parseLambdaParamEntry(parts, index);
          if (!/^[A-Za-z0-9\\._&|]+$/.test(param.name)) {
            throw new StructuralParseError(
              `Invalid lambda parameter name: "${param.name}"`
            );
          }
          checkParamShadow(param.name);
          return param;
        });
      const seenParams = new Set<string>();
      for (const param of params) {
        if (seenParams.has(param.name)) {
          throw new StructuralParseError(
            `Duplicate variable name "${param.name}" in lambda`
          );
        }
        seenParams.add(param.name);
      }
      return params;
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
        checkParamShadow(param);
        return [{ name: param }];
      }
    } else if (/^[A-Za-z0-9\\._&|]+$/.test(next)) {
      pos++;
      const arrow = tokens[pos];
      if (arrow === "=>" || arrow === "->") {
        checkParamShadow(next);
        return [{ name: next }];
      }
    }
    pos = startPos;
    return null;
  }

  const spans: CommentSpan[] = [];

  function parseExpression(scope: BinderScope): InternalAST {
    const start = pos;
    const node = parseExpressionInner(scope);
    if (pos > start) spans.push({ start, end: pos, node: node as TypeAST.AST });
    return node;
  }

  function tryParseWrapperExpression(
    scope: BinderScope
  ): InternalAST | undefined {
    const token = tokens[pos];
    if (token === undefined) return undefined;
    const lower = token.toLowerCase();
    const canonical =
      lower === "materialize"
        ? "Materialize"
        : lower === "dynamic"
          ? "Dynamic"
          : lower === "static"
            ? "Static"
            : lower === "display"
              ? "Display"
              : undefined;
    if (!canonical) return undefined;
    if (scope.has(token) || externalScope.has(token)) return undefined;
    if (tokens[pos + 1] !== "(") return undefined;
    pos += 2; // consume name and '('
    const value = parseSequence(scope, false);
    if (tokens[pos] !== ")") {
      throw new StructuralParseError(
        `Expected ')' after ${canonical} argument`
      );
    }
    pos++; // consume ')'
    return unwrapParamWrapper({
      type: canonical,
      value,
    } as TypeAST.Materialize) as InternalAST;
  }

  function parseExpressionInner(scope: BinderScope): InternalAST {
    const params = tryParseParams();
    if (params !== null) {
      const sep = tokens[pos];
      if (sep === "=>" || sep === "->" || sep === ".") {
        pos++;
        const body = parseSequence(
          scope.push(params.map((param) => param.name)),
          true
        );
        return { type: "Lambda", params, body };
      }
    }

    const wrapperExpr = tryParseWrapperExpression(scope);
    if (wrapperExpr !== undefined) return wrapperExpr;

    const readerExpr = tryParseReaderExpression(scope);
    if (readerExpr !== undefined) return readerExpr;

    const token = tokens[pos++];
    if (!token) throw new StructuralParseError("Unexpected end of input");

    if (token === "(") {
      const result = parseSequence(scope, false);
      if (tokens[pos] !== ")") throw new StructuralParseError("Expected ')'");
      pos++;
      return result;
    }

    if (token === "[") {
      const values: InternalAST[] = [];
      while (pos < tokens.length && tokens[pos] !== "]") {
        values.push(parseExpression(scope));
        if (tokens[pos] === ",") pos++;
      }
      if (tokens[pos] !== "]") throw new StructuralParseError("Expected ']'");
      pos++;
      if (values.some((value) => value.type === "Card")) {
        throw new StructuralParseError(
          "Card(...) cannot be used inside a list; give it a name of its own"
        );
      }
      return { type: "List", value: values };
    }

    if (token === ",") {
      return parseExpression(scope);
    }

    if (
      token.startsWith('"') ||
      token.startsWith("'") ||
      token.startsWith('"""')
    )
      return { type: "String", value: unquoteString(token) };
    if (token.startsWith("{")) return { type: "NBT", value: JSON.parse(token) };
    if (token.startsWith("@")) {
      if (token.slice(1).toLowerCase() === "variable" && tokens[pos] === "(") {
        pos++; // consume (
        const args: InternalAST[] = [];
        while (pos < tokens.length && tokens[pos] !== ")") {
          args.push(parseExpression(scope));
          if (tokens[pos] === ",") pos++;
        }
        if (tokens[pos] !== ")") throw new StructuralParseError("Expected ')'");
        pos++; // consume )
        if (args.length !== 1 || args[0]!.type !== "String") {
          throw new InvalidArityParseError(
            "Variable(...) expects exactly one string argument"
          );
        }
        return variableFromName(
          (args[0] as { value: string }).value
        ) as InternalAST;
      }
      return variableFromAt(token) as InternalAST;
    }
    const numeric = parseNumericLiteralToken(token);
    if (numeric !== null) {
      return { type: numeric.type, value: numeric.value } as InternalAST;
    }
    const lowerToken = token.toLowerCase();
    if (lowerToken === "true") return { type: "Boolean", value: true };
    if (lowerToken === "false") return { type: "Boolean", value: false };
    if (lowerToken === "null") return { type: "Null" };

    const operandIndex = getCardOperandIndex(token);
    if (operandIndex !== null) {
      const operand = operands[operandIndex];
      if (operand === undefined) {
        throw new StructuralParseError(`Unknown card operand ${token}`);
      }
      return parseCardOperand(operand) as InternalAST;
    }
    const binding = scope.lookup(token);
    if (binding) {
      return {
        type: "Param",
        index: binding.index,
        ...(binding.binderDepth > 0
          ? { binderDepth: binding.binderDepth }
          : {}),
        name: token,
      };
    }
    if (externalScope.has(token))
      return externalScope.get(token)! as InternalAST;

    if (
      [
        "block",
        "item",
        "fluid",
        "entity",
        "ingredients",
        "recipe",
        "operator",
        "variable",
      ].includes(lowerToken)
    ) {
      if (tokens[pos] === "(") {
        pos++; // consume (
        const args: InternalAST[] = [];
        while (pos < tokens.length && tokens[pos] !== ")") {
          args.push(parseExpression(scope));
          if (tokens[pos] === ",") pos++;
        }
        if (tokens[pos] !== ")") throw new StructuralParseError("Expected ')'");
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
    if (implicitFlip) return implicitFlip as InternalAST;

    const convenience = convenienceAstFor(token);
    if (convenience) return convenience as InternalAST;

    throw new UnknownIdentifierParseError(`Unknown identifier: ${token}`);
  }

  function parseSequence(scope: BinderScope, consumeAll: boolean): InternalAST {
    let result: InternalAST | undefined = undefined;

    while (
      pos < tokens.length &&
      (consumeAll || tokens[pos] !== ")") &&
      tokens[pos] !== ";"
    ) {
      const next = tokens[pos];
      if (next === ")" || next === ";") break;

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

    if (result === undefined) throw new StructuralParseError("Empty sequence");
    return result;
  }

  const parseReaderExtraArgs = (
    args: InternalAST[]
  ): {
    settings?: Record<string, number | boolean | string>;
    simulatedOutput?: InternalAST;
  } => {
    let settings: Record<string, number | boolean | string> | undefined;
    let simulatedOutput: InternalAST | undefined;
    for (const arg of args) {
      if (arg.type === "NBT") {
        if (settings !== undefined) {
          throw new InvalidArityParseError(
            "Reader call may only contain one settings json object"
          );
        }
        const value = arg.value;
        if (
          typeof value !== "object" ||
          value === null ||
          Array.isArray(value)
        ) {
          throw new InvalidArityParseError(
            "Reader settings must be a json object"
          );
        }
        settings = value as Record<string, number | boolean | string>;
      } else {
        if (simulatedOutput !== undefined) {
          throw new InvalidArityParseError(
            "Reader call may only contain one simulated output"
          );
        }
        simulatedOutput = arg;
      }
    }
    return { settings, simulatedOutput };
  };

  const parseReaderArg = (scope: BinderScope): InternalAST => {
    let arg = parseExpression(scope);
    while (tokens[pos] && tokens[pos] !== "," && tokens[pos] !== ")") {
      arg = handleCallInternal(arg, [parseExpression(scope)]);
    }
    return arg;
  };

  const parseReaderCallArgs = (
    scope: BinderScope
  ): {
    settings?: Record<string, number | boolean | string>;
    simulatedOutput?: InternalAST;
  } => {
    if (tokens[pos] !== "(") {
      return {};
    }
    pos++; // consume (
    const args: InternalAST[] = [];
    while (tokens[pos] && tokens[pos] !== ")") {
      args.push(parseReaderArg(scope));
      if (tokens[pos] === ",") pos++;
    }
    if (!tokens[pos])
      throw new StructuralParseError("Expected ')' after reader aspect args");
    pos++; // consume )
    return parseReaderExtraArgs(args);
  };

  const peekDotAspectName = (): string | undefined => {
    const next = tokens[pos];
    if (next === undefined) return undefined;
    if (next === ".") {
      const after = tokens[pos + 1];
      if (after !== undefined && !after.startsWith(".")) return after;
      return undefined;
    }
    if (next.startsWith(".")) return next.slice(1);
    return undefined;
  };

  const consumeDotAspectName = (): string => {
    const next = tokens[pos];
    if (next === undefined) {
      throw new StructuralParseError("Expected '.' before aspect name");
    }
    if (next === ".") {
      pos++;
      const after = tokens[pos];
      if (after === undefined) {
        throw new StructuralParseError("Expected aspect name after '.'");
      }
      pos++;
      return after;
    }
    if (next.startsWith(".")) {
      pos++;
      return next.slice(1);
    }
    throw new StructuralParseError("Expected '.' before aspect name");
  };

  const tryParseReaderExpression = (
    scope: BinderScope
  ): InternalAST | undefined => {
    const token = tokens[pos];
    if (token === undefined) return undefined;
    if (scope.has(token) || externalScope.has(token)) return undefined;

    const lower = token.toLowerCase();

    if (lower === "reader") {
      if (tokens[pos + 1] !== "(") return undefined;
      pos += 2; // consume reader + (
      const args: InternalAST[] = [];
      while (tokens[pos] && tokens[pos] !== ")") {
        args.push(parseReaderArg(scope));
        if (tokens[pos] === ",") pos++;
      }
      if (!tokens[pos])
        throw new StructuralParseError("Expected ')' in reader(...)");
      pos++; // consume )
      if (args.length < 2) {
        throw new InvalidArityParseError(
          "reader(...) requires a reader name and an aspect"
        );
      }
      const readerNameArg = args[0]!;
      const aspectArg = args[1]!;
      if (readerNameArg.type !== "String" || aspectArg.type !== "String") {
        throw new InvalidArityParseError(
          "reader(...) expects reader name and aspect as strings"
        );
      }
      const readerClass = getReaderClassByName(readerNameArg.value);
      if (!readerClass) {
        throw new UnknownIdentifierParseError(
          `Unknown reader: ${readerNameArg.value}`
        );
      }
      const aspectKey = getReaderAspectKey(readerClass, aspectArg.value);
      if (!aspectKey) {
        throw new UnknownIdentifierParseError(
          `Unknown aspect "${aspectArg.value}" for ${readerClass.typeName}`
        );
      }
      const { settings, simulatedOutput } = parseReaderExtraArgs(args.slice(2));
      assertReaderSimulatedOutputType(readerClass, aspectKey, simulatedOutput);
      return {
        type: "Reader",
        value: {
          reader: readerClass.typeName,
          aspect: aspectKey,
          settings,
          simulatedOutput: simulatedOutput as TypeAST.AST,
        },
      };
    }

    let constructorToken = token;
    let gluedAspect: string | undefined;
    const readersPrefix = "readers.";
    if (lower.startsWith(readersPrefix)) {
      const rest = lower.slice(readersPrefix.length);
      const dotIdx = rest.indexOf(".");
      if (dotIdx !== -1) {
        constructorToken = token.slice(0, readersPrefix.length + dotIdx);
        gluedAspect = token.slice(readersPrefix.length + dotIdx + 1);
      }
    } else {
      const dotIdx = token.indexOf(".");
      if (dotIdx !== -1) {
        constructorToken = token.slice(0, dotIdx);
        gluedAspect = token.slice(dotIdx + 1);
      }
    }
    const readerClass = getReaderConstructorClass(constructorToken);
    if (!readerClass) return undefined;

    if (gluedAspect === undefined && tokens[pos + 1] === "(") {
      pos += 2; // consume name + (
      const args: InternalAST[] = [];
      while (tokens[pos] && tokens[pos] !== ")") {
        args.push(parseReaderArg(scope));
        if (tokens[pos] === ",") pos++;
      }
      if (!tokens[pos])
        throw new StructuralParseError("Expected ')' after reader name");
      pos++; // consume )

      if (peekDotAspectName() !== undefined) {
        if (args.length > 1) {
          throw new InvalidArityParseError(
            "Reader constructor takes at most one part id"
          );
        }
        let partId: string | undefined;
        if (args.length === 1) {
          const a = args[0]!;
          if (
            a.type !== "Integer" &&
            a.type !== "Long" &&
            a.type !== "Double" &&
            a.type !== "String"
          ) {
            throw new InvalidArityParseError(
              "Reader part id must be a literal value"
            );
          }
          partId = (a as { value: string }).value;
          if (!/^\d+$/.test(partId)) {
            throw new StructuralParseError(
              `Reader part id must be a non-negative integer, got "${partId}"`
            );
          }
        }
        const aspectName = consumeDotAspectName();
        const aspectKey = getReaderAspectKey(readerClass, aspectName);
        if (!aspectKey) {
          throw new UnknownIdentifierParseError(
            `Unknown aspect "${aspectName}" for ${readerClass.typeName}`
          );
        }
        const { settings, simulatedOutput } = parseReaderCallArgs(scope);
        assertReaderSimulatedOutputType(
          readerClass,
          aspectKey,
          simulatedOutput
        );
        return {
          type: "Reader",
          value: {
            reader: readerClass.typeName,
            partId,
            aspect: aspectKey,
            settings,
            simulatedOutput: simulatedOutput as TypeAST.AST,
          },
        };
      }

      if (args.length < 1) {
        throw new InvalidArityParseError(
          "Reader constructor requires an aspect"
        );
      }
      const aspectArg = args[0]!;
      if (aspectArg.type !== "String") {
        throw new InvalidArityParseError("Reader aspect must be a string");
      }
      const aspectKey = getReaderAspectKey(readerClass, aspectArg.value);
      if (!aspectKey) {
        throw new UnknownIdentifierParseError(
          `Unknown aspect "${aspectArg.value}" for ${readerClass.typeName}`
        );
      }
      const { settings, simulatedOutput } = parseReaderExtraArgs(args.slice(1));
      assertReaderSimulatedOutputType(readerClass, aspectKey, simulatedOutput);
      return {
        type: "Reader",
        value: {
          reader: readerClass.typeName,
          aspect: aspectKey,
          settings,
          simulatedOutput: simulatedOutput as TypeAST.AST,
        },
      };
    }

    let aspectName = gluedAspect;
    if (aspectName === undefined) aspectName = peekDotAspectName();
    if (aspectName === undefined) return undefined;
    if (gluedAspect !== undefined) {
      pos++; // consume the glued constructor.aspect token
    } else {
      consumeDotAspectName();
    }
    const aspectKey = getReaderAspectKey(readerClass, aspectName);
    if (!aspectKey) {
      throw new UnknownIdentifierParseError(
        `Unknown aspect "${aspectName}" for ${readerClass.typeName}`
      );
    }
    const { settings, simulatedOutput } = parseReaderCallArgs(scope);
    assertReaderSimulatedOutputType(readerClass, aspectKey, simulatedOutput);
    return {
      type: "Reader",
      value: {
        reader: readerClass.typeName,
        aspect: aspectKey,
        settings,
        simulatedOutput: simulatedOutput as TypeAST.AST,
      },
    };
  };

  function handleCallInternal(
    base: InternalAST,
    args: InternalAST[]
  ): InternalAST {
    for (const arg of args) {
      if (arg.type === "Card") {
        throw new StructuralParseError(
          "Card(...) cannot be used inside a call; give it a name of its own"
        );
      }
    }
    if (
      base.type === "Curry" &&
      !base.varName &&
      !isConvenienceExpression(base)
    ) {
      return handleCallInternal(base.base, [...base.args, ...args]);
    }
    if (base.type === "Operator") {
      const opClass = operatorRegistry[base.opName];
      let op: BaseOperator<IntegratedValue, IntegratedValue> | void = undefined;
      if (opClass) {
        try {
          op = new opClass(false);
        } catch (e) {}
      }
      if (!op) op = operatorRegistry.find(base.opName);

      const arity = getArity(base);
      const leadingArgsApplyAFunction = args
        .slice(0, arity)
        .some(
          (arg) =>
            arg.type === "Operator" ||
            arg.type === "Curry" ||
            arg.type === "Pipe" ||
            arg.type === "Pipe2" ||
            arg.type === "Flip"
        );
      if (
        args.length > arity &&
        arity !== 0 &&
        op &&
        !leadingArgsApplyAFunction
      ) {
        const resultType = op
          .getSignatureNode()
          .getOutput(arity - 1)
          .getRootType();
        const resultIsCallable =
          resultType === "Function" ||
          resultType === "Operator" ||
          resultType === "Any";
        if (!resultIsCallable) {
          throw new InvalidArityParseError(
            `Incorrect arity: operator expects ${arity} arguments but received ${args.length}.`
          );
        }
      }
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
      if (lowerName === "operator") {
        const opName = (args[0] as { value: string }).value;
        const internalKey = operatorRegistry.operatorByNickname(opName);
        if (!internalKey) {
          throw new UnknownIdentifierParseError(`Unknown operator: ${opName}`);
        }
        return setOperatorSourceName(
          { type: "Operator", opName: internalKey as TypeOperatorKey },
          opName
        );
      }
      if (lowerName === "variable") {
        if (args.length !== 1 || args[0]!.type !== "String") {
          throw new InvalidArityParseError(
            "Variable(...) expects exactly one string argument"
          );
        }
        const varName = (args[0] as { value: string }).value;
        if (externalScope.has(varName)) {
          return externalScope.get(varName)! as InternalAST;
        }
        if (isReservedName(varName)) {
          throw new StructuralParseError(reservedNameMessage(varName));
        }
        const aliasKey = shadowedOperatorKey(varName);
        if (aliasKey) {
          if ((opts.operatorShadow ?? "error") === "error") {
            throw new StructuralParseError(
              `Variable("${varName}") overshadows an operator nickname (${operatorLabel(
                aliasKey
              )}). Rename it, or set "Operator shadow" to Warn.`
            );
          }
          opts.warnings?.push(
            `Variable("${varName}") refers to the operator ${operatorLabel(
              aliasKey
            )} because the setting allows overshadowing.`
          );
          return setOperatorSourceName(
            { type: "Operator", opName: aliasKey },
            varName
          ) as InternalAST;
        }
        return variableFromName(varName);
      }
      if (["block", "item", "fluid", "entity"].includes(lowerName)) {
        return buildBlockLikeConstructor(
          lowerName as "block" | "item" | "fluid" | "entity",
          args as TypeAST.AST[]
        ) as InternalAST;
      }

      if (lowerName === "ingredients") {
        return buildIngredientsConstructor(
          args as TypeAST.AST[]
        ) as unknown as InternalAST;
      }

      if (lowerName === "recipe") {
        return buildRecipeConstructor(
          args as TypeAST.AST[]
        ) as unknown as InternalAST;
      }
    }

    if (base.type === "Operator") {
      const name = base.opName;
      if (name === "OPERATOR_PIPE" && args.length === 2) {
        return {
          type: "Pipe",
          op1: args[0] as InternalAST,
          op2: args[1] as InternalAST,
        };
      }
      if (name === "OPERATOR_PIPE2" && args.length === 3) {
        return {
          type: "Pipe2",
          op1: args[0] as InternalAST,
          op2: args[1] as InternalAST,
          op3: args[2] as InternalAST,
        };
      }
      if (name === "OPERATOR_FLIP" && args.length === 1) {
        return { type: "Flip", arg: args[0] as InternalAST };
      }
    }

    return {
      type: "Curry",
      base: base as InternalAST,
      args: args as InternalAST[],
    };
  }

  const segments: InternalAST[] = [];
  while (pos < tokens.length) {
    segments.push(parseSequence(new BinderScope(), true));
    if (tokens[pos] === ";") {
      pos++;
      continue;
    }
    break;
  }
  if (pos < tokens.length) {
    throw new StructuralParseError(
      `Unexpected trailing tokens: ${tokens.slice(pos).join(" ")}`
    );
  }

  attachNodeComments(spans, comments);

  const normalized = normalizeMixedLists
    ? normalizeSegments(segments as TypeAST.AST[])
    : (segments as TypeAST.AST[]).map((segment) => ({
        hoisted: [],
        node: segment,
      }));

  if (normalized.length === 1 && normalized[0]!.hoisted.length === 0) {
    if (!allowVarRefs) assertNoTopLevelVarRefs(normalized[0]!.node);
    return normalized[0]!.node;
  }
  return buildNetworkCards(normalized, startVariableId);
};
