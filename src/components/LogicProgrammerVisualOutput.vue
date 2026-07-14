<script setup lang="ts">
import { computed } from "vue";
import FitText from "./FitText.vue";
import HoverMinecraftTooltip from "./HoverMinecraftTooltip.vue";
import DisplayPanelView from "./DisplayPanelView.vue";
import DisplayPanelViewHolder from "./DisplayPanelViewHolder.vue";
import {
  ASTToCondensed,
  getExpandedVarName,
  operatorRegistry,
  resetExpandedVarCounter,
  getCurryTooltipKey,
} from "lib";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { ASTtoOperator } from "lib/transformers/Operator";
import {
  BaseOperator,
  type LogicProgrammerRenderPatternKey,
} from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { flattenAnonymousBaseOperatorApplication } from "lib/transformers/helpers";
import tooltipInfo from "lib/generated/integratedDynamicsTooltipInfo.json";
import { LOGIC_PROGRAMMER_RENDER_PATTERNS } from "./logicProgrammerRenderPatterns";

type OperatorClassLike = {
  new (normalizeSignature?: boolean): BaseOperator<any, any>;
  internalName?: string;
  operatorName?: string;
  interactName?: string;
  displayName?: string;
  fullDisplayName?: string;
  tooltipInfo?: string;
  symbol?: string;
  renderPattern?: LogicProgrammerRenderPatternKey;
};

type VisualStep = {
  id: string;
  title: string;
  searchLabel: string;
  panelLabel?: string;
  symbol: string;
  kind: "operator" | "value";
  sourceType: TypeAST.AST["type"];
  renderPattern?: LogicProgrammerRenderPatternKey;
  inputs: VisualCardRef[];
  output: string;
  detail?: string;
  node: TypeAST.AST;
  variableId: number;
  tooltip: TooltipData;
  tooltipOperatorKey?: TypeOperatorKey;
  expectedInputTypes?: string[];
  expectedOutputType?: string;
  forceOperatorTabActive?: boolean;
  workspaceMode?: "operatorValue" | "pattern";
  typeError?: string;
};

type VisualCardRef = {
  name: string;
  type: TypeAST.AST["type"];
  variableId: number;
  tooltip: TooltipData;
};

type VisibleListEntry = {
  symbol: string;
  active: boolean;
  tabKind: "type" | "operator";
  color: string;
};

type TooltipData = {
  title: string;
  lines: string[];
};

type OperatorSignatureLine = {
  prefix: string;
  label: string;
  color: string;
};

const LOGIC_PROGRAMMER_DATA_TYPE_TABS = [
  "Boolean",
  "Integer",
  "Double",
  "Long",
  "String",
  "List",
  "Operator",
  "NBT",
  "Block",
  "Item",
  "Entity",
  "Fluid",
  "Ingredients",
  "Recipe",
] as const;

const LOGIC_PROGRAMMER_TYPE_COLORS: Record<string, string> = {
  Any: "#f0f0f0",
  Boolean: "#2b2fe7",
  Integer: "#f39604",
  Double: "#ebea17",
  Long: "#d7fe17",
  String: "#fa0a0d",
  List: "#af0301",
  Operator: "#2be72f",
  NBT: "#00aaaa",
  Block: "#f3f3f3",
  Item: "#f3f3f3",
  Entity: "#f3f3f3",
  Fluid: "#f3f3f3",
  Ingredients: "#f3f3f3",
  Recipe: "#f3f3f3",
  Null: "#f0f0f0",
};

const props = defineProps<{
  ast: TypeAST.AST;
  startVariableId: number;
  showStepNumbers?: boolean;
  showStepTitles?: boolean;
  operatorPreviewMode?: "value" | "pattern";
}>();

const SHIFT_HELD_TOOLTIP_INFO = tooltipInfo as Record<string, string>;
const VARIABLE_CARD_NAME = "Variable Card";
const VARIABLE_CARD_ID_TEMPLATE = "§e§oVariable ID: §r§o%s";
const VARIABLE_CARD_INFO_KEY = "item.integrateddynamics.variable.info";
const VALUE_TYPE_NAME_TEMPLATE = "§eType: §r%s";
const VALUE_TEMPLATE = "§e§oValue: §r%s";
const OPERATOR_NAME_TEMPLATE = "§eOperator: §r%s (%s)";
const OPERATOR_CATEGORY_TEMPLATE = "§eCategory: §r%s";
const OPERATOR_INPUT_TYPE_TEMPLATE = "§eInput Type %s: §r%s";
const OPERATOR_OUTPUT_TYPE_TEMPLATE = "§eOutput Type: §r%s";
const OPERATOR_VARIABLE_IDS_TEMPLATE = "§eVariable IDs: §r§o%s";
const OPERATOR_SIGNATURE_TEMPLATE = "§eSignature: §r%s";
const EXPECTED_INPUT_TYPE_TEMPLATE = "§eExpected Type: §r%s";
const EXPECTED_OUTPUT_TYPE_TEMPLATE = "§eExpected Output: §r%s";

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const formatTemplate = (template: string, ...values: string[]): string => {
  let currentIndex = 0;
  return template.replace(/%s/g, () => values[currentIndex++] ?? "");
};

const splitTooltipInfoLines = (value: string, maxLength = 25): string[] => {
  return value.split(/\\n/g).flatMap((partial) => {
    const lines: string[] = [];
    let buffer = "";

    for (const word of partial.split(" ")) {
      if (!word) continue;
      buffer = buffer ? `${buffer} ${word}` : word;
      if (buffer.length >= maxLength) {
        lines.push(`§5§o${buffer}`);
        buffer = "";
      }
    }

    if (buffer) {
      lines.push(`§5§o${buffer}`);
    }

    return lines;
  });
};

const formatVariableId = (value: number): string => `${value}`;

const getCardTitle = (name: string): string => {
  const trimmed = name.trim();
  return trimmed ? `§o${trimmed}` : VARIABLE_CARD_NAME;
};

type ValueTypeTooltipMeta = {
  label: string;
  colorCode: string;
  infoKey?: string;
};

const VALUE_TYPE_TOOLTIP_META: Record<string, ValueTypeTooltipMeta> = {
  Any: {
    label: "Any",
    colorCode: "§r",
    infoKey: "valuetype.integrateddynamics.any.info",
  },
  Number: {
    label: "Number",
    colorCode: "§6",
    infoKey: "valuetype.integrateddynamics.number.info",
  },
  Named: {
    label: "Named",
    colorCode: "§c",
    infoKey: "valuetype.integrateddynamics.named.info",
  },
  UniquelyNamed: {
    label: "Uniquely Named",
    colorCode: "§c",
    infoKey: "valuetype.integrateddynamics.uniquely_named.info",
  },
  Nullable: {
    label: "Nullable",
    colorCode: "§8",
  },
  Boolean: {
    label: "Boolean",
    colorCode: "§1",
  },
  Integer: {
    label: "Integer",
    colorCode: "§6",
  },
  Double: {
    label: "Double",
    colorCode: "§e",
  },
  Long: {
    label: "Long",
    colorCode: "§e",
  },
  String: {
    label: "String",
    colorCode: "§c",
  },
  Operator: {
    label: "Operator",
    colorCode: "§2",
    infoKey: "valuetype.integrateddynamics.operator.info",
  },
  NBT: {
    label: "NBT",
    colorCode: "§3",
  },
  List: {
    label: "List",
    colorCode: "§4",
  },
  Block: {
    label: "Block",
    colorCode: "§7",
  },
  Item: {
    label: "Item",
    colorCode: "§7",
  },
  Entity: {
    label: "Entity",
    colorCode: "§7",
  },
  Fluid: {
    label: "Fluid",
    colorCode: "§7",
  },
  Ingredients: {
    label: "Ingredients",
    colorCode: "§7",
  },
  Recipe: {
    label: "Recipe",
    colorCode: "§7",
  },
};

const getValueTypeMeta = (typeName: string): ValueTypeTooltipMeta => {
  return (
    VALUE_TYPE_TOOLTIP_META[typeName] ?? {
      label: typeName,
      colorCode: "§f",
    }
  );
};

const getValueTypeMetaForAst = (
  type: TypeAST.AST["type"]
): ValueTypeTooltipMeta => {
  if (type === "Null") return getValueTypeMeta("Any");
  return getValueTypeMeta(type);
};

const getTooltipInfoLines = (infoKey?: string): string[] => {
  if (!infoKey) return [];

  const line = SHIFT_HELD_TOOLTIP_INFO[infoKey];
  return line ? splitTooltipInfoLines(line) : [];
};

const getOperatorClass = (
  opName: TypeOperatorKey
): OperatorClassLike | undefined => {
  return operatorRegistry[
    opName as keyof typeof operatorRegistry
  ] as unknown as OperatorClassLike | undefined;
};

