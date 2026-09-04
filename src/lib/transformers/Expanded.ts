import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { getReaderClassByTypeName } from "lib/IntegratedDynamicsClasses/readers/readerRegistry";
import { ASTToCodeLine, CodeLineToAST } from "lib/transformers/CodeLine";
import {
  ASTToCondensed,
  CondensedToAST,
  QuoteDelimiter,
  unquoteString,
} from "lib/transformers/Condensed";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import {
  getOpName,
  getNicknameRegex,
  formatVarName,
  getOperatorSourceName,
  flattenAnonymousBaseOperatorApplication,
} from "lib/transformers/helpers";
import {
  astContentKey,
  buildNetworkCards,
} from "lib/transformers/NetworkCards";
import { normalizeSegments } from "lib/transformers/MixedLists";
import { StructuralParseError } from "lib/transformers/parseErrors";

const getLabel = (index: number): string => {
  let label = "";
  let i = index;
  while (i >= 0) {
    label = String.fromCharCode(97 + (i % 26)) + label;
    i = Math.floor(i / 26) - 1;
  }
  return label;
};

const SIGNATURE_ARROW = "→";

export interface ExpandedSignatureOptions {
  depth: number | null;
  labels: boolean;
  arrow: "→" | "->";
  hideOperatorWrappers: boolean;
  forceUnwrapOperators?: boolean;
  noReturnParens?: boolean;
  resolveAnys?: boolean;
  parenFromFns?: boolean;
}

const parseDefinitionVarName = (
  raw: string,
  splitParams: boolean
): { name: string; quoted: boolean; params: string[] } => {
  const trimmed = raw.trim();
  const wrapper = trimmed.match(/^Variable\s*\(\s*(.*?)\s*\)$/i);
  if (wrapper) {
    const inner = wrapper[1]!.trim();
    if (
      inner.length >= 2 &&
      ((inner.startsWith('"') && inner.endsWith('"')) ||
        (inner.startsWith("'") && inner.endsWith("'")))
    ) {
      return { name: unquoteString(inner), quoted: true, params: [] };
    }
  }
  if (!splitParams) {
    return { name: trimmed, quoted: false, params: [] };
  }
  const parts = trimmed.split(/\s+/);
  return {
    name: parts[0]!,
    quoted: false,
    params: parts.slice(1),
  };
};

const applyLambdaParams = (exprStr: string, params: string[]): string =>
  params.length > 0 ? `${params.join(" => ")} => ${exprStr}` : exprStr;

class SignatureFormatter {
  private typeIDToLabel = new Map<number, string>();
  private counter = 0;

  private getLabelForID(typeID: number): string {
    if (!this.typeIDToLabel.has(typeID)) {
      this.typeIDToLabel.set(typeID, getLabel(this.counter++));
    }
    return this.typeIDToLabel.get(typeID)!;
  }

  format(sig: ParsedSignature, isReturnType = false): string {
    return this.formatDepth(
      sig,
      {
        depth: null,
        labels: false,
        arrow: SIGNATURE_ARROW,
        hideOperatorWrappers: false,
      },
      isReturnType
    );
  }

  formatDepth(
    sig: ParsedSignature,
    opts: ExpandedSignatureOptions,
    isReturnType = false
  ): string {
    const dec = (d: number | null): number | null =>
      d === null ? null : d - 1;

    const tainted = sig.applyTainted;
    const obscuredArity = (
      fn: TypeRawSignatureAST.RawSignatureFunction
    ): number => {
      let count = 0;
      let current: TypeRawSignatureAST.RawSignatureNode = fn;
      while (current.type === "Function") {
        count++;
        current = (current as TypeRawSignatureAST.RawSignatureFunction).to;
      }
      return count;
    };

    const render = (
      node: TypeRawSignatureAST.RawSignatureNode,
      depth: number | null,
      isReturn: boolean,
      isRoot: boolean
    ): string => {
      if (node.type === "Operator") {
        const inner = node.obscured;
        if (
          opts.hideOperatorWrappers &&
          (isRoot ||
            opts.forceUnwrapOperators ||
            !(tainted || obscuredArity(inner) >= 2))
        ) {
          const innerRendered = render(inner, dec(depth), false, false);
          return isRoot ? innerRendered : `(${innerRendered})`;
        }
        if (depth === 0) {
          return isRoot ? render(inner, 0, false, false) : "Operator";
        }
        return `Operator<${render(inner, dec(depth), false, false)}>`;
      }

      if (node.type === "Function") {
        const fromRendered = render(node.from, dec(depth), false, false);
        const from =
          opts.parenFromFns && node.from.type === "Function"
            ? `(${fromRendered})`
            : fromRendered;
        const to = render(node.to, dec(depth), true, false);
        const body = `${from} ${opts.arrow} ${to}`;
        return isReturn && !opts.noReturnParens ? `(${body})` : body;
      }

      if (depth === 0) {
        return node.type;
      }

      if (node.type === "List") {
        const inner = render(node.listType, dec(depth), false, false);
        if (opts.labels) {
          const label = this.getLabelForID(
            (node as unknown as { typeID: number }).typeID
          );
          return `${label}<List<${inner}>>`;
        }
        return `List<${inner}>`;
      }

      if (node.type === "Any") {
        if (opts.labels) {
          const label = this.getLabelForID(
            (node as TypeRawSignatureAST.RawSignatureAny).typeID
          );
          return `${label}<Any<typeID${node.typeID}>>`;
        }
        return "Any";
      }

      if (opts.labels) {
        const label = this.getLabelForID(
          (node as unknown as { typeID: number }).typeID
        );
        return `${label}<${node.type}>`;
      }
      return node.type;
    };

    const node = sig.getAst() as TypeRawSignatureAST.RawSignatureNode;
    return render(node, opts.depth, isReturnType, true);
  }
}

