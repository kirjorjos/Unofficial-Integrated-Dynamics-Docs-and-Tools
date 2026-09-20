<script setup lang="ts">
import DisplayPanelView from "./DisplayPanelView.vue";
import DisplayPanelViewHolder from "./DisplayPanelViewHolder.vue";
import {
  getCumulativeStepError,
  getDisplayPanelAlignment,
  getDisplayPanelText,
  type VisualStep,
} from "pages-lib/visualTransformerLogic";
import { getDisplayPanelColor } from "pages-lib/visualTransformer";

const props = defineProps<{
  steps: VisualStep[];
  reproUrl?: string;
}>();

const panelText = (step: VisualStep): string => getDisplayPanelText(step);
const panelHardenedText = (step: VisualStep): string =>
  getDisplayPanelText(step, { harden: true });
const panelColor = (step: VisualStep): string => getDisplayPanelColor(step);
const panelAlign = (step: VisualStep): string =>
  getDisplayPanelAlignment(step.sourceType);
const panelError = (step: VisualStep): string | undefined =>
  getCumulativeStepError(props.steps, step.variableId);
</script>

<template>
  <div class="step-display-panels">
    <DisplayPanelViewHolder v-for="step in steps" :key="step.id">
      <DisplayPanelView
        :text="panelText(step)"
        :text-color="panelColor(step)"
        :align="panelAlign(step)"
        :type-name="step.sourceType"
        :type-error="panelError(step)"
        :repro-url="props.reproUrl"
      />
      <DisplayPanelView
        :text="panelHardenedText(step)"
        :text-color="panelColor(step)"
        :align="panelAlign(step)"
        :type-name="step.sourceType"
        :type-error="panelError(step)"
        :repro-url="props.reproUrl"
      />
    </DisplayPanelViewHolder>
  </div>
</template>