const getOperatorTooltipMeta = (opName: TypeOperatorKey) => {
  const operatorClass = getOperatorClass(opName);
  if (!operatorClass) {
    return {
      displayName: opName,
      categoryName: "Operator",
      symbol: opName,
      inputTypes: [] as string[],
      outputType: "Any",
      tooltipInfo: undefined as string | undefined,
      fullName: opName,
    };
  }

  const operator = new operatorClass(false);
  const signature = operator.getParsedSignature();
  const inputTypes = Array.from({ length: signature.getArity() }, (_, index) =>
    signature.getInput(index).getRootType()
  );

  return {
    displayName: operator.getDisplayOperatorName(),
    categoryName: operator.getCategoryName(),
    symbol: operator.symbol,
    inputTypes,
    outputType: signature.getOutput(-1).getRootType(),
    tooltipInfo: operatorClass.tooltipInfo,
    fullName: operator.getFullDisplayName(),
  };
};

const cloneAstWithoutVarNames = (ast: TypeAST.AST): TypeAST.AST => {
  switch (ast.type) {
    case "Curry":
      return {
        type: "Curry",
        base: cloneAstWithoutVarNames(ast.base) as TypeAST.Operator,
        args: ast.args.map(cloneAstWithoutVarNames),
      };
    case "Pipe":
      return {
        type: "Pipe",
        op1: cloneAstWithoutVarNames(ast.op1) as TypeAST.Operator,
        op2: cloneAstWithoutVarNames(ast.op2) as TypeAST.Operator,
      };
    case "Pipe2":
      return {
        type: "Pipe2",
        op1: cloneAstWithoutVarNames(ast.op1) as TypeAST.Operator,
        op2: cloneAstWithoutVarNames(ast.op2) as TypeAST.Operator,
        op3: cloneAstWithoutVarNames(ast.op3) as TypeAST.Operator,
      };
    case "Flip":
      return {
        type: "Flip",
        arg: cloneAstWithoutVarNames(ast.arg) as TypeAST.Operator,
      };
    case "List":
      return {
        type: "List",
        value: ast.value.map(cloneAstWithoutVarNames),
      };
    case "Variable":
      return {
        type: "Variable",
        name: ast.name,
      };
    case "Operator":
      return {
        type: "Operator",
        opName: ast.opName,
      };
    case "Integer":
      return { type: "Integer", value: ast.value };
    case "Long":
      return { type: "Long", value: ast.value };
    case "Double":
      return { type: "Double", value: ast.value };
    case "String":
      return { type: "String", value: ast.value };
    case "Boolean":
      return { type: "Boolean", value: ast.value };
    case "Null":
      return { type: "Null" };
    case "NBT":
      return { type: "NBT", value: ast.value };
    case "Block":
      return { type: "Block", value: ast.value };
    case "Item":
      return { type: "Item", value: ast.value };
    case "Fluid":
      return { type: "Fluid", value: ast.value };
    case "Entity":
      return { type: "Entity", value: ast.value };
    case "Ingredients":
      return {
        type: "Ingredients",
        value: {
          items: (ast.value.items ?? []).map((item) =>
            cloneAstWithoutVarNames(item)
          ) as TypeAST.Item[],
          fluids: (ast.value.fluids ?? []).map((fluid) =>
            cloneAstWithoutVarNames(fluid)
          ) as TypeAST.Fluid[],
          energy: (ast.value.energy ?? []).map((energy) =>
            cloneAstWithoutVarNames(energy)
          ) as TypeAST.Long[],
        },
      };
    case "Recipe":
      return {
        type: "Recipe",
        value: {
          input: cloneAstWithoutVarNames(
            ast.value.input
          ) as TypeAST.Ingredients,
          output: cloneAstWithoutVarNames(
            ast.value.output
          ) as TypeAST.Ingredients,
          inputReuseable: ast.value.inputReuseable,
        },
      };
  }
};

const getCompactValueTextForAst = (ast: TypeAST.AST): string => {
  switch (ast.type) {
    case "String":
      return ast.value;
    case "Boolean":
      return String(ast.value);
    case "Integer":
    case "Long":
    case "Double":
      return ast.value;
    case "Null":
      return "null";
    case "NBT":
      return JSON.stringify(ast.value);
    case "List":
      return `[${ast.value.map(getCompactValueTextForAst).join(", ")}]`;
    case "Block":
    case "Item":
    case "Fluid":
    case "Entity":
    case "Ingredients":
    case "Recipe": {
      const value = ASTtoOperator(cloneAstWithoutVarNames(ast));
      if ("getName" in value && typeof value.getName === "function") {
        return value.getName().valueOf();
      }
      break;
    }
  }

  return ASTToCondensed(cloneAstWithoutVarNames(ast));
};

const getCompactValueText = (
  step: Pick<VisualStep, "sourceType" | "detail" | "node">
): string => {
  if (step.sourceType === "Operator" && step.detail) {
    return getOperatorTooltipMeta(step.detail as TypeOperatorKey).fullName;
  }

  return getCompactValueTextForAst(step.node);
};

const getOperatorDisplay = (opName: TypeOperatorKey) => {
  const operatorClass = operatorRegistry[
    opName as keyof typeof operatorRegistry
  ] as unknown as OperatorClassLike | undefined;

  return {
    title: operatorClass?.interactName ?? opName,
    searchLabel: operatorClass?.operatorName ?? "Filter",
    panelLabel: operatorClass?.fullDisplayName ?? opName,
    symbol: operatorClass?.symbol ?? opName,
    renderPattern: operatorClass?.renderPattern ?? "NONE",
  };
};

const getOperatorInternalName = (
  opName: TypeOperatorKey
): string | undefined => {
  return getOperatorClass(opName)?.internalName;
};

const getVirtualOperatorDisplay = (
  key: "apply" | "pipe" | "pipe2" | "flip"
) => {
  const displayNames: Record<typeof key, string> = {
    apply: "Apply",
    pipe: "Virtual Piped",
    pipe2: "Virtual Piped 2",
    flip: "Virtual Flipped",
  };

  const registryKeyMap = {
    apply: "OPERATOR_APPLY",
    pipe: "OPERATOR_PIPE",
    pipe2: "OPERATOR_PIPE2",
    flip: "OPERATOR_FLIP",
  } as const;
  const operatorClass = operatorRegistry[registryKeyMap[key]] as unknown as
    | OperatorClassLike
    | undefined;

  if (!operatorClass) {
    return {
      title: displayNames[key],
      searchLabel: key,
      symbol: key,
      renderPattern: "NONE" as const,
    };
  }

  return {
    title: displayNames[key],
    searchLabel: operatorClass.operatorName ?? key,
    symbol: operatorClass.symbol ?? key,
    renderPattern: operatorClass.renderPattern ?? "NONE",
  };
};

const getValueTypeSearchLabel = (type: TypeAST.AST["type"]): string => {
  switch (type) {
    case "Boolean":
    case "Integer":
    case "Double":
    case "Long":
    case "String":
    case "List":
    case "Operator":
    case "NBT":
    case "Block":
    case "Item":
    case "Entity":
    case "Fluid":
    case "Ingredients":
    case "Recipe":
      return type;
    case "Null":
      return "Any";
    default:
      return type;
  }
};

const getValueTypeDisplayEntries = () =>
  LOGIC_PROGRAMMER_DATA_TYPE_TABS.map((tab) => ({
    symbol: tab,
    matchString: tab.toLowerCase(),
    tabKind: "type" as const,
    color: LOGIC_PROGRAMMER_TYPE_COLORS[tab] ?? "#f0f0f0",
  }));

const getValueTypeTextureName = (type: TypeAST.AST["type"]): string => {
  switch (type) {
    case "Boolean":
      return "boolean";
    case "Integer":
      return "integer";
    case "Double":
      return "double";
    case "Long":
      return "long";
    case "String":
      return "string";
    case "List":
      return "list";
    case "Operator":
    case "Curry":
    case "Pipe":
    case "Pipe2":
    case "Flip":
      return "operator";
    case "NBT":
      return "nbt";
    case "Block":
    case "Item":
    case "Entity":
    case "Fluid":
    case "Ingredients":
    case "Recipe":
      return "object";
    default:
      return "any";
  }
};

const isItemStackBackedValueType = (type: TypeAST.AST["type"]) =>
  type === "Item" || type === "Block" || type === "Fluid";

const getItemStackPlaceholder = (type: TypeAST.AST["type"]) => `${type} here`;

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

const smoothChannel = (channel: number, active: boolean) =>
  Math.round(255 - (255 - channel) / (active ? 2 : 4));

