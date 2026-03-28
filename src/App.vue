<script setup lang="ts">
import { computed, ref } from "vue";
import {
  ASTToCondensed,
  CondensedToAST,
  ExpandedToAST,
  ASTToExpanded,
} from "lib";

const condensedText = ref("");
const expandedText = ref("");

const canConvertExpanded = computed(() => expandedText.value.trim().length > 0);
const canConvertCondensed = computed(
  () => condensedText.value.trim().length > 0
);

const parseExpanded = (): void => {
  try {
    const ast = ExpandedToAST(expandedText.value);
    condensedText.value = ASTToCondensed(ast);
  } catch (error) {
    console.log(error);
  }
};

const parseCondensed = (): void => {
  try {
    const ast = CondensedToAST(condensedText.value);
    expandedText.value = ASTToExpanded(ast);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <main>
    <h1>WIP Integrated Dynamics Project</h1>

    <div class="card">
      <label class="field">
        <span>Condensed</span>
        <textarea
          v-model="condensedText"
          class="editor"
          spellcheck="false"
          aria-label="Condensed"
        />
      </label>

      <button
        :disabled="!canConvertCondensed"
        type="button"
        @click="parseCondensed"
      >
        Convert to Expanded
      </button>

      <label class="field">
        <span>Expanded</span>
        <textarea
          v-model="expandedText"
          class="editor"
          spellcheck="false"
          aria-label="Expanded"
        />
      </label>

      <button
        :disabled="!canConvertExpanded"
        type="button"
        @click="parseExpanded"
      >
        Convert to Condensed
      </button>
    </div>
  </main>
</template>
