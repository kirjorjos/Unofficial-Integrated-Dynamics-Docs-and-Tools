<script setup lang="ts">
import { computed } from "vue";
import FitText from "./FitText.vue";
import { operatorRegistry } from "lib";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import {
  BaseOperator,
  type LogicProgrammerRenderPatternKey,
} from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { LOGIC_PROGRAMMER_RENDER_PATTERNS } from "./logicProgrammerRenderPatterns";

type OperatorClassLike = {
  new (normalizeSignature?: boolean): BaseOperator<any, any>;
  operatorName?: string;
  interactName?: string;
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
};

type VisualCardRef = {
  name: string;
  type: TypeAST.AST["type"];
};

type VisibleListEntry = {
  symbol: string;
  active: boolean;
  tabKind: "type" | "operator";
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
}>();

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const getOperatorDisplay = (opName: TypeOperatorKey) => {
  const operatorClass = operatorRegistry[
    opName as keyof typeof operatorRegistry
  ] as unknown as OperatorClassLike | undefined;

  return {
    title: operatorClass?.interactName ?? opName,
    searchLabel: operatorClass?.operatorName ?? "Filter",
    panelLabel: operatorClass
      ? new operatorClass(false).getFullDisplayName()
      : opName,
    symbol: operatorClass?.symbol ?? opName,
    renderPattern: operatorClass?.renderPattern ?? "NONE",
  };
};

const getVirtualOperatorDisplay = (
  key: "apply" | "pipe" | "pipe2" | "flip"
) => {
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
      title: key[0]!.toUpperCase() + key.slice(1),
      searchLabel: key,
      symbol: key,
      renderPattern: "NONE" as const,
    };
  }

  return {
    title: operatorClass.interactName ?? key,
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
  const outputType = new operatorClass(false)
    .getParsedSignature()
    .getOutput(-1)
    .getRootType();
  return outputType;
};