const getEntryStyle = (entry: VisibleListEntry) => {
  const { r, g, b } = hexToRgb(entry.color);
  const sr = smoothChannel(r, entry.active);
  const sg = smoothChannel(g, entry.active);
  const sb = smoothChannel(b, entry.active);

  return {
    backgroundColor: `rgba(${sr}, ${sg}, ${sb}, ${entry.active ? 0.45 : 0.28})`,
  };
};

const getOperatorOutputType = (operatorClass: OperatorClassLike): string => {
  return new operatorClass(false)
    .getParsedSignature()
    .getOutput(-1)
    .getRootType();
};

const getCardName = (ast: TypeAST.AST): string => {
  if (ast.varName) return ast.varName;
  return getExpandedVarName(ast);
};

const getExpandedCurryChunks = (
  ast: TypeAST.Curried
): { node: TypeAST.Curried; args: TypeAST.AST[] }[] => {
  const flattened = flattenAnonymousBaseOperatorApplication(ast);

  if (flattened?.fullyApplied) {
    return [];
  }

  const chunks: { node: TypeAST.Curried; args: TypeAST.AST[] }[] = [];
  const isApplyN =
    ast.base.type === "Operator" &&
    getOperatorInternalName(ast.base.opName) ===
      "integrateddynamics:operator_apply_n";

  let currentBase = ast.base;
  let index = 0;

  while (index < ast.args.length) {
    let take = 1;
    if (isApplyN && index === 0 && ast.args.length >= 2) {
      take = 2;
    }

    const chunkArgs = ast.args.slice(index, index + take);
    const isLast = index + take === ast.args.length;
    const chunkNode: TypeAST.Curried = {
      type: "Curry",
      base: currentBase,
      args: chunkArgs,
    };
    const namedChunk: TypeAST.Curried = {
      ...chunkNode,
      varName: isLast
        ? ast.varName || getExpandedVarName(chunkNode)
        : getExpandedVarName(chunkNode),
    };

    chunks.push({
      node: namedChunk,
      args: chunkArgs,
    });

    currentBase = namedChunk;
    index += take;
  }

  return chunks;
};

const primitiveDetail = (ast: TypeAST.AST): string | undefined => {
  switch (ast.type) {
    case "String":
      return ast.value;
    case "Boolean":
      return String(ast.value);
    case "Integer":
    case "Long":
    case "Double":
      return ast.value;
    case "Null":
      return "null";
    case "NBT":
      return JSON.stringify(ast.value);
    case "Variable":
      return ast.name;
    default:
      return undefined;
  }
};

const getOperatorValueSignatureText = (opName: TypeOperatorKey): string => {
  const operatorClass = getOperatorClass(opName);
  if (!operatorClass) return "";

  const signature = new ParsedSignature(
    new operatorClass(false).getParsedSignature().getAst(),
    false
  ).toFlatSignature();

  return signature
    .map((typeName) => {
      const meta = getValueTypeMeta(typeName);
      return `${meta.colorCode}${meta.label}`;
    })
    .join(" §r-> ");
};

const getDisplayPanelText = (
  step: Pick<
    VisualStep,
    "output" | "node" | "tooltipOperatorKey" | "sourceType" | "detail"
  >
): string => {
  // For string types without custom name, show the value
  if (step.sourceType === "String" && step.detail) {
    return step.detail;
  }
  // For List types, show each element as a bullet point
  if (step.sourceType === "List") {
    const elements = (step.node as any).value as TypeAST.AST[];
    if (elements.length === 0) return "(empty)";
    return elements
      .map((elem: TypeAST.AST) => `- ${getCompactValueTextForAst(elem)}`)
      .join("\n");
  }
  if (step.node) {
    try {
      const op = ASTtoOperator(step.node) as any;
      const nodeType = step.node.type;

      // For serializer types (Flip, Pipe, Pipe2, Curry), use the resolved
      // signature from the AST node instead of the generic registry signature
      if (nodeType === "Flip" || nodeType === "Pipe" || nodeType === "Pipe2") {
        const opKey = step.tooltipOperatorKey;
        if (opKey) {
          // Map tooltip keys to virtual operator keys
          const virtualKeyMap: Record<
            string,
            "flip" | "pipe" | "pipe2" | "apply"
          > = {
            OPERATOR_FLIP: "flip",
            OPERATOR_PIPE: "pipe",
            OPERATOR_PIPE2: "pipe2",
            OPERATOR_APPLY: "apply",
            OPERATOR_APPLY_2: "apply",
            OPERATOR_APPLY_3: "apply",
            OPERATOR_APPLY_0: "apply",
            OPERATOR_APPLY_N: "apply",
          };
          const virtualKey = virtualKeyMap[opKey];
          if (virtualKey) {
            const operatorDisplay = getVirtualOperatorDisplay(virtualKey);
            // Use the resolved operator's signature from the AST node
            const resolvedSig = op.getParsedSignature();
            const flatSig = resolvedSig.toFlatSignature();
            const indent = "\u00A0";
            const sigLines = flatSig              .map((type: string, i: number) => (i === 0 ? type : `${indent}-> ${type}`))
            .join("\n");
            return `${operatorDisplay.title} ::\n${sigLines}`;
          }
        }
        return step.output;
      }

      // For Curry types, show the resolved value when fully applied,
      // or operator name + signature when partially applied
      if (nodeType === "Curry") {
        if (typeof (op as any).getName !== "function") {
          return step.output;
        }
        const sig = (op as any).getParsedSignature();
        // If fully applied (not a function signature), try to show the value
        if (sig.getRootType() !== "Function") {
          // Helper: try to resolve an AST/operator to a concrete value
          const resolveArg = (arg: any): any => {
            try {
              if (typeof arg?.getFn === "function") {
                const fn = arg.getFn();
                if (typeof fn === "function") {
                  const result = fn(null);
                  // Only accept if it's a concrete value (not another operator)
                  if (result != null && typeof result.getFn !== "function") {
                    return result;
                  }
                }
              }
            } catch {
              // skip
            }
            return arg;
          };

          // Fast path: try fn(null) on the combined CurriedOperator
          try {
            const fn = (op as any).getFn();
            if (typeof fn === "function") {
              const evaluated = resolveArg(fn(null));
              if (evaluated != null && typeof evaluated.valueOf === "function") {
                const val = evaluated.valueOf();
                if (Array.isArray(val)) {
                  if (val.length === 0) return "(empty)";
                  return val
                    .map((item: unknown) => {
                      const d = item != null && typeof (item as any).valueOf === "function"
                        ? String((item as any).valueOf())
                        : String(item);
                      return `- ${d}`;
                    })
                    .join("\n");
                }
                const display = val != null && typeof (val as any).valueOf === "function"
                  ? String((val as any).valueOf())
                  : String(val);
                return display;
              }
            }
          } catch {
            // Fast path failed, try per-arg resolution
          }

          // Fallback: evaluate each arg separately via flattened AST
          try {
            const flat = flattenAnonymousBaseOperatorApplication(step.node as TypeAST.AST);
            if (flat && flat.operator.type === "Operator") {
              // Resolve each arg AST to a concrete value
              const argValues: any[] = [];
              for (const argAst of flat.args) {
                const argOp = ASTtoOperator(argAst);
                argValues.push(resolveArg(argOp));
              }
              // Apply the base operator with resolved args
              const baseOp = ASTtoOperator(flat.operator) as any;
              let result: any = typeof baseOp.getFn === "function" ? baseOp.getFn() : baseOp;
              for (const argVal of argValues) {
                if (typeof result === "function") {
                  result = result(argVal);
                } else if (typeof result?.apply === "function") {
                  result = result.apply(argVal);
                } else {
                  break;
                }
              }
              if (result != null && typeof result.valueOf === "function") {
                const val = result.valueOf();
                if (!Array.isArray(val)) {
                  return String(val != null && typeof (val as any).valueOf === "function"
                    ? (val as any).valueOf()
                    : val);
                }
                if (val.length === 0) return "(empty)";
                return val
                  .map((item: any) => `- ${String(typeof item?.valueOf === "function" ? item.valueOf() : item)}`)
                  .join("\n");
              }
            }
          } catch {
            // Fall through
          }

          return step.output;
        }
        const name = (op as any).getName().valueOf();
        const flatSig = new ParsedSignature(sig.getAst(), false).toFlatSignature();
        const indent = "\u00A0";
        const sigLines = flatSig
          .map((type: string, i: number) => (i === 0 ? type : `${indent}-> ${type}`))
          .join("\n");
        return `${name} ::\n${sigLines}`;
      }

      if (typeof (op as any).getFullDisplayName !== "function") {
        return step.output;
      }

      const name = op.getFullDisplayName();
      const signature = new ParsedSignature(
        op.getParsedSignature().getAst(),
        false
      ).toFlatSignature();
      const indent = "\u00A0";
      const sigLines = signature
        .map((type: string, i: number) => (i === 0 ? type : `${indent}-> ${type}`))
        .join("\n");
      return `${name} ::\n${sigLines}`;
    } catch {
      return step.output;
    }
  }
  return step.output;
};