const wrapInOperator = (
  sig: ParsedSignature,
  resolve: boolean
): ParsedSignature => {
  const ast = sig.getAst();
  if (ast.type === "Function") {
    const wrapped = new ParsedSignature(
      { type: "Operator", obscured: ast },
      !resolve
    );
    wrapped.applyTainted = sig.applyTainted;
    return wrapped;
  }
  return sig;
};

const unwrapOperator = (sig: ParsedSignature): ParsedSignature => {
  const ast = sig.getAst();
  if (ast.type === "Operator") {
    const unwrapped = new ParsedSignature(ast.obscured, false);
    unwrapped.applyTainted = sig.applyTainted;
    return unwrapped;
  }
  return sig;
};

const isOperatorValue = (node: TypeAST.AST): boolean =>
  node.type === "Operator" ||
  node.type === "Flip" ||
  node.type === "Pipe" ||
  node.type === "Pipe2";

const isApplyVariantNode = (node: TypeAST.AST): boolean =>
  node.type === "Curry" &&
  !node.varName &&
  isOperatorValue(node.base) &&
  (node.args[0] ? isOperatorValue(node.args[0]) : false);

const computeSignature = (
  node: TypeAST.AST,
  scope?: Map<TypeAST.AST, ParsedSignature>,
  resolve = false
): ParsedSignature => {
  if (scope && scope.has(node)) return scope.get(node)!;

  let signature: ParsedSignature;
  switch (node.type) {
    case "Integer":
    case "Long":
    case "Double":
    case "String":
    case "Boolean":
    case "Null":
    case "NBT":
    case "Block":
    case "Item":
    case "Fluid":
    case "Entity":
    case "Ingredients":
    case "Recipe": {
      signature = new ParsedSignature({ type: node.type }, false);
      break;
    }
    case "List": {
      if (node.value.length === 0) {
        signature = new ParsedSignature(
          {
            type: "List",
            listType: { type: "Any", typeID: ParsedSignature.getNewTypeID() },
          },
          false
        );
        break;
      }

      const elementSignature = computeSignature(
        node.value[0]!,
        scope,
        resolve
      ).getAst();
      signature = new ParsedSignature(
        {
          type: "List",
          listType: elementSignature,
        },
        false
      );
      break;
    }
    case "Operator": {
      const internalKey = operatorRegistry.operatorByNickname(node.opName);
      if (!internalKey) throw new Error(`Unknown operator: ${node.opName}`);
      const opClass = operatorRegistry[internalKey];
      const op = new opClass();
      signature = wrapInOperator(op.getSignatureNode(), resolve);
      signature.applyTainted = isApplyVariantNode(node);
      break;
    }
    case "Curry": {
      let currentSig = computeSignature(node.base, scope, resolve);
      for (const arg of node.args) {
        currentSig = unwrapOperator(currentSig)
          .apply(computeSignature(arg, scope, resolve))
          .rewrite();
      }
      signature =
        currentSig.getRootType() === "Function"
          ? wrapInOperator(currentSig, resolve)
          : currentSig;
      signature.applyTainted =
        isOperatorValue(node.base) &&
        (node.args[0] ? isOperatorValue(node.args[0]) : false);
      break;
    }
    case "Pipe": {
      const sig1 = unwrapOperator(computeSignature(node.op1, scope, resolve));
      const sig2 = unwrapOperator(computeSignature(node.op2, scope, resolve));
      signature = wrapInOperator(sig1.pipe(sig2).rewrite(), resolve);
      // Piping INTO an apply-variant curry keeps the distinction relevant.
      signature.applyTainted = isApplyVariantNode(node.op2);
      break;
    }
    case "Pipe2": {
      const sig1 = unwrapOperator(computeSignature(node.op1, scope, resolve));
      const sig2 = unwrapOperator(computeSignature(node.op2, scope, resolve));
      const sig3 = unwrapOperator(computeSignature(node.op3, scope, resolve));
      signature = wrapInOperator(sig1.pipe2(sig2, sig3).rewrite(), resolve);
      signature.applyTainted = isApplyVariantNode(node.op3);
      break;
    }
    case "Flip": {
      const innerSignature = unwrapOperator(
        computeSignature(node.arg, scope, resolve)
      );
      signature = wrapInOperator(innerSignature.flip().rewrite(), resolve);
      signature.applyTainted = isApplyVariantNode(node.arg);
      break;
    }
    case "Reader": {
      const readerClass = getReaderClassByTypeName(node.value.reader);
      const outputType =
        readerClass?.aspects[node.value.aspect]?.outputType ?? "Any";
      switch (outputType) {
        case "Any":
          signature = new ParsedSignature(
            { type: "Any", typeID: ParsedSignature.getNewTypeID() },
            false
          );
          break;
        case "List":
          signature = new ParsedSignature(
            {
              type: "List",
              listType: {
                type: "Any",
                typeID: ParsedSignature.getNewTypeID(),
              },
            },
            false
          );
          break;
        case "Operator":
          signature = new ParsedSignature(
            {
              type: "Operator",
              obscured: {
                type: "Function",
                from: {
                  type: "Any",
                  typeID: ParsedSignature.getNewTypeID(),
                },
                to: {
                  type: "Any",
                  typeID: ParsedSignature.getNewTypeID(),
                },
              },
            },
            false
          );
          break;
        default:
          signature = new ParsedSignature(
            {
              type: outputType as Exclude<
                TypeRawSignatureAST.RawSignatureDefiniteValue["type"],
                "List" | "Operator" | "Function"
              >,
            },
            false
          );
          break;
      }
      break;
    }
    case "Variable": {
      signature = new ParsedSignature(
        { type: "Any", typeID: ParsedSignature.getNewTypeID() },
        false
      );
      break;
    }
    case "NetworkCards": {
      const root = node.definitions[node.definitions.length - 1]?.node;
      if (!root)
        throw new Error("NetworkCards must contain at least one definition");
      signature = computeSignature(root, scope, resolve);
      break;
    }
  }

  if (scope) scope.set(node, signature);
  return signature;
};

