<script setup lang="ts">
import { computed } from "vue";
import FitText from "./FitText.vue";
import HoverMinecraftTooltip from "./HoverMinecraftTooltip.vue";
import {
  getVisibleListEntries,
  getEntryStyle,
  getPatternBox,
  getInputSlotTooltip,
  getOutputSlotTooltip,
  isItemStackBackedValueType,
  getItemStackPlaceholder,
  getOutputTextureName,
} from "pages-lib/visualTransformerLogic";
import { getOperatorValueSignatureLines } from "pages-lib/visualTransformer";
import type { OperatorSignatureLine } from "pages-lib/visualTransformer";
import { publicAsset } from "pages-lib/visualTransformerHelpers";
import type { LogicProgrammerRenderPatternKey } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

type VisualStep = {
  id: string;
  title: string;
  searchLabel: string;
  panelLabel?: string;
  symbol: string;
  kind: "operator" | "value";
  sourceType: globalThis.TypeAST.AST["type"];
  renderPattern?: LogicProgrammerRenderPatternKey;
  inputs: {
    name: string;
    type: globalThis.TypeAST.AST["type"];
    variableId: number;
    tooltip: { title: string; lines: string[] };
  }[];
  output: string;
  detail?: string;
  node: globalThis.TypeAST.AST;
  variableId: number;
  tooltip: { title: string; lines: string[] };
  tooltipOperatorKey?: globalThis.TypeOperatorKey;
  expectedInputTypes?: string[];
  expectedOutputType?: string;
  forceOperatorTabActive?: boolean;
  workspaceMode?: "operatorValue" | "pattern";
};

const props = defineProps<{
  step: VisualStep;
}>();

const getTextureName = (type: string): string => {
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
    default:
      return "object";
  }
};

const patternBox = computed(() => getPatternBox(props.step));

const visibleEntries = computed(() => getVisibleListEntries(props.step));

const signatureLines = computed((): OperatorSignatureLine[] => {
  if (props.step.detail) {
    return getOperatorValueSignatureLines(
      props.step.detail as globalThis.TypeOperatorKey
    );
  }
  return [];
});

const outputTextureName = computed(() => getOutputTextureName(props.step));

const outputTooltip = computed(() => getOutputSlotTooltip(props.step));
</script>

<template>
  <div class="logic-programmer-frame">
    <div class="logic-programmer-overlay">
      <div class="logic-search-overlay">
        <FitText :text="step.searchLabel" />
      </div>

      <div
        v-for="(entry, entryIndex) in visibleEntries"
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

      <template v-if="step.workspaceMode === 'operatorValue'">
        <div
          class="logic-operator-canvas"
          :style="{
            left: `${patternBox.canvas!.left}px`,
            top: `${patternBox.canvas!.top}px`,
            width: `${patternBox.canvas!.width}px`,
            height: `${patternBox.canvas!.height}px`,
          }"
        />

        <div
          class="logic-operator-dropdown-field"
          :style="{
            left: `${patternBox.canvas!.left + 14}px`,
            top: `${patternBox.canvas!.top + 6}px`,
            width: `${patternBox.canvas!.width - 28}px`,
          }"
        >
          <FitText :text="step.panelLabel ?? step.title" :min-scale="0.7" />
        </div>

        <div
          v-for="(line, lineIndex) in signatureLines"
          :key="`${step.id}-signature-${lineIndex}`"
          class="logic-operator-signature-line"
          :style="{
            left: `${patternBox.canvas!.left + 10}px`,
            top: `${patternBox.canvas!.top + 25 + lineIndex * 9}px`,
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

      <template v-else-if="patternBox.valueBox">
        <div
          v-if="patternBox.canvas"
          class="logic-operator-canvas"
          :style="{
            left: `${patternBox.canvas.left}px`,
            top: `${patternBox.canvas.top}px`,
            width: `${patternBox.canvas.width}px`,
            height: `${patternBox.canvas.height}px`,
          }"
        />
        <div
          class="logic-value-box"
          :style="{
            left: `${patternBox.valueBox.left}px`,
            top: `${patternBox.valueBox.top}px`,
            width: `${patternBox.valueBox.width}px`,
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
          v-if="patternBox.canvas"
          class="logic-operator-canvas"
          :style="{
            left: `${patternBox.canvas.left}px`,
            top: `${patternBox.canvas.top}px`,
            width: `${patternBox.canvas.width}px`,
            height: `${patternBox.canvas.height}px`,
          }"
        />
        <template v-if="isItemStackBackedValueType(step.sourceType)">
          <div
            class="logic-item-placeholder-label"
            :style="{
              left: `${patternBox.canvas!.left - 64}px`,
              top: `${patternBox.canvas!.top + 3}px`,
            }"
          >
            {{ getItemStackPlaceholder(step.sourceType) }}
          </div>
          <div
            class="logic-item-placeholder-arrow"
            :style="{
              left: `${patternBox.canvas!.left - 15}px`,
              top: `${patternBox.canvas!.top + 6}px`,
            }"
          />
        </template>
        <div
          v-for="(slot, inputIndex) in patternBox.slots"
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
                backgroundImage: `url('${publicAsset(`valuetype/${getTextureName(step.inputs[inputIndex]?.type ?? 'Null')}.png`)}'), url('${publicAsset('item/variable.png')}')`,
              }"
            />
          </HoverMinecraftTooltip>
        </div>
        <div
          v-if="patternBox.symbol"
          class="logic-symbol-overlay"
          :class="{ 'logic-symbol-overlay-text': step.symbol.length > 2 }"
          :style="{
            left: `${patternBox.symbol.left}px`,
            top: `${patternBox.symbol.top}px`,
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
          :title="outputTooltip.title"
          :lines="outputTooltip.lines"
        >
          <div
            v-if="step.workspaceMode !== 'pattern'"
            class="logic-write-card-composite"
            :style="{
              backgroundImage: `url('${publicAsset(`valuetype/${getTextureName(outputTextureName)}.png`)}'), url('${publicAsset('item/variable.png')}')`,
            }"
          />
        </HoverMinecraftTooltip>
      </div>
    </div>
  </div>
</template>