const getDisplayPanelColor = (
  step: Pick<
    VisualStep,
    "sourceType" | "detail" | "tooltipOperatorKey" | "forceOperatorTabActive"
  > & { node?: TypeAST.AST }
): string => {
  if (step.sourceType === "Operator" || step.forceOperatorTabActive) {
    return LOGIC_PROGRAMMER_TYPE_COLORS["Operator"] ?? "#2be72f";
  }
  // For Curry types, check if fully applied to get the actual output color
  if (step.sourceType === "Curry") {
    if (step.node) {
      const flattened = flattenAnonymousBaseOperatorApplication(step.node);
      if (flattened?.fullyApplied) {
        const outputType = getStepActualOutputType(step);
        return LOGIC_PROGRAMMER_TYPE_COLORS[outputType] ?? "#f0f0f0";
      }
    }
    return LOGIC_PROGRAMMER_TYPE_COLORS["Operator"] ?? "#2be72f";
  }
  // For serializer types (Flip, Pipe, Pipe2) used from their respective tabs
  const opKey = step.tooltipOperatorKey;
  if (
    opKey &&
    (opKey === "OPERATOR_FLIP" ||
      opKey === "OPERATOR_PIPE" ||
      opKey === "OPERATOR_PIPE2")
  ) {
    return LOGIC_PROGRAMMER_TYPE_COLORS["Operator"] ?? "#2be72f";
  }
  const outputType = getStepActualOutputType(step);
  return LOGIC_PROGRAMMER_TYPE_COLORS[outputType] ?? "#f0f0f0";
};

const getDisplayPanelAlign = (
  step: Pick<VisualStep, "sourceType">
): "left" | "center" | "top" => {
  const sourceType = step.sourceType;
  if (
    sourceType === "Operator" ||
    sourceType === "Integer" ||
    sourceType === "Double" ||
    sourceType === "Long" ||
    sourceType === "Flip" ||
    sourceType === "Pipe" ||
    sourceType === "Pipe2" ||
    sourceType === "Curry"
  ) {
    return "top";
  }
  return "center";
};

const getOutputTextureName = (
  step: Pick<
    VisualStep,
    | "sourceType"
    | "detail"
    | "tooltipOperatorKey"
    | "forceOperatorTabActive"
  > & { node?: TypeAST.AST }
): TypeAST.AST["type"] => {
  if (step.sourceType === "Operator" || step.forceOperatorTabActive) {
    return "Operator";
  }
  // For Curry types, check if fully applied to get the actual output type
  if (step.sourceType === "Curry") {
    if (step.node) {
      const flattened = flattenAnonymousBaseOperatorApplication(step.node);
      if (flattened?.fullyApplied) {
        return getStepActualOutputType(step) as TypeAST.AST["type"];
      }
    }
    return "Operator";
  }
  // For serializer types (Flip, Pipe, Pipe2) used from their respective tabs
  const opKey = step.tooltipOperatorKey;
  if (
    opKey &&
    (opKey === "OPERATOR_FLIP" ||
      opKey === "OPERATOR_PIPE" ||
      opKey === "OPERATOR_PIPE2")
  ) {
    return "Operator";
  }
  return getStepActualOutputType(step) as TypeAST.AST["type"];
};

const getStepActualOutputType = (
  step: Pick<VisualStep, "sourceType" | "detail" | "tooltipOperatorKey"> & {
    node?: TypeAST.AST;
  }
): string => {
  // For Curry types, use the actual CurriedOperator's output type
  if (step.sourceType === "Curry" && step.node) {
    try {
      const op = ASTtoOperator(step.node) as any;
      if (typeof op?.getParsedSignature === "function") {
        const sig = op.getParsedSignature();
        if (sig.getRootType() === "Function") {
          return sig.getOutput(-1).getRootType();
        }
        return sig.getRootType();
      }
    } catch {
      // Fall through to default handling
    }
  }
  const opKey = step.detail ?? step.tooltipOperatorKey;
  if (opKey) {
    const operatorClass = getOperatorClass(opKey as TypeOperatorKey);
    if (operatorClass) {
      return new ParsedSignature(
        new operatorClass(false).getParsedSignature().getAst(),
        false
      )
        .getOutput(-1)
        .getRootType();
    }
  }
  return step.sourceType;
};

const getOperatorReferenceText = (inputs: VisualCardRef[]): string => {
  return `{${inputs
    .map((input) => `${input.name}:${input.variableId}`)
    .join(",")}}`;
};

const getBaseTooltipLines = (variableId: number): string[] => {
  return [
    formatTemplate(VARIABLE_CARD_ID_TEMPLATE, formatVariableId(variableId)),
    ...getTooltipInfoLines(VARIABLE_CARD_INFO_KEY),
  ];
};

const buildValueCardTooltip = (
  step: Pick<
    VisualStep,
    "output" | "sourceType" | "detail" | "node" | "tooltipOperatorKey"
  >,
  variableId: number
): TooltipData => {
  const typeMeta = getValueTypeMetaForAst(step.sourceType);
  const lines = [
    formatTemplate(
      VALUE_TYPE_NAME_TEMPLATE,
      `${typeMeta.colorCode}${typeMeta.label}`
    ),
    ...getTooltipInfoLines(typeMeta.infoKey),
  ];

  // Check for operator/serializer types with their operator key
  const opKey = step.tooltipOperatorKey;
  if (
    opKey &&
    (step.sourceType === "Operator" ||
      step.sourceType === "Curry" ||
      step.sourceType === "Flip" ||
      step.sourceType === "Pipe" ||
      step.sourceType === "Pipe2")
  ) {
    lines.push(
      formatTemplate(
        OPERATOR_SIGNATURE_TEMPLATE,
        getOperatorValueSignatureText(opKey as TypeOperatorKey)
      )
    );
  }

  lines.push(formatTemplate(VALUE_TEMPLATE, getCompactValueText(step)));
  lines.push(...getBaseTooltipLines(variableId));

  return {
    title: getCardTitle(step.output),
    lines,
  };
};