const collectVariables = (
  node: TypeAST.AST,
  collected: Set<TypeAST.AST>,
  seen: Set<TypeAST.AST>
) => {
  if (seen.has(node)) return;
  seen.add(node);

  switch (node.type) {
    case "Curry":
      collectVariables(node.base, collected, seen);
      for (const arg of node.args) collectVariables(arg, collected, seen);
      break;
    case "Pipe":
      collectVariables(node.op1, collected, seen);
      collectVariables(node.op2, collected, seen);
      break;
    case "Pipe2":
      collectVariables(node.op1, collected, seen);
      collectVariables(node.op2, collected, seen);
      collectVariables(node.op3, collected, seen);
      break;
    case "Flip":
      collectVariables(node.arg, collected, seen);
      break;
    case "List":
      for (const value of node.value) collectVariables(value, collected, seen);
      break;
    case "NetworkCards":
      for (const def of node.definitions) {
        collectVariables(def.node, collected, seen);
      }
      break;
  }

  if (node.varName) {
    collected.add(node);
  }
};

let varCounter = 0;

export const resetExpandedVarCounter = (): void => {
  varCounter = 0;
  unamedStrings = 0;
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const getInternalName = (node: TypeAST.AST): string | undefined => {
  if (node.type === "Operator") {
    const internalKey = operatorRegistry.operatorByNickname(node.opName);
    if (internalKey) {
      return operatorRegistry[internalKey].internalName;
    }
  }
  return undefined;
};

const isApplyNode = (node: TypeAST.AST): boolean => {
  const internalName = getInternalName(node);
  if (
    internalName === "integrateddynamics:operator_apply" ||
    internalName === "integrateddynamics:operator_apply_2" ||
    internalName === "integrateddynamics:operator_apply_3"
  )
    return true;
  if (node.type === "Operator") {
    const n = node.opName;
    return (
      n === "OPERATOR_APPLY" ||
      n === "OPERATOR_APPLY_2" ||
      n === "OPERATOR_APPLY_3"
    );
  }
  return false;
};

const isSelfNicknameShadow = (varName: string, node: TypeAST.AST): boolean => {
  const nicknameInternalKey = operatorRegistry.operatorByNickname(varName);
  if (!nicknameInternalKey) return false;

  if (node.type !== "Operator") return false;

  return node.opName === nicknameInternalKey;
};

let unamedStrings = 0;

const getVarName = (node: TypeAST.AST): string => {
  if (node.varName) return node.varName;

  switch (node.type) {
    case "Integer":
    case "Long":
    case "Double":
      return node.value.toString().replace(/^-/, "neg");
    case "String":
      return `string${++unamedStrings}`;
    case "Boolean":
      return node.value ? "true" : "false";
    case "Null":
      return "null";
    case "Variable":
      return node.name;
    case "Operator": {
      const sourceName = getOperatorSourceName(node);
      if (sourceName) return sourceName;
      const formal = getOpName(node.opName);
      return formal.charAt(0).toLowerCase() + formal.slice(1);
    }
    case "Curry": {
      let base = node.base;
      let args = node.args;

      if (isApplyNode(base) && args.length >= 1) {
        return getVarName({
          type: "Curry",
          base: args[0] as TypeAST.Operator,
          args: args.slice(1),
        });
      }

      const opInternalName = getInternalName(base);

      if (
        opInternalName === "integrateddynamics:operator_apply_n" &&
        args.length >= 2
      ) {
        const fName = getVarName(args[0]!);
        const listName = getVarName(args[1]!);
        let res = `${fName}By_n${capitalize(listName)}`;
        for (let i = 2; i < args.length; i++) {
          res = `{${res}}by${capitalize(getVarName(args[i]!))}`;
        }
        return res;
      }

      const name = getVarName(base);
      if (args.length === 0) return name;

      let res: string;
      if (base.varName) {
        res = `{${base.varName}}by${capitalize(getVarName(args[0]!))}`;
      } else if (base.type === "Curry") {
        res = `{${getVarName(base)}}by${capitalize(getVarName(args[0]!))}`;
      } else {
        res = `${name}By${capitalize(getVarName(args[0]!))}`;
      }

      for (let i = 1; i < args.length; i++) {
        res = `{${res}}by${capitalize(getVarName(args[i]!))}`;
      }
      return res;
    }
    case "Pipe": {
      const fName = getVarName(node.op1);
      const gName = getVarName(node.op2);
      return `${gName}With${capitalize(fName)}`;
    }
    case "Pipe2": {
      const fName = getVarName(node.op1);
      const gName = getVarName(node.op2);
      const hName = getVarName(node.op3);
      return `${hName}With${capitalize(fName)}And${capitalize(gName)}`;
    }
    case "Flip":
      return `flip${capitalize(getVarName(node.arg))}`;
    case "List":
      return "list";
    case "Reader": {
      const readerClass = getReaderClassByTypeName(node.value.reader);
      const shortName = readerClass?.shortName ?? "reader";
      const displayName = readerClass?.aspects[node.value.aspect]?.displayName;
      let readable = displayName ?? "";
      if (
        readable &&
        readable.toLowerCase().startsWith(shortName.toLowerCase())
      ) {
        readable = readable.slice(shortName.length);
      }
      if (!readable) {
        readable = node.value.aspect
          .toLowerCase()
          .split("_")
          .map(capitalize)
          .join("");
      }
      return `${shortName}${capitalize(readable)}`;
    }
  }

  return `v${++varCounter}`;
};

const decomposeAST = (node: TypeAST.AST): TypeAST.AST => {
  if (node.type === "Curry") {
    const flattened = flattenAnonymousBaseOperatorApplication(node);

    if (flattened?.fullyApplied) {
      const result = {
        ...node,
        base: flattened.operator,
        args: flattened.args.map(decomposeAST),
      };

      if (!result.varName) result.varName = getVarName(result);
      return result;
    }

    const args = node.args.map(decomposeAST);
    const base = decomposeAST(node.base) as TypeAST.Operator;

    if (base.type === "Operator" && args.length === 0) {
      return base;
    }

    if (!base.varName && base.type !== "Operator") {
      base.varName = getVarName(base);
    }

    const opInternalName = getInternalName(base);
    const isApplyN = opInternalName === "integrateddynamics:operator_apply_n";

    let current: TypeAST.Operator = base;
    let i = 0;
    while (i < args.length) {
      let take = 1;
      if (isApplyN && i === 0 && args.length >= 2) {
        take = 2;
      }
      const chunk = args.slice(i, i + take);
      const isLast = i + take === args.length;

      const chunkNode: TypeAST.Curried = {
        type: "Curry",
        base: current,
        args: chunk,
      };

      const newNode: TypeAST.Curried = {
        ...chunkNode,
        varName: isLast
          ? node.varName || getVarName(chunkNode)
          : getVarName(chunkNode),
      };
      current = newNode;
      i += take;
    }
    return current;
  }
  if (node.type === "Pipe") {
    const result = {
      ...node,
      op1: decomposeAST(node.op1) as TypeAST.Operator,
      op2: decomposeAST(node.op2) as TypeAST.Operator,
    };

    if (!result.varName) result.varName = getVarName(result);
    return result;
  }
  if (node.type === "Pipe2") {
    const result = {
      ...node,
      op1: decomposeAST(node.op1) as TypeAST.Operator,
      op2: decomposeAST(node.op2) as TypeAST.Operator,
      op3: decomposeAST(node.op3) as TypeAST.Operator,
    };
    if (!result.varName) result.varName = getVarName(result);
    return result;
  }
  if (node.type === "Flip") {
    const result = {
      ...node,
      arg: decomposeAST(node.arg) as TypeAST.Operator,
    };
    if (!result.varName) result.varName = getVarName(result);
    return result;
  }
  return node;
};

export const getExpandedVarName = (node: TypeAST.AST): string => {
  return getVarName(node);
};

export const decomposeASTForExpanded = (node: TypeAST.AST): TypeAST.AST => {
  resetExpandedVarCounter();
  return decomposeAST(structuredClone(node));
};

export const ASTToExpanded = (
  ast: TypeAST.AST,
  style: "CodeLine" | "Condensed" = "Condensed"
): string => ASTToExpandedWithSignatureOptions(ast, style, null);

export const ASTToExpandedWithSignatureOptions = (
  ast: TypeAST.AST,
  style: "CodeLine" | "Condensed" = "Condensed",
  sigOpts: ExpandedSignatureOptions | null,
  preferSourceNames = false,
  sigOverrides?: ReadonlyMap<string, ExpandedSignatureOptions>
): string => {
  resetExpandedVarCounter();

  const roots: TypeAST.AST[] =
    ast.type === "NetworkCards" ? ast.definitions.map((d) => d.node) : [ast];

  const initialVars = new Set<TypeAST.AST>();
  for (const root of roots) {
    collectVariables(root, initialVars, new Set());
    initialVars.add(root);
  }

  const finalVars = new Set<TypeAST.AST>();
  const finalSeen = new Set<TypeAST.AST>();

  const processAndCollect = (node: TypeAST.AST) => {
    const decomposed = decomposeAST(node);
    collectVariables(decomposed, finalVars, finalSeen);
    finalVars.add(decomposed);
    finalSeen.add(decomposed);
  };

  for (const v of initialVars) {
    processAndCollect(v);
  }

  const finalVarsArray = Array.from(finalVars);
  const output: string[] = [];
  const formatter = new SignatureFormatter();
  const signatureCache = new Map<TypeAST.AST, ParsedSignature>();

  for (let i = 0; i < finalVarsArray.length; i++) {
    const v = finalVarsArray[i]!;
    const name = v.varName || getVarName(v);
    const displayName = formatVarName(name);
    if (
      v.varName &&
      output.some((line) => line.startsWith(`${displayName} = `))
    ) {
      continue;
    }
    const overrideOpts = v.varName ? sigOverrides?.get(v.varName) : undefined;
    const effOpts = overrideOpts ?? sigOpts;
    const sig = overrideOpts?.resolveAnys
      ? computeSignature(v, undefined, true)
      : computeSignature(v, signatureCache);
    const sigStr = effOpts
      ? formatter.formatDepth(sig, effOpts)
      : formatter.format(sig);

    const oldVarName = v.varName;
    delete v.varName;
    const exprStr =
      style === "CodeLine"
        ? ASTToCodeLine(v)
        : ASTToCondensed(v, false, 0, preferSourceNames);
    if (oldVarName) v.varName = oldVarName;

    const assignment = `${displayName} = ${exprStr}`;
    if (output.includes(assignment)) continue;

    output.push(`${displayName} :: ${sigStr}`);
    output.push(assignment);
    if (i < finalVarsArray.length - 1) {
      output.push("");
    }
  }

  return output.join("\n");
};

const computeStringRegions = (line: string): boolean[] => {
  const inside = new Array<boolean>(line.length).fill(false);
  let quote: QuoteDelimiter | null = null;
  for (let i = 0; i < line.length; i++) {
    const char = line[i]!;
    if (quote !== null) {
      inside[i] = true;
      if (quote === '"') {
        if (char === '"' && line[i - 1] !== "\\") quote = null;
      } else if (quote === "'") {
        if (char === "'" && line[i - 1] !== "\\") quote = null;
      } else if (
        char === '"' &&
        line[i + 1] === '"' &&
        line[i + 2] === '"' &&
        line[i - 1] !== "\\"
      ) {
        quote = null;
        inside[i + 1] = true;
        inside[i + 2] = true;
        i += 2;
      }
    } else if (char === '"' && line[i + 1] === '"' && line[i + 2] === '"') {
      quote = '"""';
      inside[i] = true;
      inside[i + 1] = true;
      inside[i + 2] = true;
      i += 2;
    } else if (char === '"') {
      quote = '"';
    } else if (char === "'") {
      quote = "'";
    }
  }
  return inside;
};

const findTopLevelOccurrence = (
  line: string,
  matches: (char: string, next: string | undefined) => boolean
): number => {
  const inside = computeStringRegions(line);
  let inNBT = 0;
  for (let j = 0; j < line.length; j++) {
    if (inside[j]) continue;
    const char = line[j]!;
    if (char === "{") inNBT++;
    if (char === "}") inNBT--;
    if (inNBT === 0 && matches(char, line[j + 1])) return j;
  }
  return -1;
};

const DECLARED_TYPE_NAMES = [
  "Any",
  "Integer",
  "Long",
  "Double",
  "Number",
  "String",
  "Boolean",
  "Null",
  "NBT",
  "Block",
  "Item",
  "Fluid",
  "Entity",
  "Ingredients",
  "Recipe",
  "Operator",
  "List",
] as const;

const normalizeDeclaredTypeName = (text: string): string => {
  const lowered = text.trim().toLowerCase();
  const match = DECLARED_TYPE_NAMES.find(
    (name) => name.toLowerCase() === lowered
  );
  if (!match) {
    throw new Error(
      `Unknown declared type "${text.trim()}". Valid types: ${DECLARED_TYPE_NAMES.join(", ")}`
    );
  }
  return match;
};

const typeMatchesDeclaration = (
  actualType: string,
  declared: string
): boolean => {
  if (declared === "Any") return true;
  if (actualType === "Any") return true;
  if (declared === "Operator")
    return actualType === "Operator" || actualType === "Function";
  if (declared === "List") return actualType === "List";
  return actualType.toLowerCase() === declared.toLowerCase();
};

type DeclaredTypeNode =
  | { kind: "atom"; name: string } // whitelist type, incl. bare `Any` and `List`
  | { kind: "anyVar"; name: string } // `Any<X>` where X is a variable/type name
  | { kind: "param"; name: string; args: DeclaredTypeNode[] } // `List<…>`
  | { kind: "fn"; left: DeclaredTypeNode; right: DeclaredTypeNode };

type DeclaredTypeToken =
  | { type: "id"; value: string }
  | { type: "arrow" }
  | { type: "punctuation"; value: string }; // < > ( ) ,

const tokenizeDeclaredType = (input: string): DeclaredTypeToken[] => {
  const tokens: DeclaredTypeToken[] = [];
  let i = 0;
  while (i < input.length) {
    const char = input[i]!;
    if (/\s/.test(char)) {
      i++;
      continue;
    }
    if (/[A-Za-z0-9_.]/.test(char)) {
      let j = i;
      while (j < input.length && /[A-Za-z0-9_.]/.test(input[j]!)) j++;
      tokens.push({ type: "id", value: input.slice(i, j) });
      i = j;
      continue;
    }
    if (/\(|\)|<|>|,/.test(char)) {
      tokens.push({ type: "punctuation", value: char });
      i++;
      continue;
    }
    if (char === "→" || (char === "-" && input[i + 1] === ">")) {
      tokens.push({ type: "arrow" });
      i += char === "→" ? 1 : 2;
      continue;
    }
    throw new Error(`Unexpected character "${char}" in declared type`);
  }
  return tokens;
};

const isWhitelistType = (name: string): boolean =>
  DECLARED_TYPE_NAMES.some(
    (candidate) => candidate.toLowerCase() === name.toLowerCase()
  );

const parseDeclaredType = (input: string): DeclaredTypeNode => {
  const tokens = tokenizeDeclaredType(input);
  let pos = 0;
  const peek = (): DeclaredTypeToken | undefined => tokens[pos];
  const next = (): DeclaredTypeToken | undefined => tokens[pos++];

  const parseArrow = (): DeclaredTypeNode => {
    const left = parseParam();
    if (peek()?.type === "arrow") {
      next();
      return { kind: "fn", left, right: parseArrow() };
    }
    return left;
  };

  const parseParam = (): DeclaredTypeNode => {
    const open = peek();
    if (open?.type === "punctuation" && open.value === "(") {
      next();
      const inner = parseArrow();
      const close = peek();
      if (!close || close.type !== "punctuation" || close.value !== ")") {
        throw new Error("Expected ')' in declared type");
      }
      next();
      return inner;
    }
    return parseAtom();
  };

  const parseAtom = (): DeclaredTypeNode => {
    const nameToken = next();
    if (!nameToken || nameToken.type !== "id") {
      throw new Error("Expected a type name in declared type");
    }
    const name = nameToken.value;

    if (name === "Any" || name.toUpperCase() === "ANY") {
      const lt = peek();
      if (lt?.type === "punctuation" && lt.value === "<") {
        next();
        const inner = next();
        if (!inner || inner.type !== "id") {
          throw new Error("Expected a type name inside Any<...>");
        }
        const close = peek();
        if (!close || close.type !== "punctuation" || close.value !== ">") {
          throw new Error("Expected '>' in declared type");
        }
        next();
        return { kind: "anyVar", name: inner.value };
      }
      return { kind: "atom", name: "Any" };
    }

    if (!isWhitelistType(name)) {
      const lt = peek();
      if (lt?.type === "punctuation" && lt.value === "<") {
        throw new Error(
          `Type "${name}" is not a declared type; generic types must be written as Any<...>`
        );
      }
      return { kind: "anyVar", name };
    }

    const lt = peek();
    if (lt?.type === "punctuation" && lt.value === "<") {
      next();
      const args: DeclaredTypeNode[] = [parseArrow()];
      while (true) {
        const comma = peek();
        if (comma?.type !== "punctuation" || comma.value !== ",") break;
        next();
        args.push(parseArrow());
      }
      const close = peek();
      if (!close || close.type !== "punctuation" || close.value !== ">") {
        throw new Error("Expected '>' in declared type");
      }
      next();
      return { kind: "param", name, args };
    }
    return { kind: "atom", name };
  };

  const result = parseArrow();
  if (pos !== tokens.length) {
    throw new Error("Unexpected trailing characters in declared type");
  }
  return result;
};

const unwrapFunctionNode = (
  node: TypeRawSignatureAST.RawSignatureNode
): TypeRawSignatureAST.RawSignatureFunction | null => {
  if (node.type === "Function") return node;
  if (node.type === "Operator") return node.obscured;
  return null;
};

const typeNameMatches = (a: string, b: string): boolean =>
  a.toLowerCase() === b.toLowerCase() ||
  (["Integer", "Long", "Double", "Number"].includes(a) &&
    ["Integer", "Long", "Double", "Number"].includes(b));

const declaredMatchesComputed = (
  declared: DeclaredTypeNode,
  sig: ParsedSignature
): boolean => {
  const node = sig.getAst() as TypeRawSignatureAST.RawSignatureNode;

  if (declared.kind === "fn") {
    const fn = unwrapFunctionNode(node);
    if (!fn) return false;
    return (
      declaredMatchesComputed(
        declared.left,
        new ParsedSignature(fn.from, false)
      ) &&
      declaredMatchesComputed(declared.right, new ParsedSignature(fn.to, false))
    );
  }

  if (declared.kind === "anyVar") {
    // `Any<X>` must land on a generic `Any` slot.
    return node.type === "Any";
  }

  if (declared.kind === "param") {
    if (declared.name === "List") {
      return (
        node.type === "List" &&
        declaredMatchesComputed(
          declared.args[0]!,
          new ParsedSignature(node.listType, false)
        )
      );
    }
    return typeNameMatches(node.type, declared.name);
  }

  if (declared.name === "Any") return true; // bare `Any` matches anything
  if (declared.name === "Operator")
    return node.type === "Operator" || node.type === "Function";
  if (declared.name === "List") return node.type === "List";
  return typeNameMatches(node.type, declared.name);
};

export const ExpandedToAST = (
  expanded: string,
  startVariableId = 0
): TypeAST.AST => {
  const rawLines = expanded.split("\n");
  const processedLines: string[] = [];

  const hasTopLevelAssignment = (line: string): boolean =>
    findTopLevelOccurrence(
      line,
      (char, next) => char === "=" && next !== ">"
    ) !== -1;

  const standaloneSignatures: {
    name: string;
    declared: string;
    lineNum: number;
  }[] = [];

  for (let lineIdx = 0; lineIdx < rawLines.length; lineIdx++) {
    const line = rawLines[lineIdx]!;
    const lineHasAssignment = hasTopLevelAssignment(line);
    const inside = computeStringRegions(line);
    let cleanLine = "";
    let isSig = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i]!;

      if (!inside[i]) {
        if (char === "-" && line[i + 1] === "-") {
          break; // Ignore comment
        }
        if (char === ":" && line[i + 1] === ":") {
          if (!lineHasAssignment) {
            isSig = true;
            const declaredRaw = line.slice(i + 2);
            const commentIdx = declaredRaw.indexOf("--");
            const declared = (
              commentIdx === -1 ? declaredRaw : declaredRaw.slice(0, commentIdx)
            ).trim();
            if (declared) {
              const nameText = line.slice(0, i).trim();
              const parsedName = parseDefinitionVarName(nameText, false);
              standaloneSignatures.push({
                name: parsedName.name,
                declared,
                lineNum: lineIdx + 1,
              });
            }
            break; // Signature line dropped from the AST, but validated below
          }
          cleanLine += "::";
          i++;
          continue;
        }
      }
      cleanLine += char;
    }

    if (!isSig && cleanLine.trim()) {
      processedLines.push(cleanLine.trim());
    }
  }

  if (processedLines.length === 0) throw new Error("Empty expanded input");

  const scope = new Map<string, TypeAST.AST>();
  const definitions: { name: string; node: TypeAST.AST }[] = [];
  let finalAST: TypeAST.AST | null = null;

  for (let i = 0; i < processedLines.length; i++) {
    const line = processedLines[i]!;

    let eqIdx = -1;
    const inside = computeStringRegions(line);
    let inNBT = 0;
    for (let j = 0; j < line.length; j++) {
      if (inside[j]) continue;
      if (line[j] === "{") inNBT++;
      if (line[j] === "}") inNBT--;
      if (inNBT === 0 && line[j] === "=" && line[j + 1] !== ">") {
        if (j === 0 || line[j - 1] !== "=") {
          eqIdx = j;
          break;
        }
      }
    }

    const colonIdx = findTopLevelOccurrence(
      line,
      (char, next) => char === ":" && next === ":"
    );

    let varName: string | null = null;
    let varNameQuoted = false;
    let exprStr: string;
    let declaredType: string | null = null;

    if (colonIdx !== -1 && eqIdx !== -1 && colonIdx < eqIdx) {
      const lhs = line.substring(0, colonIdx).trim();
      const rest = line.substring(colonIdx + 2).trim();
      const restEqIdx = findTopLevelOccurrence(
        rest,
        (char, next) => char === "=" && next !== ">"
      );
      if (!lhs || restEqIdx === -1) {
        throw new Error(`Invalid typed definition on line ${i + 1}: "${line}"`);
      }
      const parsedLhs = parseDefinitionVarName(lhs, false);
      if (!parsedLhs.quoted && !getNicknameRegex().test(parsedLhs.name)) {
        throw new Error(`Invalid variable name: "${lhs}"`);
      }
      declaredType = rest.substring(0, restEqIdx).trim();
      exprStr = rest.substring(restEqIdx + 1).trim();
      varName = parsedLhs.name;
      varNameQuoted = parsedLhs.quoted;
    } else if (eqIdx !== -1) {
      const parsedVarName = parseDefinitionVarName(
        line.substring(0, eqIdx),
        true
      );
      varName = parsedVarName.name;
      varNameQuoted = parsedVarName.quoted;

      let rhs = line.substring(eqIdx + 1).trim();
      // Typed definition: `varName = expression :: Type`
      const rhsColonIdx = findTopLevelOccurrence(
        rhs,
        (char, next) => char === ":" && next === ":"
      );
      if (rhsColonIdx !== -1) {
        declaredType = rhs.substring(rhsColonIdx + 2).trim();
        rhs = rhs.substring(0, rhsColonIdx).trim();
      }

      if (!varNameQuoted && !getNicknameRegex().test(varName)) {
        throw new Error(`Invalid variable name: "${varName}"`);
      }
      exprStr = applyLambdaParams(rhs, parsedVarName.params);
    } else {
      if (i === 0)
        throw new Error(
          "Line 1 of Expanded format must be an assignment (varName = expression)"
        );
      exprStr = line;
    }

    if (varName && exprStr.startsWith(`${varName} = `)) {
      exprStr = exprStr.substring(varName.length + 3).trim();
    }

    let lineAST: TypeAST.AST;
    try {
      lineAST = CondensedToAST(exprStr, scope, 0, true, false);
    } catch (e) {
      if (!(e instanceof StructuralParseError)) {
        throw new Error(
          `Failed to parse line ${i + 1}: "${exprStr}"\n${
            e instanceof Error ? e.message : String(e)
          }`
        );
      }
      try {
        lineAST = CodeLineToAST(exprStr, scope, 0, true, false);
      } catch (e2) {
        console.error(e);
        throw new Error(
          `Failed to parse line ${i + 1}: "${exprStr}"\n${
            e2 instanceof Error ? e2.message : String(e2)
          }`
        );
      }
    }

    if (lineAST.type === "NetworkCards") {
      throw new Error(
        `Line ${i + 1} contains semicolon-separated statements, which are only valid at the top level`
      );
    }

    if (declaredType) {
      const declared = normalizeDeclaredTypeName(declaredType);
      const actualType = computeSignature(lineAST).getAst().type;
      if (!typeMatchesDeclaration(actualType, declared)) {
        throw new Error(
          `Line ${i + 1}: variable "${varName}" is declared as type "${declared}" but the expression has type "${actualType}"`
        );
      }
    }

    if (
      varName &&
      operatorRegistry.operatorByNickname(varName) &&
      !isSelfNicknameShadow(varName, lineAST)
    ) {
      throw new Error(
        `Variable name "${varName}" overshadows an operator nickname`
      );
    }

    if (varName) {
      const existing = definitions.find((def) => def.name === varName);
      if (existing) {
        if (astContentKey(existing.node) !== astContentKey(lineAST)) {
          throw new Error(
            `Variable "${varName}" is already defined; redefinition is only allowed if the new definition resolves to the same AST`
          );
        }
        lineAST = existing.node;
        scope.set(varName, existing.node);
      } else {
        if (definitions.some((def) => def.node === lineAST)) {
          lineAST = structuredClone(lineAST);
        }
        lineAST.varName = varName;
        scope.set(varName, lineAST);
        definitions.push({ name: varName, node: lineAST });
      }
    }
    finalAST = lineAST;
  }

  for (const sig of standaloneSignatures) {
    const def = definitions.find((d) => d.name === sig.name);
    if (!def) {
      throw new Error(
        `Signature line ${sig.lineNum}: variable "${sig.name}" is not defined`
      );
    }

    const declared = parseDeclaredType(sig.declared);
    if (
      !declaredMatchesComputed(
        declared,
        computeSignature(def.node, undefined, true)
      )
    ) {
      throw new Error(
        `Signature line ${sig.lineNum}: variable "${sig.name}" is declared as type "${sig.declared}" but the expression has a different signature`
      );
    }
  }

  if (!finalAST) throw new Error("Could not determine final AST");

  const names = definitions.map((d) => d.name);
  return buildNetworkCards(
    normalizeSegments(
      definitions.map((d) => d.node),
      names
    ),
    startVariableId,
    names
  );
};
