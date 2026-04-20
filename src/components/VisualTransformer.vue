<script setup lang="ts">
import { computed } from "vue";
import DisplayPanelView from "./DisplayPanelView.vue";
import DisplayPanelViewHolder from "./DisplayPanelViewHolder.vue";
import {
  generateVisualSteps,
  getDisplayPanelText,
} from "pages-lib/visualTransformerLogic";

const props = defineProps<{
  ast: globalThis.TypeAST.AST;
  startVariableId?: number;
  showStepNumbers?: boolean;
  showStepTitles?: boolean;
  operatorPreviewMode?: "value" | "pattern";
}>();

const startId = props.startVariableId ?? 0;

const steps = computed(() =>
  generateVisualSteps(props.ast, startId, props.operatorPreviewMode)
);
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
        <!-- LogicProgrammerView will go here -->
      </div>

      <DisplayPanelViewHolder>
        <DisplayPanelView
          :text="getDisplayPanelText(step)"
          :type-name="step.sourceType"
        />
        <DisplayPanelView
          :text="getDisplayPanelText(step)"
          :type-name="step.sourceType"
        />
      </DisplayPanelViewHolder>
    </article>
  </section>
</template>
