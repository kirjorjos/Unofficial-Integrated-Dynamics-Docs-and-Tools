<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { operatorRegistry } from "lib";
import LogicProgrammerVisualOutput from "../../components/LogicProgrammerVisualOutput.vue";
import StepDisplayPanels from "../../components/StepDisplayPanels.vue";
import Tile from "../../components/Tile.vue";
import TileGrid from "../../components/TileGrid.vue";
import { FULL_TILE_SPAN, assignOperatorRows } from "pages-lib/tileLayout";
import type { VisualStep } from "pages-lib/visualTransformerLogic";

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

const operatorTabRef = ref<any>(null);
const patternTabRef = ref<any>(null);

const operatorTabSteps = computed<VisualStep[]>(
  () => (operatorTabRef.value?.steps ?? []) as VisualStep[]
);
const patternTabSteps = computed<VisualStep[]>(
  () => (patternTabRef.value?.steps ?? []) as VisualStep[]
);

const operatorRows = (cols: number) =>
  assignOperatorRows({
    panelsShareRow: cols >= 2,
    operatorDisplayFitsRow4: cols >= 3,
  });
</script>

<template>
  <article class="doc-page operator-doc-page">
    <TileGrid v-slot="{ cols, resetLayout }">
      <Tile id="title" :span="FULL_TILE_SPAN" :default-col="0" :default-row="0">
        <div class="tile-title-block">
          <div class="tile-title-text">
            <h2>{{ operatorKey }}</h2>
          </div>
          <div class="tile-actions">
            <button type="button" class="tile-reset" @click="resetLayout">
              Reset layout
            </button>
          </div>
        </div>
      </Tile>

      <Tile id="info" :span="FULL_TILE_SPAN" :default-col="0" :default-row="1">
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
      </Tile>

      <Tile id="variableId" :span="1" :default-col="0" :default-row="2">
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
      </Tile>

      <Tile id="variableName" :span="1" :default-col="1" :default-row="2">
        <label class="field">
          <span>Variable name</span>
          <input
            v-model="variableName"
            class="select"
            type="text"
            aria-label="Variable name"
          />
        </label>
      </Tile>

      <Tile
        id="operatorTab"
        :span="1"
        :default-col="0"
        :default-row="operatorRows(cols).operatorTab - 1"
      >
        <h3>Operator Tab</h3>
        <LogicProgrammerVisualOutput
          ref="operatorTabRef"
          :ast="operatorAst"
          :start-variable-id="variableId"
          :show-step-numbers="false"
          :show-step-titles="false"
          :show-display-panels="false"
          operator-preview-mode="pattern"
        />
      </Tile>

      <Tile
        id="patternTab"
        :span="1"
        :default-col="1"
        :default-row="operatorRows(cols).patternTab - 1"
      >
        <h3>Pattern Tab</h3>
        <LogicProgrammerVisualOutput
          ref="patternTabRef"
          :ast="operatorAst"
          :start-variable-id="variableId"
          :show-step-numbers="false"
          :show-step-titles="false"
          :show-display-panels="false"
        />
      </Tile>

      <Tile
        id="operatorDisplay"
        :span="1"
        :default-col="0"
        :default-row="operatorRows(cols).operatorDisplay - 1"
      >
        <StepDisplayPanels :steps="operatorTabSteps" />
      </Tile>

      <Tile
        id="patternDisplay"
        :span="1"
        :default-col="1"
        :default-row="operatorRows(cols).patternDisplay - 1"
      >
        <StepDisplayPanels :steps="patternTabSteps" />
      </Tile>
    </TileGrid>
  </article>
</template>
