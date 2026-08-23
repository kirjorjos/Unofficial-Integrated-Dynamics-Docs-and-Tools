<script setup lang="ts">
import { computed } from "vue";
import VisualTransformerStep from "./VisualTransformerStep.vue";
import LogicProgrammerView from "./LogicProgrammerView.vue";
import { generateVisualSteps } from "pages-lib/visualTransformerLogic";

const props = defineProps<{
  ast: globalThis.TypeAST.AST;
  startVariableId?: number;
  showStepNumbers?: boolean;
  showStepTitles?: boolean;
  operatorPreviewMode?: "value" | "pattern";
  forceShowOutputCard?: boolean;
}>();

const startId = props.startVariableId ?? 0;

const steps = computed(() =>
  generateVisualSteps(props.ast, startId, props.operatorPreviewMode)
);
</script>

<template>
  <section class="logic-programmer-sequence">
    <VisualTransformerStep
      v-for="(step, index) in steps"
      :key="step.id"
      :step="step"
      :index="index"
      :all-steps="steps"
      :show-step-numbers="props.showStepNumbers"
      :show-step-titles="props.showStepTitles"
      :force-show-output-card="props.forceShowOutputCard"
    >
      <LogicProgrammerView
        :step="step"
        :force-show-output-card="props.forceShowOutputCard"
      />
    </VisualTransformerStep>
  </section>
</template>