const getCardName = (ast: TypeAST.AST, fallbackIndex: number): string => {
  if (ast.varName) return ast.varName;

  switch (ast.type) {
    case "Operator":
      return getOperatorDisplay(ast.opName).title;
    case "Variable":
      return ast.name;
    case "String":
      return `"${ast.value}"`;
    case "Boolean":
      return String(ast.value);
    case "Integer":
    case "Long":
    case "Double":
      return ast.value;
    case "Null":
      return "null";
    case "List":
      return `list${fallbackIndex}`;
    case "Pipe":
      return `pipe${fallbackIndex}`;
    case "Pipe2":
      return `pipe2_${fallbackIndex}`;
    case "Flip":
      return `flip${fallbackIndex}`;
    case "Curry":
      return `card${fallbackIndex}`;
    default:
      return `${ast.type.toLowerCase()}${fallbackIndex}`;
  }
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

const steps = computed<VisualStep[]>(() => {
  const result: VisualStep[] = [];
  const seen = new Map<TypeAST.AST, VisualCardRef>();
  let counter = 0;

  const visit = (ast: TypeAST.AST): VisualCardRef => {
    if (seen.has(ast)) return seen.get(ast)!;

    const nextName = getCardName(ast, ++counter);
    const register = (step: VisualStep): VisualCardRef => {
      result.push(step);
      const card = { name: step.output, type: step.sourceType };
      seen.set(ast, card);
      return card;
    };

    switch (ast.type) {
      case "Operator": {
        const operator = getOperatorDisplay(ast.opName);
        return register({
          id: `step-${counter}`,
          title: operator.title,
          searchLabel: "Operator",
          panelLabel: operator.panelLabel,
          symbol: operator.symbol,
          kind: "operator",
          sourceType: ast.type,
          inputs: [],
          output: nextName,
          detail: ast.opName,
        });
      }
      case "Curry": {
        const baseOutput = visit(ast.base);
        const argOutputs = ast.args.map(visit);
        const virtualOperator = getVirtualOperatorDisplay("apply");
        return register({
          id: `step-${counter}`,
          title:
            ast.base.type === "Operator"
              ? getOperatorDisplay(ast.base.opName).title
              : virtualOperator.title,
          searchLabel:
            ast.base.type === "Operator"
              ? getOperatorDisplay(ast.base.opName).searchLabel
              : virtualOperator.searchLabel,
          symbol: virtualOperator.symbol,
          kind: "operator",
          sourceType: ast.type,
          renderPattern: virtualOperator.renderPattern,
          inputs: [baseOutput, ...argOutputs],
          output: nextName,
        });
      }
      case "Pipe": {
        const virtualOperator = getVirtualOperatorDisplay("pipe");
        return register({
          id: `step-${counter}`,
          title: virtualOperator.title,
          searchLabel: virtualOperator.searchLabel,
          symbol: virtualOperator.symbol,
          kind: "operator",
          sourceType: ast.type,
          renderPattern: virtualOperator.renderPattern,
          inputs: [visit(ast.op1), visit(ast.op2)],
          output: nextName,
        });
      }
      case "Pipe2": {
        const virtualOperator = getVirtualOperatorDisplay("pipe2");
        return register({
          id: `step-${counter}`,
          title: virtualOperator.title,
          searchLabel: virtualOperator.searchLabel,
          symbol: virtualOperator.symbol,
          kind: "operator",
          sourceType: ast.type,
          renderPattern: virtualOperator.renderPattern,
          inputs: [visit(ast.op1), visit(ast.op2), visit(ast.op3)],
          output: nextName,
        });
      }
      case "Flip": {
        const virtualOperator = getVirtualOperatorDisplay("flip");
        return register({
          id: `step-${counter}`,
          title: virtualOperator.title,
          searchLabel: virtualOperator.searchLabel,
          symbol: virtualOperator.symbol,
          kind: "operator",
          sourceType: ast.type,
          renderPattern: virtualOperator.renderPattern,
          inputs: [visit(ast.arg)],
          output: nextName,
        });
      }
      case "List":
        return register({
          id: `step-${counter}`,
          title: "List",
          searchLabel: "List",
          symbol: "[]",
          kind: "value",
          sourceType: ast.type,
          inputs: ast.value.map(visit),
          output: nextName,
        });
      default:
        return register({
          id: `step-${counter}`,
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
        });
    }
  };

  visit(props.ast);
  return result;
});

const getOperatorValueSignatureLines = (opName: TypeOperatorKey): string[] => {
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

  if (flatSignature.length === 0) return [];

  return flatSignature.map((typeName, index) =>
    index === 0 ? typeName : `  -> ${typeName}`
  );
};

const getPatternBox = (step: VisualStep) => {
  const workspaceX = 88;
  const workspaceY = 18;
  const workspaceWidth = 160;
  const workspaceHeight = 87;

  if (step.sourceType === "Operator") {
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
          ? entry.symbol ===
            (step.sourceType === "Operator"
              ? "Operator"
              : getValueTypeSearchLabel(step.sourceType))
          : step.sourceType !== "Operator" &&
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
      <div class="logic-programmer-meta">
        <div class="logic-programmer-step">Step {{ index + 1 }}</div>
        <div class="logic-programmer-step-title">{{ step.output }}</div>
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

            <template v-if="step.sourceType === 'Operator'">
              <div
                class="logic-operator-canvas"
                :style="{
                  left: `${getPatternBox(step).canvas!.left}px`,
                  top: `${getPatternBox(step).canvas!.top}px`,
                  width: `${getPatternBox(step).canvas!.width}px`,
                  height: `${getPatternBox(step).canvas!.height}px`,
                }"
              />

              <div
                class="logic-operator-dropdown-field"
                :style="{
                  left: `${getPatternBox(step).canvas!.left + 14}px`,
                  top: `${getPatternBox(step).canvas!.top + 6}px`,
                  width: `${getPatternBox(step).canvas!.width - 28}px`,
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
                  left: `${getPatternBox(step).canvas!.left + 10}px`,
                  top: `${getPatternBox(step).canvas!.top + 25 + lineIndex * 9}px`,
                }"
              >
                {{ line }}
              </div>
            </template>

            <template v-if="getValueBox(step)">
              <div
                v-if="getPatternBox(step).canvas"
                class="logic-operator-canvas"
                :style="{
                  left: `${getPatternBox(step).canvas!.left}px`,
                  top: `${getPatternBox(step).canvas!.top}px`,
                  width: `${getPatternBox(step).canvas!.width}px`,
                  height: `${getPatternBox(step).canvas!.height}px`,
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

            <template v-else-if="step.sourceType !== 'Operator'">
              <div
                v-if="getPatternBox(step).canvas"
                class="logic-operator-canvas"
                :style="{
                  left: `${getPatternBox(step).canvas!.left}px`,
                  top: `${getPatternBox(step).canvas!.top}px`,
                  width: `${getPatternBox(step).canvas!.width}px`,
                  height: `${getPatternBox(step).canvas!.height}px`,
                }"
              />
              <template v-if="isItemStackBackedValueType(step.sourceType)">
                <div
                  class="logic-item-placeholder-label"
                  :style="{
                    left: `${getPatternBox(step).canvas!.left - 64}px`,
                    top: `${getPatternBox(step).canvas!.top + 3}px`,
                  }"
                >
                  {{ getItemStackPlaceholder(step.sourceType) }}
                </div>
                <div
                  class="logic-item-placeholder-arrow"
                  :style="{
                    left: `${getPatternBox(step).canvas!.left - 15}px`,
                    top: `${getPatternBox(step).canvas!.top + 6}px`,
                  }"
                />
              </template>
              <div
                v-for="(slot, inputIndex) in getPatternBox(step).slots"
                :key="`${step.id}-slot-${inputIndex}`"
                class="logic-slot-overlay"
                :class="{
                  'logic-slot-overlay-has-tooltip':
                    !!step.inputs[inputIndex]?.name,
                }"
                :style="{ left: `${slot.left}px`, top: `${slot.top}px` }"
              >
                <div
                  v-if="step.inputs[inputIndex]"
                  class="logic-slot-card-composite"
                  :style="{
                    backgroundImage: `url('${publicAsset(`valuetype/${getValueTypeTextureName(step.inputs[inputIndex]?.type ?? 'Null')}.png`)}'), url('${publicAsset('item/variable.png')}')`,
                  }"
                />
                <div
                  v-if="step.inputs[inputIndex]?.name"
                  class="logic-slot-tooltip"
                >
                  {{ step.inputs[inputIndex]!.name }}
                </div>
              </div>
              <div
                v-if="getPatternBox(step).symbol"
                class="logic-symbol-overlay"
                :class="{ 'logic-symbol-overlay-text': step.symbol.length > 2 }"
                :style="{
                  left: `${getPatternBox(step).symbol!.left}px`,
                  top: `${getPatternBox(step).symbol!.top}px`,
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

            <div class="logic-write-card">
              <div
                class="logic-write-card-composite"
                :style="{
                  backgroundImage: `url('${publicAsset(`valuetype/${getValueTypeTextureName(step.sourceType)}.png`)}'), url('${publicAsset('item/variable.png')}')`,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