const buildOperatorCardTooltip = (
  step: Pick<
    VisualStep,
    "output" | "inputs" | "tooltipOperatorKey" | "sourceType"
  > & { node?: TypeAST.AST },
  variableId: number
): TooltipData => {
  const operatorKey = step.tooltipOperatorKey;
  if (!operatorKey) {
    return {
      title: getCardTitle(step.output),
      lines: getBaseTooltipLines(variableId),
    };
  }

  // For serializer types (Curry/Pipe/Pipe2/Flip), resolve the actual
  // signature from the AST node instead of showing the generic registry
  // signature (which always shows type variables like Operator -> Any -> Any)
  const serializerTypes: ReadonlySet<string> = new Set([
    "Curry",
    "Pipe",
    "Pipe2",
    "Flip",
  ]);
  if (
    step.sourceType &&
    serializerTypes.has(step.sourceType) &&
    step.node
  ) {
    try {
      const op = ASTtoOperator(step.node) as any;
      if (typeof op?.getParsedSignature === "function") {
        const resolvedSig = op.getParsedSignature();
        const resolvedInputTypes = Array.from(
          { length: resolvedSig.getArity() },
          (_, index) => resolvedSig.getInput(index).getRootType()
        );
        const resolvedOutputType = resolvedSig.getOutput(-1).getRootType();

        // Determine display name/symbol/category
        let displayName: string = operatorKey;
        let categoryName = "Operator";
        let symbol: string = operatorKey;

        if (step.sourceType === "Curry") {
          // For Curry, try to get the inner operator's info
          const flattened = flattenAnonymousBaseOperatorApplication(step.node);
          if (flattened?.operator.type === "Operator") {
            const baseMeta = getOperatorTooltipMeta(flattened.operator.opName);
            displayName = baseMeta.displayName;
            categoryName = baseMeta.categoryName;
            symbol = baseMeta.symbol;
          }
        } else {
          // For Pipe/Pipe2/Flip, use the virtual operator display
          const virtualKeyMap: Record<string, "pipe" | "pipe2" | "flip"> = {
            Pipe: "pipe",
            Pipe2: "pipe2",
            Flip: "flip",
          };
          const virtualKey = virtualKeyMap[step.sourceType];
          if (virtualKey) {
            const virtualDisplay = getVirtualOperatorDisplay(virtualKey);
            displayName = virtualDisplay.title;
            symbol = virtualDisplay.symbol;
          }
        }

        const lines = [
          formatTemplate(OPERATOR_NAME_TEMPLATE, displayName, symbol),
          formatTemplate(OPERATOR_CATEGORY_TEMPLATE, categoryName),
          ...resolvedInputTypes.map((inputType, index) => {
            const inputMeta = getValueTypeMeta(inputType);
            return formatTemplate(
              OPERATOR_INPUT_TYPE_TEMPLATE,
              `${index + 1}`,
              `${inputMeta.colorCode}${inputMeta.label}`
            );
          }),
          formatTemplate(
            OPERATOR_OUTPUT_TYPE_TEMPLATE,
            `${
              resolvedOutputType === "Any"
                ? "§0"
                : getValueTypeMeta(resolvedOutputType).colorCode
            }${getValueTypeMeta(resolvedOutputType).label}`
          ),
          // Skip tooltip info for virtual serializer operators
          formatTemplate(
            OPERATOR_VARIABLE_IDS_TEMPLATE,
            getOperatorReferenceText(step.inputs)
          ),
          ...getBaseTooltipLines(variableId),
        ];

        return {
          title: getCardTitle(step.output),
          lines,
        };
      }
    } catch {
      // Fallback: for Curry types, use the base operator's info
      if (step.sourceType === "Curry") {
        const flattened = flattenAnonymousBaseOperatorApplication(
          step.node as TypeAST.AST
        );
        if (flattened?.operator.type === "Operator") {
          const baseMeta = getOperatorTooltipMeta(flattened.operator.opName);
          const lines = [
            formatTemplate(OPERATOR_NAME_TEMPLATE, baseMeta.displayName, baseMeta.symbol),
            formatTemplate(OPERATOR_CATEGORY_TEMPLATE, baseMeta.categoryName),
            ...baseMeta.inputTypes.map((inputType, index) => {
              const inputMeta = getValueTypeMeta(inputType);
              return formatTemplate(
                OPERATOR_INPUT_TYPE_TEMPLATE,
                `${index + 1}`,
                `${inputMeta.colorCode}${inputMeta.label}`
              );
            }),
            formatTemplate(
              OPERATOR_OUTPUT_TYPE_TEMPLATE,
              `${
                baseMeta.outputType === "Any"
                  ? "§0"
                  : getValueTypeMeta(baseMeta.outputType).colorCode
              }${getValueTypeMeta(baseMeta.outputType).label}`
            ),
            formatTemplate(
              OPERATOR_VARIABLE_IDS_TEMPLATE,
              getOperatorReferenceText(step.inputs)
            ),
            ...getBaseTooltipLines(variableId),
          ];
          return {
            title: getCardTitle(step.output),
            lines,
          };
        }
      }
    }
  }

  const operatorMeta = getOperatorTooltipMeta(operatorKey);
  const operatorInfoLines =
    operatorKey === "OPERATOR_FLIP" ||
    operatorKey === "OPERATOR_APPLY" ||
    operatorKey === "OPERATOR_PIPE" ||
    operatorKey === "OPERATOR_PIPE2"
      ? []
      : splitTooltipInfoLines(operatorMeta.tooltipInfo ?? "");
  const lines = [
    formatTemplate(
      OPERATOR_NAME_TEMPLATE,
      operatorMeta.displayName,
      operatorMeta.symbol
    ),
    formatTemplate(OPERATOR_CATEGORY_TEMPLATE, operatorMeta.categoryName),
    ...operatorMeta.inputTypes.map((inputType, index) => {
      const inputMeta = getValueTypeMeta(inputType);
      return formatTemplate(
        OPERATOR_INPUT_TYPE_TEMPLATE,
        `${index + 1}`,
        `${inputMeta.colorCode}${inputMeta.label}`
      );
    }),
    formatTemplate(
      OPERATOR_OUTPUT_TYPE_TEMPLATE,
      `${
        operatorMeta.outputType === "Any"
          ? "§0"
          : getValueTypeMeta(operatorMeta.outputType).colorCode
      }${getValueTypeMeta(operatorMeta.outputType).label}`
    ),
    ...operatorInfoLines,
    formatTemplate(
      OPERATOR_VARIABLE_IDS_TEMPLATE,
      getOperatorReferenceText(step.inputs)
    ),
    ...getBaseTooltipLines(variableId),
  ];

  return {
    title: getCardTitle(step.output),
    lines,
  };
};

const buildStepTooltip = (
  step: Pick<
    VisualStep,
    | "kind"
    | "output"
    | "sourceType"
    | "detail"
    | "inputs"
    | "node"
    | "tooltipOperatorKey"
  >,
  variableId: number
): TooltipData => {
  if (step.kind === "operator" && step.sourceType !== "Operator") {
    return buildOperatorCardTooltip(step, variableId);
  }

  return buildValueCardTooltip(step, variableId);
};

