<script setup lang="ts">
import { computed } from "vue";
import DisplayPanelView from "./DisplayPanelView.vue";
import DisplayPanelViewHolder from "./DisplayPanelViewHolder.vue";
import {
  getDisplayPanelText,
  getDisplayPanelAlignment,
  getDisplayPanelSourceStep,
  getCumulativeStepError,
} from "pages-lib/visualTransformerLogic";
import { getDisplayPanelColor } from "pages-lib/visualTransformer";
import type { VisualStep } from "pages-lib/visualTransformerLogic";

const props = withDefaults(
  defineProps<{
    step: VisualStep;
    index: number;
    allSteps: VisualStep[];
    showStepNumbers?: boolean;
    showStepTitles?: boolean;
    forceShowOutputCard?: boolean;
    displayPanelText?: string;
    displayPanelHardenedText?: string;
    displayPanelColor?: string;
    displayPanelAlign?: string;
    displayPanelTypeName?: string;
    displayPanelError?: string;
    reproUrl?: string;
    showDisplayPanels?: boolean;
  }>(),
  { showDisplayPanels: true }
);

const panelSourceStep = computed(() =>
  getDisplayPanelSourceStep(props.step, props.allSteps)
);

const panelText = computed(
  () => props.displayPanelText ?? getDisplayPanelText(panelSourceStep.value)
);

const panelHardenedText = computed(
  () =>
    props.displayPanelHardenedText ??
    getDisplayPanelText(panelSourceStep.value, { harden: true })
);

const panelColor = computed(
  () => props.displayPanelColor ?? getDisplayPanelColor(panelSourceStep.value)
);

const panelAlign = computed(
  () =>
    props.displayPanelAlign ??
    getDisplayPanelAlignment(panelSourceStep.value.sourceType)
);

const panelTypeName = computed(
  () => props.displayPanelTypeName ?? panelSourceStep.value.sourceType
);

const panelError = computed(
  () =>
    props.displayPanelError ??
    getCumulativeStepError(props.allSteps, props.step.variableId)
);
</script>

<template>
  <article class="logic-programmer-shot">
    <div
      v-if="props.showStepNumbers !== false || props.showStepTitles !== false"
      class="logic-programmer-meta"
    >
      <div v-if="props.showStepNumbers !== false" class="logic-programmer-step">
        Step {{ index + 1 }}
      </div>
      <div
        v-if="props.showStepTitles !== false"
        class="logic-programmer-step-title"
      >
        {{ step.output }}
      </div>
    </div>

    <div
      v-if="step.comment"
      class="logic-programmer-step-comment"
      v-text="step.comment"
    />

    <slot
      v-if="
        props.step.sourceType === 'Reader' ||
        props.step.sourceType === 'Materialize'
      "
    />
    <div v-else class="logic-programmer-frame-shell">
      <slot />
    </div>

    <DisplayPanelViewHolder v-if="props.showDisplayPanels">
      <DisplayPanelView
        :text="panelText"
        :text-color="panelColor"
        :align="panelAlign"
        :type-name="panelTypeName"
        :type-error="panelError"
        :repro-url="props.reproUrl"
      />
      <DisplayPanelView
        :text="panelHardenedText"
        :text-color="panelColor"
        :align="panelAlign"
        :type-name="panelTypeName"
        :type-error="panelError"
        :repro-url="props.reproUrl"
      />
    </DisplayPanelViewHolder>
  </article>
</template>
