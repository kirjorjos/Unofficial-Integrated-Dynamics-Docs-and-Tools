<script setup lang="ts">
import { computed } from "vue";
import DisplayPanelView from "./DisplayPanelView.vue";
import DisplayPanelViewHolder from "./DisplayPanelViewHolder.vue";
import {
  getDisplayPanelText,
  getDisplayPanelAlignment,
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
    /** Override display panel text (bypasses shared getDisplayPanelText) */
    displayPanelText?: string;
    /** Override display panel color (bypasses shared getDisplayPanelColor) */
    displayPanelColor?: string;
    /** Override display panel alignment (bypasses shared getDisplayPanelAlignment) */
    displayPanelAlign?: string;
    /** Override display panel error (bypasses shared getCumulativeStepError) */
    displayPanelError?: string;
  }>(),
  {}
);

const panelText = computed(
  () => props.displayPanelText ?? getDisplayPanelText(props.step)
);

const panelColor = computed(
  () => props.displayPanelColor ?? getDisplayPanelColor(props.step)
);

const panelAlign = computed(
  () =>
    props.displayPanelAlign ?? getDisplayPanelAlignment(props.step.sourceType)
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

    <!-- Reader steps render the reader GUI (its own frame shell) in place of
         the logic programmer, with the display panel holder alongside below -->
    <slot v-if="props.step.sourceType === 'Reader'" />
    <div v-else class="logic-programmer-frame-shell">
      <slot />
    </div>

    <DisplayPanelViewHolder>
      <DisplayPanelView
        :text="panelText"
        :text-color="panelColor"
        :align="panelAlign"
        :type-name="step.sourceType"
        :type-error="panelError"
      />
      <DisplayPanelView
        :text="panelText"
        :text-color="panelColor"
        :align="panelAlign"
        :type-name="step.sourceType"
        :type-error="panelError"
      />
    </DisplayPanelViewHolder>
  </article>
</template>
