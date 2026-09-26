<script setup lang="ts">
import DisplayPanelView from "./DisplayPanelView.vue";
import DisplayPanelViewHolder from "./DisplayPanelViewHolder.vue";
import {
  getCumulativeStepError,
  getDisplayPanelAlignment,
  getDisplayPanelSourceStep,
  getDisplayPanelText,
  type VisualStep,
} from "pages-lib/visualTransformerLogic";
import { getDisplayPanelColor } from "pages-lib/visualTransformer";

const props = defineProps<{
  steps: VisualStep[];
  reproUrl?: string;
}>();

const panelStep = (step: VisualStep): VisualStep =>
  getDisplayPanelSourceStep(step, props.steps);
const panelText = (step: VisualStep): string =>
  getDisplayPanelText(panelStep(step));
const panelHardenedText = (step: VisualStep): string =>
  getDisplayPanelText(panelStep(step), { harden: true });
const panelColor = (step: VisualStep): string =>
  getDisplayPanelColor(panelStep(step));
const panelAlign = (step: VisualStep): string =>
  getDisplayPanelAlignment(panelStep(step).sourceType);
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
        :type-name="panelStep(step).sourceType"
        :type-error="panelError(step)"
        :repro-url="props.reproUrl"
      />
      <DisplayPanelView
        :text="panelHardenedText(step)"
        :text-color="panelColor(step)"
        :align="panelAlign(step)"
        :type-name="panelStep(step).sourceType"
        :type-error="panelError(step)"
        :repro-url="props.reproUrl"
      />
    </DisplayPanelViewHolder>
  </div>
</template>
