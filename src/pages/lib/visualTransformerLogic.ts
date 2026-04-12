import { operatorRegistry } from "lib";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { ASTtoOperator } from "lib/transformers/Operator";
import {
  BaseOperator,
  type LogicProgrammerRenderPatternKey,
} from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import {
  getExpandedVarName,
  resetExpandedVarCounter,
} from "lib/transformers/Expanded";
import { flattenAnonymousBaseOperatorApplication } from "lib/transformers/helpers";
import { LOGIC_PROGRAMMER_RENDER_PATTERNS } from "pages-lib/logicProgrammerRenderPatterns";
import {
  getValueTypeMeta,
  getValueTypeMetaForAst,
  getOperatorOutputType,
  getStepActualOutputType,
  LOGIC_PROGRAMMER_TYPE_COLORS,
  LOGIC_PROGRAMMER_DATA_TYPE_TABS,
} from "pages-lib/visualTransformer";

type TypeOperatorKey = globalThis.TypeOperatorKey;

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

export type VisualStep = {
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
};

export type VisualCardRef = {
  name: string;
  type: TypeAST.AST["type"];
  variableId: number;
  tooltip: TooltipData;
};

export type VisibleListEntry = {
  symbol: string;
  matchString?: string;
  active: boolean;
  tabKind: "type" | "operator";
  color: string;
};

export type TooltipData = {
  title: string;
  lines: string[];
};

export type PatternBox = {
  slots: { left: number; top: number }[];
  symbol: { left: number; top: number } | null;
  valueBox: { left: number; top: number; width: number } | null;
  canvas: { left: number; top: number; width: number; height: number } | null;
};

const VARIABLE_CARD_NAME = "Variable Card";
const VARIABLE_CARD_ID_TEMPLATE = "§e§oVariable ID: §r§o%s";
const VALUE_TYPE_NAME_TEMPLATE = "§eType: §r%s";
const VALUE_TEMPLATE = "§e§oValue: §r%s";
const OPERATOR_SIGNATURE_TEMPLATE = "§eSignature: §r%s";
const EXPECTED_INPUT_TYPE_TEMPLATE = "§eExpected Type: %s";
const EXPECTED_OUTPUT_TYPE_TEMPLATE = "§eExpected Output: %s";

export const getOperatorClass = (
  opName: TypeOperatorKey
): OperatorClassLike | undefined => {
  return operatorRegistry[
    opName as keyof typeof operatorRegistry
  ] as unknown as OperatorClassLike | undefined;
};