const steps = computed<VisualStep[]>(() => {
  resetExpandedVarCounter();

  if (
    props.operatorPreviewMode === "pattern" &&
    props.ast.type === "Operator"
  ) {
    const operator = getOperatorDisplay(props.ast.opName);
    const operatorMeta = getOperatorTooltipMeta(props.ast.opName);
    const signatureTypes = getOperatorValueSignatureTypes(props.ast.opName);
    const variableId = props.startVariableId;
    const step: Omit<VisualStep, "variableId" | "tooltip"> = {
      id: "operator-pattern-preview",
      title: operator.title,
      searchLabel: operator.searchLabel,
      panelLabel: operator.panelLabel,
      symbol: operator.symbol,
      kind: "value",
      sourceType: "Operator",
      renderPattern: operator.renderPattern,
      inputs: [],
      output: getCardName(props.ast),
      detail: props.ast.opName,
      node: props.ast,
      tooltipOperatorKey: props.ast.opName,
      expectedInputTypes: operatorMeta.inputTypes,
      expectedOutputType:
        signatureTypes.length > 0
          ? signatureTypes[signatureTypes.length - 1]
          : operatorMeta.outputType,
      forceOperatorTabActive: true,
      workspaceMode: "pattern",
    };

    return [
      {
        ...step,
        variableId,
        tooltip: buildStepTooltip(step, variableId),
      },
    ];
  }

  const result: VisualStep[] = [];
  const seen = new Map<TypeAST.AST, VisualCardRef>();

  const visit = (ast: TypeAST.AST): VisualCardRef => {
    if (seen.has(ast)) return seen.get(ast)!;

    const nextName = getCardName(ast);      const register = (
      step: Omit<VisualStep, "variableId" | "tooltip">
    ): VisualCardRef => {
      const variableId = props.startVariableId + result.length;
      const tooltip = buildStepTooltip(step, variableId);
      const fullStep = {
        ...step,
        variableId,
        tooltip,
      };
      result.push(fullStep);
      const card = {
        name: fullStep.output,
        type: getStepActualOutputType(fullStep) as TypeAST.AST["type"],
        variableId,
        tooltip,
      };
      seen.set(ast, card);
      return card;
    };

    switch (ast.type) {
      case "Operator": {
        const operator = getOperatorDisplay(ast.opName);
        return register({
          id: `step-${result.length + 1}`,
          title: operator.title,
          searchLabel: "Operator",
          panelLabel: operator.panelLabel,
          symbol: operator.symbol,
          kind: "operator",
          sourceType: ast.type,
          renderPattern: operator.renderPattern,
          inputs: [],
          output: nextName,
          detail: ast.opName,
          node: ast,
          tooltipOperatorKey: ast.opName,
          workspaceMode: "operatorValue",
        });
      }
      case "Curry": {
        const virtualOperator = getVirtualOperatorDisplay("apply");
        const flattened = flattenAnonymousBaseOperatorApplication(ast);

        if (flattened?.fullyApplied && flattened.operator.type === "Operator") {
          const argOutputs = flattened.args.map(visit);
          const finalVarName = ast.varName || getExpandedVarName(ast);

          // Validate input types against operator's expected types
          let typeError: string | undefined;
          const opMeta = getOperatorTooltipMeta(flattened.operator.opName);
          const isArityOne = opMeta.inputTypes.length === 1;
          for (let i = 0; i < Math.min(opMeta.inputTypes.length, argOutputs.length); i++) {
            const expected = opMeta.inputTypes[i]!;
            const actual: string = argOutputs[i]!.type;
            if (expected !== "Any" && expected !== "Operator" && actual !== expected) {
              // For arity 1 operators, try to harden "Any" into a concrete type
              if (actual === "Any" && isArityOne) {
                try {
                  const argOp = ASTtoOperator(flattened.args[i]!) as any;
                  const sig =
                    typeof argOp?.getParsedSignature === "function"
                      ? argOp.getParsedSignature()
                      : typeof argOp?.getSignatureNode === "function"
                        ? argOp.getSignatureNode()
                        : null;
                  if (sig) {
                    const hardened = sig.rewrite().getRootType();
                    if (hardened !== expected) {
                      typeError = `Type mismatch: expected ${expected}, got ${hardened}`;
                      break;
                    }
                    // Hardened matches expected — no error
                    continue;
                  }
                } catch {
                  // Couldn't harden, fall through
                }
              }
              if (isArityOne || actual !== "Any") {
                typeError = `Type mismatch: expected ${expected}, got ${actual}`;
                break;
              }
            }
          }

          const step = {
            id: `step-${result.length + 1}`,
            title: getOperatorDisplay(flattened.operator.opName).title,
            searchLabel: getOperatorDisplay(flattened.operator.opName)
              .searchLabel,
            symbol: getOperatorDisplay(flattened.operator.opName).symbol,
            kind: "operator" as const,
            sourceType: ast.type,
            renderPattern: getOperatorDisplay(flattened.operator.opName).renderPattern,
            inputs: argOutputs,
            output: finalVarName,
            node: ast,
            tooltipOperatorKey: getCurryTooltipKey(flattened.args.length),
            typeError,
          };
          const finalCard = register(step);
          seen.set(ast, finalCard);
          return finalCard;
        }

        const chunks = getExpandedCurryChunks(ast);

        let currentBaseOutput = visit(ast.base);
        let finalCard = currentBaseOutput;

        for (const chunk of chunks) {
          const stepBase = chunk.node.base;
          const argOutputs = chunk.args.map(visit);
          const step = {
            id: `step-${result.length + 1}`,
            title:
              stepBase.type === "Operator"
                ? getOperatorDisplay(stepBase.opName).title
                : virtualOperator.title,
            searchLabel: virtualOperator.searchLabel,
            symbol: virtualOperator.symbol,
            kind: "operator" as const,
            sourceType: chunk.node.type,
            renderPattern:
              stepBase.type === "Operator"
                ? getOperatorDisplay(stepBase.opName).renderPattern
                : virtualOperator.renderPattern,
            inputs: [currentBaseOutput, ...argOutputs],
            output: chunk.node.varName!,
            node: chunk.node,
            tooltipOperatorKey: getCurryTooltipKey(chunk.args.length),
          };

          finalCard = register(step);
          currentBaseOutput = finalCard;
        }

        seen.set(ast, finalCard);
        return finalCard;
      }
      case "Pipe": {
        const virtualOperator = getVirtualOperatorDisplay("pipe");
        return register({
          id: `step-${result.length + 1}`,
          title: virtualOperator.title,
          searchLabel: virtualOperator.searchLabel,
          symbol: virtualOperator.symbol,
          kind: "operator",
          sourceType: ast.type,
          renderPattern: virtualOperator.renderPattern,
          inputs: [visit(ast.op1), visit(ast.op2)],
          output: nextName,
          node: ast,
          tooltipOperatorKey: "OPERATOR_PIPE",
        });
      }
      case "Pipe2": {
        const virtualOperator = getVirtualOperatorDisplay("pipe2");
        return register({
          id: `step-${result.length + 1}`,
          title: virtualOperator.title,
          searchLabel: virtualOperator.searchLabel,
          symbol: virtualOperator.symbol,
          kind: "operator",
          sourceType: ast.type,
          renderPattern: virtualOperator.renderPattern,
          inputs: [visit(ast.op1), visit(ast.op2), visit(ast.op3)],
          output: nextName,
          node: ast,
          tooltipOperatorKey: "OPERATOR_PIPE2",
        });
      }
      case "Flip": {
        const virtualOperator = getVirtualOperatorDisplay("flip");
        return register({
          id: `step-${result.length + 1}`,
          title: virtualOperator.title,
          searchLabel: virtualOperator.searchLabel,
          symbol: virtualOperator.symbol,
          kind: "operator",
          sourceType: ast.type,
          renderPattern: virtualOperator.renderPattern,
          inputs: [visit(ast.arg)],
          output: nextName,
          node: ast,
          tooltipOperatorKey: "OPERATOR_FLIP",
        });
      }
      case "List":
        return register({
          id: `step-${result.length + 1}`,
          title: "List",
          searchLabel: "List",
          symbol: "[]",
          kind: "value",
          sourceType: ast.type,
          inputs: ast.value.map(visit),
          output: nextName,
          node: ast,
        });
      default:
        return register({
          id: `step-${result.length + 1}`,
          title: ast.type,
          searchLabel: getValueTypeSearchLabel(ast.type),
          symbol:
            ast.type === "String"
              ? "S"
              : ast.type === "Boolean"
                ? "T"
                : ast.type === "NBT"
                  ? "{}"
                  : "#",
          kind: "value",
          sourceType: ast.type,
          inputs: [],
          output: nextName,
          detail: primitiveDetail(ast),
          node: ast,
        });
    }
  };

  visit(props.ast);
  return result;
});

const getOperatorValueSignatureTypes = (opName: TypeOperatorKey): string[] => {
  const operatorClass = operatorRegistry[
    opName as keyof typeof operatorRegistry
  ] as unknown as OperatorClassLike | undefined;

  if (!operatorClass) return [];

  const operator = new operatorClass(false);
  const signature = new ParsedSignature(
    operator.getParsedSignature().getAst(),
    false
  );
  const flatSignature = signature.toFlatSignature();

  return flatSignature;
};

const getOperatorValueSignatureLines = (
  opName: TypeOperatorKey
): OperatorSignatureLine[] => {
  const flatSignature = getOperatorValueSignatureTypes(opName);
  if (flatSignature.length === 0) return [];

  return flatSignature.map((typeName, index) => {
    const typeMeta = getValueTypeMeta(typeName);
    return {
      prefix: index === 0 ? "" : "  -> ",
      label: typeMeta.label,
      color:
        typeName === "Any"
          ? "#000000"
          : (LOGIC_PROGRAMMER_TYPE_COLORS[typeName] ?? "#f0f0f0"),
    };
  });
};

const getExpectedInputTooltip = (typeName: string): TooltipData => {
  const typeMeta = getValueTypeMeta(typeName);
  return {
    title: "Expected Input",
    lines: [
      formatTemplate(
        EXPECTED_INPUT_TYPE_TEMPLATE,
        `${typeMeta.colorCode}${typeMeta.label}`
      ),
    ],
  };
};

const getExpectedOutputTooltip = (typeName: string): TooltipData => {
  const typeMeta = getValueTypeMeta(typeName);
  return {
    title: "Expected Output",
    lines: [
      formatTemplate(
        EXPECTED_OUTPUT_TYPE_TEMPLATE,
        `${typeMeta.colorCode}${typeMeta.label}`
      ),
    ],
  };
};

const getInputSlotTooltip = (
  step: VisualStep,
  inputIndex: number
): TooltipData | null => {
  if (step.inputs[inputIndex]) {
    return step.inputs[inputIndex]!.tooltip;
  }

  const expectedType = step.expectedInputTypes?.[inputIndex];
  return expectedType ? getExpectedInputTooltip(expectedType) : null;
};

const getOutputSlotTooltip = (step: VisualStep): TooltipData => {
  if (step.workspaceMode === "pattern" && step.expectedOutputType) {
    return getExpectedOutputTooltip(step.expectedOutputType);
  }

  return step.tooltip;
};

