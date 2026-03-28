<script setup lang="ts">
import { computed, ref } from "vue";
import {
  ASTToCodeLine,
  ASTToCompressed,
  ASTToCondensed,
  CondensedToAST,
  ASTToExpanded,
  ASTtoJSON,
  CodeLineToAST,
  CompressedToAST,
  ExpandedToAST,
  JSONtoAST,
} from "lib";

type FormatKey = "condensed" | "expanded" | "codeline" | "compressed" | "json";

const leftText = ref("");
const rightText = ref("");
const leftFormat = ref<FormatKey>("condensed");
const rightFormat = ref<FormatKey>("expanded");
const status = ref("");

const formatters: Record<
  FormatKey,
  {
    label: string;
    toAST: (value: string) => TypeAST.AST;
    fromAST: (ast: TypeAST.AST) => string;
  }
> = {
  condensed: {
    label: "Condensed",
    toAST: (value) => CondensedToAST(value),
    fromAST: (ast) => ASTToCondensed(ast),
  },
  expanded: {
    label: "Expanded",
    toAST: (value) => ExpandedToAST(value),
    fromAST: (ast) => ASTToExpanded(ast),
  },
  codeline: {
    label: "Code Line",
    toAST: (value) => CodeLineToAST(value),
    fromAST: (ast) => ASTToCodeLine(ast),
  },
  compressed: {
    label: "Compressed",
    toAST: (value) => CompressedToAST(value),
    fromAST: (ast) => ASTToCompressed(ast),
  },
  json: {
    label: "JSON",
    toAST: (value) => JSONtoAST(JSON.parse(value) as jsonData),
    fromAST: (ast) => JSON.stringify(ASTtoJSON(ast), null, 2),
  },
};

const formatOptions = Object.entries(formatters).map(([value, formatter]) => ({
  value: value as FormatKey,
  label: formatter.label,
}));

const canConvertLeftToRight = computed(() => leftText.value.trim().length > 0);
const canConvertRightToLeft = computed(() => rightText.value.trim().length > 0);

const convertLeftToRight = (): void => {
  try {
    const ast = formatters[leftFormat.value].toAST(leftText.value);
    rightText.value = formatters[rightFormat.value].fromAST(ast);
    status.value = `Converted ${formatters[leftFormat.value].label} to ${formatters[rightFormat.value].label}.`;
  } catch (error) {
    status.value = error instanceof Error ? error.message : String(error);
  }
};

const convertRightToLeft = (): void => {
  try {
    const ast = formatters[rightFormat.value].toAST(rightText.value);
    leftText.value = formatters[leftFormat.value].fromAST(ast);
    status.value = `Converted ${formatters[rightFormat.value].label} to ${formatters[leftFormat.value].label}.`;
  } catch (error) {
    status.value = error instanceof Error ? error.message : String(error);
  }
};
</script>

<template>
  <main>
    <h1>WIP Integrated Dynamics Project</h1>

    <div class="card">
      <label class="field">
        <span>{{ formatters[leftFormat].label }}</span>
        <select v-model="leftFormat" class="select" aria-label="Left format">
          <option
            v-for="option in formatOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <textarea
          v-model="leftText"
          class="editor"
          spellcheck="false"
          :aria-label="formatters[leftFormat].label"
        />
      </label>

      <button
        :disabled="!canConvertLeftToRight"
        type="button"
        @click="convertLeftToRight"
      >
        Convert to {{ formatters[rightFormat].label }}
      </button>

      <label class="field">
        <span>{{ formatters[rightFormat].label }}</span>
        <select v-model="rightFormat" class="select" aria-label="Right format">
          <option
            v-for="option in formatOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <textarea
          v-model="rightText"
          class="editor"
          spellcheck="false"
          :aria-label="formatters[rightFormat].label"
        />
      </label>

      <button
        :disabled="!canConvertRightToLeft"
        type="button"
        @click="convertRightToLeft"
      >
        Convert to {{ formatters[leftFormat].label }}
      </button>

      <p class="status">{{ status }}</p>
    </div>
  </main>
</template>