export const getOperatorDisplay = (opName: TypeOperatorKey) => {
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

export const getVirtualOperatorDisplay = (
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

export type OperatorTooltipMeta = {
  displayName: string;
  categoryName: string;
  symbol: string;
  inputTypes: string[];
  outputType: string;
  tooltipInfo: string | undefined;
  fullName: string;
};

export const getOperatorTooltipMeta = (
  opName: TypeOperatorKey
): OperatorTooltipMeta => {
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

export const getValueTypeSearchLabel = (type: TypeAST.AST["type"]): string => {
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

export const getValueTypeDisplayEntries = () =>
  LOGIC_PROGRAMMER_DATA_TYPE_TABS.map((tab) => ({
    symbol: tab,
    matchString: tab.toLowerCase(),
    tabKind: "type" as const,
    color: LOGIC_PROGRAMMER_TYPE_COLORS[tab] ?? "#f0f0f0",
  }));

export const getEntryStyle = (entry: VisibleListEntry) => {
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

  const { r, g, b } = hexToRgb(entry.color);
  const sr = smoothChannel(r, entry.active);
  const sg = smoothChannel(g, entry.active);
  const sb = smoothChannel(b, entry.active);

  return {
    backgroundColor: `rgba(${sr}, ${sg}, ${sb}, ${entry.active ? 0.45 : 0.28})`,
  };
};

export const getCardName = (ast: TypeAST.AST): string => {
  return ast.varName || getExpandedVarName(ast);
};

export const getCompactValueTextForAst = (ast: TypeAST.AST): string => {
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

  return JSON.stringify(ast);
};

export const getOperatorValueSignatureText = (
  opName: TypeOperatorKey
): string => {
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

export const getDisplayPanelText = (
  step: Pick<VisualStep, "output" | "node">
): string => {
  if (step.node) {
    try {
      const op = ASTtoOperator(step.node) as any;
      const name = op.getFullDisplayName();
      const signature = new ParsedSignature(
        op.getParsedSignature().getAst(),
        false
      ).toFlatSignature();
      const indent = "\u00A0";
      const sigLines = signature
        .map((type, i) => (i === 0 ? type : `${indent}-> ${type}`))
        .join("\n");
      return `${name} ::\n${sigLines}`;
    } catch {
      return step.output;
    }
  }
  return step.output;
};

const TOP_ALIGNED_TYPES = new Set([
  "Operator",
  "Pipe",
  "Integer",
  "Double",
  "Number",
]);

export const getCurryTooltipKey = (argCount: number): TypeOperatorKey => {
  switch (argCount) {
    case 0:
      return "OPERATOR_APPLY_0" as TypeOperatorKey;
    case 1:
      return "OPERATOR_APPLY" as TypeOperatorKey;
    case 2:
      return "OPERATOR_APPLY_2" as TypeOperatorKey;
    case 3:
      return "OPERATOR_APPLY_3" as TypeOperatorKey;
    default:
      return "OPERATOR_APPLY_N" as TypeOperatorKey;
  }
};

export const getDisplayPanelAlignment = (sourceType: string): string => {
  return TOP_ALIGNED_TYPES.has(sourceType) ? "left" : "center";
};

export const getCardTitle = (name: string): string => {
  const trimmed = name.trim();
  return trimmed ? `§o${trimmed}` : VARIABLE_CARD_NAME;
};

const formatTemplate = (template: string, ...values: string[]): string => {
  let currentIndex = 0;
  return template.replace(/%s/g, () => values[currentIndex++] ?? "");
};

export const getBaseTooltipLines = (variableId: number): string[] => {
  return [formatTemplate(VARIABLE_CARD_ID_TEMPLATE, `${variableId}`)];
};

export const buildValueCardTooltip = (
  step: Pick<VisualStep, "output" | "sourceType" | "detail" | "node">,
  variableId: number
): TooltipData => {
  const typeMeta = getValueTypeMetaForAst(step.sourceType);
  const lines = [
    formatTemplate(
      VALUE_TYPE_NAME_TEMPLATE,
      `${typeMeta.colorCode}${typeMeta.label}`
    ),
  ];

  if (step.sourceType === "Operator" && step.detail) {
    lines.push(
      formatTemplate(
        OPERATOR_SIGNATURE_TEMPLATE,
        getOperatorValueSignatureText(step.detail as TypeOperatorKey)
      )
    );
  }

  lines.push(
    formatTemplate(
      VALUE_TEMPLATE,
      getCompactValueTextForAst(
        step.node ?? ({ type: step.sourceType } as TypeAST.AST)
      )
    )
  );
  lines.push(...getBaseTooltipLines(variableId));

  return {
    title: getCardTitle(step.output),
    lines,
  };
};

export const buildOperatorCardTooltip = (
  step: Pick<VisualStep, "output" | "inputs" | "tooltipOperatorKey">,
  variableId: number
): TooltipData => {
  const operatorKey = step.tooltipOperatorKey;
  if (!operatorKey) {
    return {
      title: getCardTitle(step.output),
      lines: getBaseTooltipLines(variableId),
    };
  }

  const operatorMeta = getOperatorTooltipMeta(operatorKey);
  const lines = [
    `§eOperator: §r${operatorMeta.displayName} (${operatorMeta.symbol})`,
    `§eCategory: §r${operatorMeta.categoryName}`,
    ...operatorMeta.inputTypes.map((inputType, index) => {
      const inputMeta = getValueTypeMeta(inputType);
      return `§eInput Type ${index + 1}: §r${inputMeta.colorCode}${inputMeta.label}`;
    }),
    `§eOutput Type: §r${
      operatorMeta.outputType === "Any"
        ? "§0"
        : getValueTypeMeta(operatorMeta.outputType).colorCode
    }${getValueTypeMeta(operatorMeta.outputType).label}`,
    formatTemplate(
      "§eVariable IDs: §r§o{%s}",
      step.inputs.map((input) => `${input.name}:${input.variableId}`).join(",")
    ),
    ...getBaseTooltipLines(variableId),
  ];

  return {
    title: getCardTitle(step.output),
    lines,
  };
};

export const buildStepTooltip = (
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
    return buildOperatorCardTooltip(step as any, variableId);
  }

  return buildValueCardTooltip(step as any, variableId);
};

export const getExpectedInputTooltip = (typeName: string): TooltipData => {
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

export const getExpectedOutputTooltip = (typeName: string): TooltipData => {
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

export const getInputSlotTooltip = (
  step: VisualStep,
  inputIndex: number
): TooltipData | null => {
  if (step.inputs[inputIndex]) {
    return step.inputs[inputIndex]!.tooltip;
  }

  const expectedType = step.expectedInputTypes?.[inputIndex];
  return expectedType ? getExpectedInputTooltip(expectedType) : null;
};

export const getOutputSlotTooltip = (step: VisualStep): TooltipData => {
  if (step.workspaceMode === "pattern" && step.expectedOutputType) {
    return getExpectedOutputTooltip(step.expectedOutputType);
  }

  return step.tooltip;
};

export const isItemStackBackedValueType = (type: TypeAST.AST["type"]) =>
  type === "Item" || type === "Block" || type === "Fluid";

export const getItemStackPlaceholder = (type: TypeAST.AST["type"]) =>
  `${type} here`;

export const getPatternBox = (step: VisualStep): PatternBox => {
  const workspaceX = 88;
  const workspaceY = 18;
  const workspaceWidth = 160;
  const workspaceHeight = 87;

  if (step.workspaceMode === "operatorValue") {
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

const operatorListEntries = Object.values(operatorRegistry).filter(
  (value): value is OperatorClassLike =>
    typeof value === "function" && value.prototype instanceof BaseOperator
);

export const getVisibleListEntries = (step: VisualStep): VisibleListEntry[] => {
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

export const getOperatorValueSignatureTypes = (
  opName: TypeOperatorKey
): string[] => {
  const operatorClass = getOperatorClass(opName);
  if (!operatorClass) return [];

  const operator = new operatorClass(false);
  const signature = new ParsedSignature(
    operator.getParsedSignature().getAst(),
    false
  );
  const flatSignature = signature.toFlatSignature();

  return flatSignature;
};

export const getOutputTextureName = (
  step: Pick<VisualStep, "sourceType" | "detail" | "tooltipOperatorKey">
): TypeAST.AST["type"] => {
  return getStepActualOutputType(step) as TypeAST.AST["type"];
};

export const generateVisualSteps = (
  ast: TypeAST.AST,
  startVariableId: number,
  operatorPreviewMode?: "value" | "pattern"
): VisualStep[] => {
  resetExpandedVarCounter();

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
      getOperatorClass(ast.base.opName)?.internalName ===
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

  if (operatorPreviewMode === "pattern" && ast.type === "Operator") {
    const operator = getOperatorDisplay(ast.opName);
    const operatorMeta = getOperatorTooltipMeta(ast.opName);
    const signatureTypes = getOperatorValueSignatureTypes(ast.opName);
    const variableId = startVariableId;
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
      output: getCardName(ast),
      detail: ast.opName,
      node: ast,
      tooltipOperatorKey: ast.opName,
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

    const nextName = getCardName(ast);
    const register = (
      step: Omit<VisualStep, "variableId" | "tooltip">
    ): VisualCardRef => {
      const variableId = startVariableId + result.length;
      const tooltip = buildStepTooltip(step, variableId);
      const fullStep = {
        ...step,
        variableId,
        tooltip,
      };
      result.push(fullStep);
      const card = {
        name: fullStep.output,
        type: fullStep.sourceType,
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
          const step = {
            id: `step-${result.length + 1}`,
            title: getOperatorDisplay(flattened.operator.opName).title,
            searchLabel: getOperatorDisplay(flattened.operator.opName)
              .searchLabel,
            symbol: getOperatorDisplay(flattened.operator.opName).symbol,
            kind: "operator" as const,
            sourceType: ast.type,
            renderPattern: virtualOperator.renderPattern,
            inputs: argOutputs,
            output: finalVarName,
            node: ast,
            tooltipOperatorKey: getCurryTooltipKey(flattened.args.length),
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
            searchLabel:
              stepBase.type === "Operator"
                ? getOperatorDisplay(stepBase.opName).searchLabel
                : virtualOperator.searchLabel,
            symbol: virtualOperator.symbol,
            kind: "operator" as const,
            sourceType: chunk.node.type,
            renderPattern: virtualOperator.renderPattern,
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

  visit(ast);
  return result;
};
