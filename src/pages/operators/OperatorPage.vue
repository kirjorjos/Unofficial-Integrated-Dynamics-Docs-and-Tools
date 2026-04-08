<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { operatorRegistry } from "lib";
import LogicProgrammerVisualOutput from "../../components/LogicProgrammerVisualOutput.vue";

const props = defineProps<{
  operatorKey: string;
}>();

type OperatorPageClass = {
  internalName: string;
  nicknames: string[];
  interactName: string;
  displayName?: string;
  fullDisplayName?: string;
  tooltipInfo?: string;
};

const operatorClass = computed(() => {
  return operatorRegistry[
    props.operatorKey as keyof typeof operatorRegistry
  ] as unknown as OperatorPageClass;
});

const variableId = ref(0);
const variableName = ref("");

watch(
  operatorClass,
  (nextOperator) => {
    variableId.value = 0;
    variableName.value = nextOperator.interactName;
  },
  { immediate: true }
);

watch(variableId, (nextValue) => {
  if (!Number.isFinite(nextValue)) {
    variableId.value = 0;
    return;
  }

  const normalized = Math.max(0, Math.trunc(nextValue));
  if (normalized !== nextValue) {
    variableId.value = normalized;
  }
});

const operatorAst = computed<TypeAST.Operator>(() => {
  const name = variableName.value.trim();
  return {
    type: "Operator",
    opName: props.operatorKey as TypeOperatorKey,
    ...(name ? { varName: name } : {}),
  };
});
</script>

<template>
  <article class="doc-page">
    <h2>{{ operatorKey }}</h2>

    <dl class="operator-meta">
      <div class="operator-meta-card">
        <dt>Internal name</dt>
        <dd>{{ operatorClass.internalName }}</dd>

        <dt>Nicknames</dt>
        <dd v-if="operatorClass.nicknames.length">
          {{ operatorClass.nicknames.join(", ") }}
        </dd>
        <dd v-else>None</dd>

        <template v-if="operatorClass.tooltipInfo">
          <dt>Description</dt>
          <dd>{{ operatorClass.tooltipInfo }}</dd>
        </template>
      </div>
    </dl>

    <section class="operator-preview">
      <div class="operator-preview-controls">
        <label class="field">
          <span>Variable ID</span>
          <input
            v-model.number="variableId"
            class="select"
            type="number"
            min="0"
            step="1"
            aria-label="Variable ID"
          />
        </label>

        <label class="field">
          <span>Variable name</span>
          <input
            v-model="variableName"
            class="select"
            type="text"
            aria-label="Variable name"
          />
        </label>
      </div>

      <LogicProgrammerVisualOutput
        :ast="operatorAst"
        :start-variable-id="variableId"
        :show-step-numbers="false"
        :show-step-titles="false"
      />
    </section>
  </article>
</template>
