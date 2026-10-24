import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { RegistryHub } from "lib/IntegratedDynamicsClasses/registries/registryHub";
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
  formatDefinitionName,
  getOperatorSourceName,
  setOperatorSourceName,
  flattenAnonymousBaseOperatorApplication,
  getArity,
  getNodeComment,
} from "lib/transformers/helpers";
import {
  astContentKey,
  buildNetworkCards,
  getNetworkDefLastCardIds,
} from "lib/transformers/NetworkCards";
import { normalizeSegments } from "lib/transformers/MixedLists";
import { StructuralParseError } from "lib/transformers/parseErrors";
import {
  getSourceCards,
  isSourceNode,
  sourceToNetworkCards,
  withSourceCards,
} from "lib/transformers/sourceNodes";

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
      d === null ? null : Math.max(0, d - 1);
    const exhausted = (d: number | null): boolean => d !== null && d <= 0;

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
        if (exhausted(depth)) {
          return isRoot ? render(inner, 0, false, false) : "Operator";
        }
        return `Operator<${render(inner, dec(depth), false, false)}>`;
      }

      if (node.type === "Function") {
        const fromRendered = render(node.from, depth, false, false);
        const from =
          opts.parenFromFns && node.from.type === "Function"
            ? `(${fromRendered})`
            : fromRendered;
        const to = render(node.to, depth, true, false);
        const body = `${from} ${opts.arrow} ${to}`;
        return isReturn && !opts.noReturnParens ? `(${body})` : body;
      }

      if (exhausted(depth)) {
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

const collectDynamicParams = (
  node: TypeAST.AST,
  collected: TypeAST.Dynamic[] = [],
  seen: Set<TypeAST.AST> = new Set()
): TypeAST.Dynamic[] => {
  if (seen.has(node)) return collected;
  seen.add(node);
  switch (node.type) {
    case "Dynamic":
      collected.push(node);
      return collected;
    case "Static":
    case "Materialize":
      return collected;
    case "Curry":
      collectDynamicParams(node.base, collected, seen);
      for (const arg of node.args) collectDynamicParams(arg, collected, seen);
      return collected;
    case "Pipe":
      collectDynamicParams(node.op1, collected, seen);
      collectDynamicParams(node.op2, collected, seen);
      return collected;
    case "Pipe2":
      collectDynamicParams(node.op1, collected, seen);
      collectDynamicParams(node.op2, collected, seen);
      collectDynamicParams(node.op3, collected, seen);
      return collected;
    case "Flip":
      collectDynamicParams(node.arg, collected, seen);
      return collected;
    case "List":
      for (const entry of node.value) {
        collectDynamicParams(entry, collected, seen);
      }
      return collected;
    case "Reader":
      if (node.value.simulatedOutput) {
        collectDynamicParams(node.value.simulatedOutput, collected, seen);
      }
      return collected;
    case "Display":
    case "Card":
      collectDynamicParams(node.value, collected, seen);
      return collected;
    case "NetworkCards":
      for (const definition of node.definitions) {
        collectDynamicParams(definition.node, collected, seen);
      }
      return collected;
    default:
      return collected;
  }
};

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

      const elementSignatures = node.value.map((entry) =>
        computeSignature(entry, scope, resolve).getAst()
      );
      const first = elementSignatures[0]!;
      const allSame = elementSignatures.every(
        (entry) => JSON.stringify(entry) === JSON.stringify(first)
      );
      const elementSignature = allSame
        ? first
        : elementSignatures.every((entry) =>
              ["Integer", "Long", "Double", "Number"].includes(entry.type)
            )
          ? ({ type: "Number" } as TypeRawSignatureAST.RawSignatureNode)
          : ({
              type: "Any",
              typeID: ParsedSignature.getNewTypeID(),
            } as TypeRawSignatureAST.RawSignatureNode);
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
    case "Materialize": {
      const inner = computeSignature(node.value, scope, resolve);
      const dynamics = collectDynamicParams(node.value);
      if (
        dynamics.length === 0 ||
        inner.getRootType() === "Function" ||
        inner.getRootType() === "Operator"
      ) {
        signature = inner;
        break;
      }
      let out = inner.getAst() as TypeRawSignatureAST.RawSignatureNode;
      for (let i = dynamics.length - 1; i >= 0; i--) {
        out = {
          type: "Function",
          from: computeSignature(dynamics[i]!.value, scope, resolve).getAst(),
          to: out,
        };
      }
      signature = new ParsedSignature(out, false);
      break;
    }
    case "Dynamic":
    case "Static":
    case "Display":
    case "Card": {
      signature = computeSignature(node.value, scope, resolve);
      break;
    }
    case "VarStore":
    case "DisplayPanel":
    case "Writer":
    case "Exporter":
    case "Importer": {
      const cards = getSourceCards(node);
      if (cards.length !== 1) {
        throw new Error(
          `A ${node.type} is not a value - it holds ${cards.length} cards`
        );
      }
      signature = computeSignature(cards[0]!, scope, resolve);
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
    case "Dynamic":
    case "Static":
    case "Materialize":
    case "Display":
    case "Card":
      collectVariables(node.value, collected, seen);
      break;
    case "VarStore":
    case "DisplayPanel":
    case "Writer":
    case "Exporter":
    case "Importer":
      for (const card of getSourceCards(node)) {
        collectVariables(card, collected, seen);
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
  constructorsSeen.item = 0;
  constructorsSeen.block = 0;
  constructorsSeen.fluid = 0;
  constructorsSeen.entity = 0;
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

const constructorsSeen = {
  item: 0,
  block: 0,
  fluid: 0,
  entity: 0,
};

const camelCaseDisplayName = (name: string): string => {
  const words = name
    .replace(/'/g, "")
    .split(/[^A-Za-z0-9]+/)
    .filter((word) => word.length > 0);
  if (words.length === 0) return "";
  return words
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toLowerCase() + word.slice(1)
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
};

const getConstructorDisplayName = (
  node: TypeAST.Block | TypeAST.Item | TypeAST.Fluid | TypeAST.Entity
): string | undefined => {
  const raw = node.value;
  const id =
    typeof raw === "string"
      ? raw
      : typeof (raw as jsonObject)["id"] === "string"
        ? ((raw as jsonObject)["id"] as string)
        : undefined;
  if (id === undefined || id.length === 0) return undefined;

  const registryName = `${node.type.toLowerCase()}Registry`;
  const registry = (RegistryHub as unknown as Record<string, unknown>)[
    registryName
  ] as { items?: Record<string, new () => unknown> } | undefined;
  const Constructor = registry?.items?.[id.toLowerCase()];
  if (!Constructor) return undefined;

  try {
    const instance = new Constructor() as {
      getProperties?: () => { get?: (key: string) => unknown };
    };
    const props = instance.getProperties?.();
    for (const key of ["displayName", "itemName", "blockName"]) {
      const value = props?.get?.(key) as
        | { valueOf?: () => unknown }
        | undefined;
      const text = value?.valueOf?.();
      if (typeof text === "string" && text.trim().length > 0) return text;
    }
  } catch {
    return undefined;
  }
  return undefined;
};

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
    case "Block":
    case "Item":
    case "Fluid":
    case "Entity": {
      const kind = node.type.toLowerCase() as keyof typeof constructorsSeen;
      const display = getConstructorDisplayName(node);
      const camel = display === undefined ? "" : camelCaseDisplayName(display);
      if (camel.length > 0) return camel;
      return `${kind}${constructorsSeen[kind]++}`;
    }
    case "Materialize":
      return `Materialized{${getVarName(node.value)}}`;
    case "Dynamic":
      return `Dynamic{${getVarName(node.value)}}`;
    case "Static":
      return `Static{${getVarName(node.value)}}`;
    case "Display":
    case "Card":
      return getVarName(node.value);
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

const isLiteralVarName = (name: string): boolean =>
  /^-?\d+(\.\d+)?$/.test(name) ||
  name === "true" ||
  name === "false" ||
  name === "null";

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
  if (
    node.type === "Materialize" ||
    node.type === "Dynamic" ||
    node.type === "Static" ||
    node.type === "Display" ||
    node.type === "Card"
  ) {
    const result = {
      ...node,
      value: decomposeAST(node.value),
    };
    if (!result.varName) result.varName = getVarName(result);
    return result;
  }
  if (isSourceNode(node)) {
    const result = withSourceCards(
      node,
      getSourceCards(node).map(decomposeAST)
    );
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
): string =>
  ASTToExpandedWithSignatureOptions(ast, style, null, false, undefined, {
    expandedRefForm: "varId",
  });

export interface ExpandedDisplayOptions {
  signatureLayout?: "own-line" | "inline";
  inlinePlacement?: "after" | "before";
  expandedRefForm?: "varId" | "name";
  resolve?: boolean;
  variableWrapper?: boolean;
  lambdaParamSugar?: boolean;
  comments?: boolean;
  joinStatements?: ";" | "\n";
  refStyle?: "varId" | "refs";
}

const defComments = (ast: TypeAST.AST): Map<string, string[]> | null => {
  if (ast.type !== "NetworkCards") return null;
  const map = new Map<string, string[]>();
  for (const def of ast.definitions) {
    if (def.comment && def.comment.length > 0 && def.name) {
      map.set(def.name, def.comment);
    }
  }
  return map.size > 0 ? map : null;
};

const argumentComments = (
  node: TypeAST.AST
): { index: number; comment: string }[] => {
  if (node.type !== "Curry") return [];
  const out: { index: number; comment: string }[] = [];
  node.args.forEach((arg, position) => {
    for (const comment of getNodeComment(arg) ?? []) {
      out.push({ index: position + 1, comment });
    }
  });
  return out;
};

const renderLambdaParamSugar = (
  node: TypeAST.AST,
  baseName: string
): string | null => {
  const flattened = flattenAnonymousBaseOperatorApplication(node);
  if (!flattened || flattened.fullyApplied) return null;
  if (flattened.operator.type !== "Operator") return null;
  const arity = getArity(flattened.operator);
  const holes = arity - flattened.args.length;
  if (holes !== 1) return null;
  const param = "x";
  const bodyAst: TypeAST.AST = {
    type: "Curry",
    base: flattened.operator,
    args: [{ type: "Variable", name: param }, ...flattened.args],
  };
  const body = ASTToCondensed(bodyAst, false, 0, false);
  return `${baseName} ${param} = ${body}`;
};

export const ASTToExpandedWithSignatureOptions = (
  ast: TypeAST.AST,
  style: "CodeLine" | "Condensed" = "Condensed",
  sigOpts: ExpandedSignatureOptions | null,
  preferSourceNames = false,
  sigOverrides?: ReadonlyMap<string, ExpandedSignatureOptions>,
  displayOpts: ExpandedDisplayOptions = {}
): string => {
  resetExpandedVarCounter();

  const root = isSourceNode(ast) ? sourceToNetworkCards(ast) : ast;
  const roots: TypeAST.AST[] =
    root.type === "NetworkCards" ? root.definitions.map((d) => d.node) : [root];
  const comments = displayOpts.comments ? defComments(root) : null;

  const cardIdByName = new Map<string, string>();
  if (root.type === "NetworkCards") {
    const lastCardIds = getNetworkDefLastCardIds(root, 0);
    for (const definition of root.definitions) {
      if (!definition.name) continue;
      const id = lastCardIds.get(definition.node);
      if (id !== undefined) cardIdByName.set(definition.name, String(id));
    }
  }

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
    const hadVarName = Boolean(v.varName);
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
    const effResolveAnys = Boolean(
      overrideOpts?.resolveAnys ?? effOpts?.resolveAnys
    );
    const useResolveFace = effResolveAnys || displayOpts.resolve === true;
    const sig = useResolveFace
      ? computeSignature(v, undefined, true)
      : computeSignature(v, signatureCache);
    const sigStr = effOpts
      ? formatter.formatDepth(sig, effOpts)
      : formatter.format(sig);

    const nameReferences = (displayOpts.expandedRefForm ?? "name") === "name";
    const oldVarName = v.varName;
    delete v.varName;
    const exprStr =
      style === "CodeLine"
        ? ASTToCodeLine(v, true, 0, {
            joinStatements: displayOpts.joinStatements,
            refStyle: displayOpts.refStyle,
            varIdRefsByName: nameReferences ? undefined : cardIdByName,
          })
        : ASTToCondensed(v, false, 0, preferSourceNames, {
            joinStatements: displayOpts.joinStatements,
            refStyle: displayOpts.refStyle,
            useNames: nameReferences,
            atNameRefs: nameReferences,
            varIdRefsByName: nameReferences ? undefined : cardIdByName,
          });
    if (oldVarName) v.varName = oldVarName;

    if (!hadVarName && isLiteralVarName(name)) {
      if (!output.includes(exprStr)) output.push(exprStr);
      if (i < finalVarsArray.length - 1) output.push("");
      continue;
    }

    const nameDisplay = displayOpts.variableWrapper
      ? `Variable("${name.replace(/"/g, '\\"')}")`
      : v.varName
        ? formatDefinitionName(name)
        : displayName;
    let assignment = `${nameDisplay} = ${exprStr}`;
    if (displayOpts.comments) {
      const suffix = argumentComments(v)
        .map(
          ({ index, comment }) =>
            `-- [argument ${index}] ${comment.replace(/^--\s*/, "")}`
        )
        .join(" ");
      if (suffix) assignment = `${assignment} ${suffix}`;
    }
    if (displayOpts.lambdaParamSugar) {
      const sugar = renderLambdaParamSugar(v, nameDisplay);
      if (sugar !== null) assignment = sugar;
    }
    if (output.includes(assignment)) continue;

    const commentLines =
      displayOpts.comments && v.varName ? comments?.get(v.varName) : undefined;
    if (commentLines) {
      output.push(...commentLines);
    }

    if (displayOpts.signatureLayout === "inline") {
      const inline =
        displayOpts.inlinePlacement === "before"
          ? `${nameDisplay} :: ${sigStr} = ${exprStr}`
          : `${nameDisplay} = ${exprStr} :: ${sigStr}`;
      output.push(inline);
    } else {
      output.push(`${nameDisplay} :: ${sigStr}`);
      output.push(assignment);
    }
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

const isBareDeclaredTypeName = (text: string): boolean =>
  /^[A-Za-z0-9_.]+$/.test(text.trim());

const assertKnownDeclaredType = (text: string): void => {
  const trimmed = text.trim();
  if (!isBareDeclaredTypeName(trimmed)) return;
  if (
    !DECLARED_TYPE_NAMES.some(
      (name) => name.toLowerCase() === trimmed.toLowerCase()
    )
  ) {
    throw new Error(
      `Unknown declared type "${trimmed}". Valid types: ${DECLARED_TYPE_NAMES.join(", ")}`
    );
  }
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

const hasDeclaredTypeVariable = (node: DeclaredTypeNode): boolean => {
  if (node.kind === "anyVar") return true;
  if (node.kind === "fn") {
    return (
      hasDeclaredTypeVariable(node.left) || hasDeclaredTypeVariable(node.right)
    );
  }
  if (node.kind === "param") return node.args.some(hasDeclaredTypeVariable);
  return false;
};

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

const NUMERIC_TYPE_NAMES = ["Integer", "Long", "Double"];

const typeNameMatches = (actual: string, declared: string): boolean => {
  const actualName = actual.toLowerCase();
  const declaredName = declared.toLowerCase();
  if (actualName === declaredName) return true;
  return (
    declaredName === "number" &&
    NUMERIC_TYPE_NAMES.some((name) => name.toLowerCase() === actualName)
  );
};

interface DeclaredMatchOptions {
  strictGenericSlots?: boolean;
  bindings?: Map<string, string>;
}

const declaredMatchesComputed = (
  declared: DeclaredTypeNode,
  sig: ParsedSignature,
  options: DeclaredMatchOptions = {}
): boolean => {
  const node = sig.getAst() as TypeRawSignatureAST.RawSignatureNode;
  const bindings = options.bindings ?? new Map<string, string>();

  if (declared.kind === "fn") {
    const fn = unwrapFunctionNode(node);
    if (!fn) return false;
    return (
      declaredMatchesComputed(
        declared.left,
        new ParsedSignature(fn.from, false),
        { ...options, bindings }
      ) &&
      declaredMatchesComputed(
        declared.right,
        new ParsedSignature(fn.to, false),
        { ...options, bindings }
      )
    );
  }

  if (declared.kind === "anyVar") {
    if (options.strictGenericSlots) return node.type === "Any";
    const bound = bindings.get(declared.name);
    if (bound === undefined) {
      bindings.set(declared.name, node.type);
      return true;
    }
    return bound.toLowerCase() === node.type.toLowerCase();
  }

  if (declared.kind === "param") {
    if (declared.name === "List") {
      return (
        node.type === "List" &&
        declaredMatchesComputed(
          declared.args[0]!,
          new ParsedSignature(node.listType, false),
          options
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

const assertNoNumericAtRefs = (node: TypeAST.AST): void => {
  const visit = (current: TypeAST.AST): void => {
    if (current.type === "Variable" && /^@\d+$/.test(current.name)) {
      throw new Error(
        `Expanded references use names, not numbers: "${current.name}" is not allowed. Use @name to target a definition.`
      );
    }
    if (isSourceNode(current)) {
      for (const card of getSourceCards(current)) visit(card);
      return;
    }
    switch (current.type) {
      case "Curry":
        visit(current.base);
        for (const arg of current.args) visit(arg);
        return;
      case "Pipe":
        visit(current.op1);
        visit(current.op2);
        return;
      case "Pipe2":
        visit(current.op1);
        visit(current.op2);
        visit(current.op3);
        return;
      case "Flip":
        visit(current.arg);
        return;
      case "List":
        for (const entry of current.value) visit(entry);
        return;
      case "NetworkCards":
        for (const definition of current.definitions) visit(definition.node);
        return;
      case "Reader":
        if (current.value.simulatedOutput) visit(current.value.simulatedOutput);
        return;
      case "Materialize":
      case "Dynamic":
      case "Static":
      case "Display":
      case "Card":
        visit(current.value);
        return;
      default:
        return;
    }
  };
  visit(node);
};

export interface ExpandedToASTOptions {
  allowDuplicateNames?: boolean;
  warnings?: string[];
  declarationCards?: "ignore" | "add";
}

export const ExpandedToAST = (
  expanded: string,
  startVariableId = 0,
  opts: ExpandedToASTOptions = {}
): TypeAST.AST => {
  const rawLines = expanded.split("\n");
  const processedLines: string[] = [];
  const processedLineOrigins: number[] = [];
  const warnings = opts.warnings ?? [];

  let pendingStandaloneComments: string[] = [];
  const lineComments = new Map<number, string[]>();

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
    let trailingComment: string | null = null;

    for (let i = 0; i < line.length; i++) {
      const char = line[i]!;

      if (!inside[i]) {
        if (char === "-" && line[i + 1] === "-") {
          const commentText = line.slice(i).trim();
          const trimmed = line.trim();
          if (trimmed.startsWith("--")) {
            pendingStandaloneComments.push(commentText);
          } else if (!isSig) {
            trailingComment = commentText;
          }
          break; // Ignore comment in the AST
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
      const origin = processedLines.length;
      processedLines.push(cleanLine.trim());
      processedLineOrigins.push(lineIdx);
      const correlated =
        trailingComment === null
          ? pendingStandaloneComments
          : [...pendingStandaloneComments, trailingComment];
      if (correlated.length > 0) {
        lineComments.set(origin, correlated);
      }
      pendingStandaloneComments = [];
    }
  }

  if (processedLines.length === 0 && standaloneSignatures.length === 0)
    throw new Error("Empty expanded input");

  type ExpandedEntry = {
    name: string;
    node: TypeAST.AST;
    comment?: string[];
    origin: number;
  };

  const scope = new Map<string, TypeAST.AST>();
  const definitions: ExpandedEntry[] = [];
  const declarations: ExpandedEntry[] = [];

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

    assertNoNumericAtRefs(lineAST);

    if (lineAST.type === "NetworkCards") {
      throw new Error(
        `Line ${i + 1} contains semicolon-separated statements, which are only valid at the top level`
      );
    }

    if (declaredType) {
      assertKnownDeclaredType(declaredType);
      const declared = parseDeclaredType(declaredType);
      if (declared.kind !== "fn" && hasDeclaredTypeVariable(declared)) {
        throw new Error(
          `Line ${i + 1}: named type variables are only valid inside a signature; declare a concrete type for "${varName}"`
        );
      }
      const signature = computeSignature(lineAST);
      if (!declaredMatchesComputed(declared, signature)) {
        throw new Error(
          `Line ${i + 1}: variable "${varName}" is declared as type "${declaredType.trim()}" but the expression has type "${signature.getAst().type}"`
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
          if (!opts.allowDuplicateNames) {
            throw new Error(
              `Variable "${varName}" is already defined; redefinition is only allowed if the new definition resolves to the same AST`
            );
          }
          warnings.push(
            `Variable "${varName}" was defined twice; the first definition was kept and the later one was dropped.`
          );
        }
        continue;
      }
      if (definitions.some((def) => def.node === lineAST)) {
        lineAST = structuredClone(lineAST);
      }
      lineAST.varName = varName;
      scope.set(varName, lineAST);
      definitions.push({
        name: varName,
        node: lineAST,
        comment: lineComments.get(i),
        origin: processedLineOrigins[i]!,
      });
    } else {
      declarations.push({
        name: "",
        node: lineAST,
        comment: lineComments.get(i),
        origin: processedLineOrigins[i]!,
      });
    }
  }

  for (const sig of standaloneSignatures) {
    const declared = parseDeclaredType(sig.declared);
    const def = definitions.find((d) => d.name === sig.name);
    if (!def) {
      const nicknameKey = operatorRegistry.operatorByNickname(sig.name);
      if (!nicknameKey) {
        throw new Error(
          `Signature line ${sig.lineNum}: variable "${sig.name}" is not defined`
        );
      }
      const opNode: TypeAST.AST = setOperatorSourceName(
        { type: "Operator", opName: nicknameKey },
        sig.name
      );
      if (
        !declaredMatchesComputed(
          declared,
          computeSignature(opNode, undefined, true),
          { strictGenericSlots: true }
        )
      ) {
        throw new Error(
          `Signature line ${sig.lineNum}: variable "${sig.name}" is declared as type "${sig.declared}" but the expression has a different signature`
        );
      }
      declarations.push({
        name: "",
        node: opNode,
        origin: sig.lineNum - 1,
      });
      continue;
    }

    if (
      !declaredMatchesComputed(
        declared,
        computeSignature(def.node, undefined, true),
        { strictGenericSlots: true }
      )
    ) {
      throw new Error(
        `Signature line ${sig.lineNum}: variable "${sig.name}" is declared as type "${sig.declared}" but the expression has a different signature`
      );
    }
  }

  const entries = [
    ...definitions.map((entry) => ({ ...entry, declaration: false })),
    ...declarations.map((entry) => ({ ...entry, declaration: true })),
  ].sort((a, b) => a.origin - b.origin);

  const kept = entries;

  if (kept.length === 0) throw new Error("Could not determine final AST");

  const names = kept.map((entry) => entry.name);
  const network = buildNetworkCards(
    normalizeSegments(
      kept.map((entry) => entry.node),
      names
    ),
    startVariableId,
    names
  );
  const commentBySegment = new Map<number, string[]>();
  kept.forEach((entry, index) => {
    if (entry.comment && entry.comment.length > 0) {
      commentBySegment.set(index, entry.comment);
    }
  });
  for (const def of network.definitions) {
    const segmentIndex = (def as { segmentIndex?: number }).segmentIndex;
    const comment =
      segmentIndex === undefined
        ? undefined
        : commentBySegment.get(segmentIndex);
    if (comment) {
      Object.defineProperty(def, "comment", {
        value: comment,
        enumerable: false,
        configurable: true,
        writable: true,
      });
    }
  }
  return network;
};
