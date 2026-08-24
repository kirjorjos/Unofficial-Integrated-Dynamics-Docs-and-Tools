<script setup lang="ts">
import { computed } from "vue";
import VisualTransformerStep from "./VisualTransformerStep.vue";
import LogicProgrammerView from "./LogicProgrammerView.vue";
import ReaderGuiView from "./ReaderGuiView.vue";
import {
  generateVisualSteps,
  getCompactValueTextForAst,
  getCumulativeStepError,
} from "pages-lib/visualTransformerLogic";
import { getReaderClassByTypeName } from "lib/IntegratedDynamicsClasses/readers/readerRegistry";

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

const getReaderViewReader = (step: (typeof steps.value)[number]) => {
  if (step.node?.type === "Reader") {
    return getReaderClassByTypeName(step.node.value.reader);
  }
  return undefined;
};

const getReaderViewValues = (
  step: (typeof steps.value)[number]
): Record<string, string> | undefined => {
  if (step.node?.type === "Reader" && step.node.value.simulatedOutput) {
    return {
      [step.node.value.aspect]: getCompactValueTextForAst(
        step.node.value.simulatedOutput
      ),
    };
  }
  return undefined;
};
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
      :display-panel-error="
        step.typeError ?? getCumulativeStepError(steps, step.variableId)
      "
    >
      <ReaderGuiView
        v-if="step.sourceType === 'Reader'"
        :reader="getReaderViewReader(step)!"
        :focused-aspect="
          step.node?.type === 'Reader' ? step.node.value.aspect : undefined
        "
        :values="getReaderViewValues(step)"
        :type-error="step.typeError"
      />
      <LogicProgrammerView
        v-else
        :step="step"
        :force-show-output-card="props.forceShowOutputCard"
      />
    </VisualTransformerStep>
  </section>
</template>