const getPatternBox = (step: VisualStep) => {
  const workspaceX = 88;
  const workspaceY = 18;
  const workspaceWidth = 160;
  const workspaceHeight = 87;

  if (step.workspaceMode === "operatorValue") {
    // If the operator has a render pattern, use it for slots and symbol
    if (step.renderPattern && step.renderPattern !== "NONE") {
      const pattern = LOGIC_PROGRAMMER_RENDER_PATTERNS[step.renderPattern];
      const left = workspaceX + Math.floor((workspaceWidth - pattern.width) / 2);
      const top = workspaceY + Math.floor((workspaceHeight - pattern.height) / 2);

      return {
        slots: pattern.slotPositions.map((slot) => ({
          left: left + slot.left,
          top: top + slot.top,
        })),
        symbol: pattern.symbolPosition
          ? {
              left: left + pattern.symbolPosition.left,
              top: top + pattern.symbolPosition.top,
            }
          : null,
        valueBox: null as { left: number; top: number; width: number } | null,
        canvas: { left, top, width: pattern.width, height: pattern.height },
      };
    }

    // Fallback: no render pattern - show generic NONE_CANVAS
    const pattern = LOGIC_PROGRAMMER_RENDER_PATTERNS.NONE_CANVAS;
    const left = workspaceX + Math.floor((workspaceWidth - pattern.width) / 2);
    const top = workspaceY + Math.floor((workspaceHeight - pattern.height) / 2);

    return {
      slots: [] as { left: number; top: number }[],
      symbol: null,
      valueBox: null as { left: number; top: number; width: number } | null,
      canvas: { left, top, width: pattern.width, height: pattern.height },
    };
  }

  if (isItemStackBackedValueType(step.sourceType)) {
    const pattern = LOGIC_PROGRAMMER_RENDER_PATTERNS.SINGLE_SLOT;
    const left = workspaceX + Math.floor((workspaceWidth - pattern.width) / 2);
    const top = workspaceY + Math.floor((workspaceHeight - pattern.height) / 2);

    return {
      slots: pattern.slotPositions.map((slot) => ({
        left: left + slot.left,
        top: top + slot.top,
      })),
      symbol: null,
      valueBox: null as { left: number; top: number; width: number } | null,
      canvas: { left, top, width: pattern.width, height: pattern.height },
    };
  }

  if (step.renderPattern && step.renderPattern !== "NONE") {
    const pattern = LOGIC_PROGRAMMER_RENDER_PATTERNS[step.renderPattern];
    const left = workspaceX + Math.floor((workspaceWidth - pattern.width) / 2);
    const top = workspaceY + Math.floor((workspaceHeight - pattern.height) / 2);

    return {
      slots: pattern.slotPositions.map((slot) => ({
        left: left + slot.left,
        top: top + slot.top,
      })),
      symbol: pattern.symbolPosition
        ? {
            left: left + pattern.symbolPosition.left,
            top: top + pattern.symbolPosition.top,
          }
        : null,
      valueBox: null as { left: number; top: number; width: number } | null,
      canvas: { left, top, width: pattern.width, height: pattern.height },
    };
  }

  const inputCount = step.inputs.length;
  const slotSize = 18;
  const gap = 8;

  if (inputCount <= 0) {
    const pattern = LOGIC_PROGRAMMER_RENDER_PATTERNS.NONE;
    const left = workspaceX + Math.floor((workspaceWidth - pattern.width) / 2);
    const top = workspaceY + Math.floor((workspaceHeight - pattern.height) / 2);

    return {
      slots: [] as { left: number; top: number }[],
      symbol: null,
      valueBox: { left: left + 14, top: top + 6, width: pattern.width - 28 },
      canvas: { left, top, width: pattern.width, height: pattern.height },
    };
  }

  const totalWidth = inputCount * slotSize + Math.max(0, inputCount - 1) * gap;
  const left = workspaceX + Math.floor((workspaceWidth - totalWidth) / 2);
  const top = workspaceY + Math.floor((workspaceHeight - slotSize) / 2);

  return {
    slots: Array.from({ length: inputCount }, (_, index) => ({
      left: left + index * (slotSize + gap),
      top,
    })),
    symbol: {
      left: workspaceX + Math.floor(workspaceWidth / 2) - 5,
      top: workspaceY + 18,
    },
    valueBox: null,
    canvas: null as {
      left: number;
      top: number;
      width: number;
      height: number;
    } | null,
  };
};

const getCanvasBox = (step: VisualStep) => getPatternBox(step).canvas ?? { left: 0, top: 0, width: 0, height: 0 };
const getSymbolPos = (step: VisualStep) => getPatternBox(step).symbol ?? { left: 0, top: 0 };
const getValueBox = (step: VisualStep) => getPatternBox(step).valueBox;
const getValueBoxLeft = (step: VisualStep) => getValueBox(step)?.left ?? 0;
const getValueBoxTop = (step: VisualStep) => getValueBox(step)?.top ?? 0;
const getValueBoxWidth = (step: VisualStep) => getValueBox(step)?.width ?? 0;

const operatorListEntries = Object.values(operatorRegistry).filter(
  (value): value is OperatorClassLike =>
    typeof value === "function" && value.prototype instanceof BaseOperator
);

const getVisibleListEntries = (step: VisualStep): VisibleListEntry[] => {
  const search = step.searchLabel.trim().toLowerCase();
  const valueTypeEntries = getValueTypeDisplayEntries().filter(
    (entry) => !search || entry.matchString.includes(search)
  );
  const operatorEntries = operatorListEntries
    .filter((operatorClass) => {
      const fullName = new operatorClass(false)
        .getFullDisplayName()
        .toLowerCase();
      const symbol = (operatorClass.symbol ?? "").toLowerCase();
      return fullName.includes(search) || symbol.includes(search);
    })
    .map((operatorClass) => ({
      symbol: operatorClass.symbol ?? "",
      tabKind: "operator" as const,
      matchString: new operatorClass(false).getFullDisplayName().toLowerCase(),
      color:
        LOGIC_PROGRAMMER_TYPE_COLORS[getOperatorOutputType(operatorClass)] ??
        "#f0f0f0",
    }));

  const filtered = [...valueTypeEntries, ...operatorEntries]
    .slice(0, 10)
    .map((entry) => ({
      symbol: entry.symbol,
      tabKind: entry.tabKind,
      color: entry.color,
      active:
        entry.tabKind === "type"
          ? !step.forceOperatorTabActive &&
            entry.symbol ===
              (step.sourceType === "Operator"
                ? "Operator"
                : getValueTypeSearchLabel(step.sourceType))
          : (step.forceOperatorTabActive || step.sourceType !== "Operator") &&
            (entry.symbol === step.symbol || entry.matchString === search),
    }));

  if (filtered.some((entry) => entry.active)) {
    return filtered;
  }

  if (filtered.length > 0) {
    filtered[0]!.active = true;
  }

  return filtered;
};
</script>

<template>
  <section class="logic-programmer-sequence">
    <article
      v-for="(step, index) in steps"
      :key="step.id"
      class="logic-programmer-shot"
    >
      <div
        v-if="props.showStepNumbers !== false || props.showStepTitles !== false"
        class="logic-programmer-meta"
      >
        <div
          v-if="props.showStepNumbers !== false"
          class="logic-programmer-step"
        >
          Step {{ index + 1 }}
        </div>
        <div
          v-if="props.showStepTitles !== false"
          class="logic-programmer-step-title"
        >
          {{ step.output }}
        </div>
      </div>

      <div class="logic-programmer-frame-shell">
        <div class="logic-programmer-frame">
          <div class="logic-programmer-overlay">
            <div class="logic-search-overlay">
              <FitText :text="step.searchLabel" />
            </div>

            <div
              v-for="(entry, entryIndex) in getVisibleListEntries(step)"
              :key="`${step.id}-entry-${entryIndex}`"
              class="logic-element-tab"
              :class="[
                `logic-element-tab-${entry.tabKind}`,
                { 'logic-element-tab-active': entry.active },
              ]"
              :style="{
                top: `${18 + entryIndex * 18}px`,
                ...getEntryStyle(entry),
              }"
            >
              <span
                v-if="entry.active"
                class="logic-element-tab-arrow"
                aria-hidden="true"
              >
                ▶
              </span>
              <FitText
                class="logic-element-tab-symbol"
                :text="entry.symbol"
                align="center"
                :min-scale="0.35"
              />
            </div>

            <div class="logic-clear-button-overlay">Clear</div>

            <template v-if="step.sourceType === 'List'">
              <div class="logic-list-nav-btn logic-list-nav-prev">◀</div>
              <div class="logic-list-search">
                <FitText
                  :text="step.inputs.length > 0 ? step.inputs[0]!.type : 'Any'"
                  align="left"
                />
              </div>
              <div class="logic-list-nav-btn logic-list-nav-next">▶</div>
              <div class="logic-list-add-btn">+</div>

              <div
                v-if="step.inputs.length > 0"
                class="logic-list-editor"
              >
                <div
                  class="logic-list-editor-prev"
                  :class="{ 'logic-list-editor-btn-disabled': step.inputs.length <= 1 }"
                >
                  ◀
                </div>
                <div class="logic-list-editor-pos">
                  1 / {{ step.inputs.length }}
                </div>
                <div
                  class="logic-list-editor-next"
                  :class="{ 'logic-list-editor-btn-disabled': step.inputs.length <= 1 }"
                >
                  ▶
                </div>

                <!-- Operator type: show operator dropdown + signature -->
                <template v-if="(step.node as any).value[0]?.type === 'Operator'">
                  <div class="logic-list-editor-op-canvas" />
                  <div class="logic-list-editor-op-field">
                    <FitText
                      :text="getOperatorDisplay((step.node as any).value[0].opName).title"
                      align="left"
                      :min-scale="0.6"
                    />
                  </div>
                  <div
                    v-for="(line, lineIndex) in getOperatorValueSignatureLines(
                      (step.node as any).value[0].opName
                    )"
                    :key="`list-op-sig-${lineIndex}`"
                    class="logic-list-editor-sig-line"
                    :style="{
                      top: `${44 + lineIndex * 9}px`,
                    }"
                  >
                    <span style="color: #000">{{ line.prefix }}</span>
                    <span :style="{ color: line.color }">
                      {{ line.label }}
                    </span>
                  </div>
                </template>

                <!-- Item/Block/Fluid: show slot + placeholder -->
                <template v-else-if="isItemStackBackedValueType(step.inputs[0]!.type)">
                  <div class="logic-list-editor-item-label">
                    {{ getItemStackPlaceholder(step.inputs[0]!.type) }}
                  </div>
                  <div class="logic-list-editor-item-arrow" />
                  <div
                    class="logic-slot-overlay"
                    :style="{
                      left: `${80}px`,
                      top: `${50}px`,
                    }"
                  >
                    <div
                      class="logic-slot-card-composite"
                      :style="{
                        backgroundImage: `url('${publicAsset(`valuetype/${getValueTypeTextureName(step.inputs[0]!.type)}.png`)}'), url('${publicAsset('item/variable.png')}')`,
                      }"
                    />
                  </div>
                </template>

                <!-- Primitive value types: show value box -->
                <template v-else>
                  <div class="logic-list-editor-value-box">
                    <FitText
                      :text="getCompactValueTextForAst(
                        (step.node as any).value[0]
                      )"
                      align="left"
                      :min-scale="0.5"
                    />
                  </div>
                </template>

                <div class="logic-list-editor-minus">−</div>
              </div>
            </template>

            <template v-else-if="step.workspaceMode === 'operatorValue'">
              <div
                class="logic-operator-canvas"
                :style="{
                  left: `${getCanvasBox(step).left}px`,
                  top: `${getCanvasBox(step).top}px`,
                  width: `${getCanvasBox(step).width}px`,
                  height: `${getCanvasBox(step).height}px`,
                }"
              />

              <!-- When operator has a render pattern, show its slots and symbol -->
              <template v-if="getPatternBox(step).slots.length > 0">
                <div
                  v-for="(slot, inputIndex) in getPatternBox(step).slots"
                  :key="`${step.id}-op-slot-${inputIndex}`"
                  class="logic-slot-overlay"
                  :class="{
                    'logic-card-overlay-has-tooltip': !!getInputSlotTooltip(
                      step,
                      inputIndex
                    ),
                  }"
                  :style="{ left: `${slot.left}px`, top: `${slot.top}px` }"
                >
                  <HoverMinecraftTooltip
                    v-if="getInputSlotTooltip(step, inputIndex)"
                    :title="getInputSlotTooltip(step, inputIndex)!.title"
                    :lines="getInputSlotTooltip(step, inputIndex)!.lines"
                  >
                    <div
                      v-if="step.inputs[inputIndex]"
                      class="logic-slot-card-composite"
                      :style="{
                        backgroundImage: `url('${publicAsset(`valuetype/${getValueTypeTextureName(step.inputs[inputIndex]?.type ?? 'Null')}.png`)}'), url('${publicAsset('item/variable.png')}')`,
                      }"
                    />
                  </HoverMinecraftTooltip>
                </div>

                <div
                  v-if="getPatternBox(step).symbol"
                  class="logic-symbol-overlay"
                  :class="{ 'logic-symbol-overlay-text': step.symbol.length > 2 }"
                  :style="{
                    left: `${getSymbolPos(step).left}px`,
                    top: `${getSymbolPos(step).top}px`,
                  }"
                >
                  {{ step.symbol }}
                </div>
              </template>

              <!-- No render pattern: show generic dropdown + signature -->
              <template v-else>
                <div
                  class="logic-operator-dropdown-field"
                  :style="{
                    left: `${getCanvasBox(step).left + 14}px`,
                    top: `${getCanvasBox(step).top + 6}px`,
                    width: `${getCanvasBox(step).width - 28}px`,
                  }"
                >
                  <FitText
                    :text="step.panelLabel ?? step.title"
                    :min-scale="0.7"
                  />
                </div>

                <div
                  v-for="(line, lineIndex) in getOperatorValueSignatureLines(
                    step.detail as TypeOperatorKey
                  )"
                  :key="`${step.id}-signature-${lineIndex}`"
                  class="logic-operator-signature-line"
                  :style="{
                    left: `${getCanvasBox(step).left + 10}px`,
                    top: `${getCanvasBox(step).top + 25 + lineIndex * 9}px`,
                  }"
                >
                  <span
                    class="logic-operator-signature-prefix"
                    :style="{ color: '#000000' }"
                  >
                    {{ line.prefix }}
                  </span>
                  <span :style="{ color: line.color }">
                    {{ line.label }}
                  </span>
                </div>
              </template>
            </template>

            <template v-else-if="getValueBox(step)">
              <div
                v-if="getPatternBox(step).canvas"
                class="logic-operator-canvas"
                :style="{
                  left: `${getCanvasBox(step).left}px`,
                  top: `${getCanvasBox(step).top}px`,
                  width: `${getCanvasBox(step).width}px`,
                  height: `${getCanvasBox(step).height}px`,
                }"
              />
              <div
                class="logic-value-box"
                :style="{
                  left: `${getValueBoxLeft(step)}px`,
                  top: `${getValueBoxTop(step)}px`,
                  width: `${getValueBoxWidth(step)}px`,
                }"
              >
                <FitText
                  :text="step.detail ?? step.title"
                  align="left"
                  :min-scale="0.4"
                />
              </div>
            </template>

            <template v-else>
              <div
                v-if="getPatternBox(step).canvas"
                class="logic-operator-canvas"
                :style="{
                  left: `${getCanvasBox(step).left}px`,
                  top: `${getCanvasBox(step).top}px`,
                  width: `${getCanvasBox(step).width}px`,
                  height: `${getCanvasBox(step).height}px`,
                }"
              />
              <template v-if="isItemStackBackedValueType(step.sourceType)">
                <div
                  class="logic-item-placeholder-label"
                  :style="{
                    left: `${getCanvasBox(step).left - 64}px`,
                    top: `${getCanvasBox(step).top + 3}px`,
                  }"
                >
                  {{ getItemStackPlaceholder(step.sourceType) }}
                </div>
                <div
                  class="logic-item-placeholder-arrow"
                  :style="{
                    left: `${getCanvasBox(step).left - 15}px`,
                    top: `${getCanvasBox(step).top + 6}px`,
                  }"
                />
              </template>
              <div
                v-for="(slot, inputIndex) in getPatternBox(step).slots"
                :key="`${step.id}-slot-${inputIndex}`"
                class="logic-slot-overlay"
                :class="{
                  'logic-card-overlay-has-tooltip': !!getInputSlotTooltip(
                    step,
                    inputIndex
                  ),
                }"
                :style="{ left: `${slot.left}px`, top: `${slot.top}px` }"
              >
                <HoverMinecraftTooltip
                  v-if="getInputSlotTooltip(step, inputIndex)"
                  :title="getInputSlotTooltip(step, inputIndex)!.title"
                  :lines="getInputSlotTooltip(step, inputIndex)!.lines"
                >
                  <div
                    v-if="step.inputs[inputIndex]"
                    class="logic-slot-card-composite"
                    :style="{
                      backgroundImage: `url('${publicAsset(`valuetype/${getValueTypeTextureName(step.inputs[inputIndex]?.type ?? 'Null')}.png`)}'), url('${publicAsset('item/variable.png')}')`,
                    }"
                  />
                </HoverMinecraftTooltip>
              </div>                <div
                  v-if="getPatternBox(step).symbol"
                  class="logic-symbol-overlay"
                  :class="{ 'logic-symbol-overlay-text': step.symbol.length > 2 }"
                  :style="{
                    left: `${getSymbolPos(step).left}px`,
                    top: `${getSymbolPos(step).top}px`,
                  }"
                >
                  {{ step.symbol }}
              </div>
            </template>

            <div class="logic-write-arrow" />

            <div class="logic-label-field">
              <FitText :text="step.output" />
            </div>

            <div class="logic-label-ok-icon" aria-hidden="true" />

            <div class="logic-labeller-badge">E</div>

            <div class="logic-write-card logic-card-overlay-has-tooltip">
              <HoverMinecraftTooltip
                :title="getOutputSlotTooltip(step).title"
                :lines="getOutputSlotTooltip(step).lines"
              >
                <div
                  v-if="step.workspaceMode !== 'pattern'"
                  class="logic-write-card-composite"
                  :style="{
                    backgroundImage: `url('${publicAsset(`valuetype/${getValueTypeTextureName(getOutputTextureName(step))}.png`)}'), url('${publicAsset('item/variable.png')}')`,
                  }"
                />
              </HoverMinecraftTooltip>
            </div>
          </div>
        </div>
      </div>

      <DisplayPanelViewHolder>
        <DisplayPanelView
          :text="getDisplayPanelText(step)"
          :text-color="getDisplayPanelColor(step)"
          :align="getDisplayPanelAlign(step)"
          :type-name="step.sourceType"
          :type-error="step.typeError"
        />
        <DisplayPanelView
          :text="getDisplayPanelText(step)"
          :text-color="getDisplayPanelColor(step)"
          :align="getDisplayPanelAlign(step)"
          :type-name="step.sourceType"
          :type-error="step.typeError"
        />
      </DisplayPanelViewHolder>
    </article>
  </section>
</template>
