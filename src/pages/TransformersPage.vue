<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import {
  ASTToCodeLine,
  ASTToCompressed,
  ASTToCondensed,
  ASTToExpanded,
  ASTtoJSON,
  CodeLineToAST,
  CompressedToAST,
  CondensedToAST,
  ExpandedToAST,
  JSONtoAST,
} from "lib";
import FoldableExpandedOutput from "../components/FoldableExpandedOutput.vue";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

type FormatKey = "condensed" | "expanded" | "codeline" | "compressed" | "json";

const inputText = ref("");
const outputText = ref("");
const outputFormat = ref<FormatKey>("expanded");
const status = ref("");
const outputError = ref("");
const lineNumberOffset = ref(0);
const inputEditor = ref<HTMLTextAreaElement | null>(null);

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

const inputLineNumbers = computed(() => {
  const lineCount = Math.max(1, inputText.value.split("\n").length);
  return Array.from({ length: lineCount }, (_, index) => index + 1).join("\n");
});

const nicknamePrefixRegex = new RegExp(
  `^[${BaseOperator.nicknameRegexAllowedChars}]+\\s*=`
);
const condensedCallRegex = new RegExp(
  `^[${BaseOperator.nicknameRegexAllowedChars}]+\\(`
);

const detectInputFormat = (value: string): FormatKey => {
  if (value.includes("\n")) return "expanded";
  if (nicknamePrefixRegex.test(value)) return "expanded";
  if (value[0] === "{") return "json";
  if (condensedCallRegex.test(value)) return "condensed";
  return "codeline";
};

const detectedInputFormat = computed<FormatKey | null>(() => {
  const trimmed = inputText.value.trim();
  if (!trimmed) return null;
  return detectInputFormat(trimmed);
});

const canTransform = computed(() => inputText.value.trim().length > 0);

const syncLineNumberOffsetFromTextarea = (): void => {
  lineNumberOffset.value = inputEditor.value?.scrollTop ?? 0;
};

const syncLineNumberScroll = (event: Event): void => {
  lineNumberOffset.value = (event.target as HTMLTextAreaElement).scrollTop;
};

watch(inputText, async () => {
  await nextTick();
  syncLineNumberOffsetFromTextarea();
});

const transform = (): void => {
  try {
    const trimmedInput = inputText.value.trim();
    const sourceFormat = detectInputFormat(trimmedInput);
    const ast = formatters[sourceFormat].toAST(trimmedInput);
    outputError.value = "";
    outputText.value = formatters[outputFormat.value].fromAST(ast);
    status.value = `Detected ${formatters[sourceFormat].label}. Output as ${formatters[outputFormat.value].label}.`;
  } catch (error) {
    outputText.value = "";
    outputError.value = error instanceof Error ? error.message : String(error);
    status.value = "";
  }
};
</script>

<template>
  <article class="doc-page">
    <h2>Transformers</h2>
    <p>Transform from auto-detected input form to selected output form.</p>

    <div class="transformer-layout">
      <label class="field">
        <span>Input</span>
        <span v-if="detectedInputFormat" class="format-hint">
          Detected: {{ formatters[detectedInputFormat].label }}
        </span>
        <div class="editor-shell input-editor-shell">
          <div class="line-number-column" aria-hidden="true">
            <pre
              class="line-numbers"
              v-text="inputLineNumbers"
              :style="{ transform: `translateY(-${lineNumberOffset}px)` }"
            />
          </div>
          <textarea
            ref="inputEditor"
            v-model="inputText"
            class="editor input-editor"
            spellcheck="false"
            aria-label="Transformer input"
            @scroll="syncLineNumberScroll"
          />
        </div>
      </label>

      <div class="transformer-actions">
        <label class="field">
          <span>Output format</span>
          <select
            v-model="outputFormat"
            class="select"
            aria-label="Output format"
          >
            <option
              v-for="option in formatOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </label>

        <button :disabled="!canTransform" type="button" @click="transform">
          Transform
        </button>
      </div>

      <label class="field">
        <span>{{ formatters[outputFormat].label }}</span>
        <div v-if="outputError" class="output-error" v-text="outputError" />
        <FoldableExpandedOutput
          v-else-if="outputFormat === 'expanded'"
          :text="outputText"
        />
        <textarea
          v-else
          :value="outputText"
          class="editor"
          spellcheck="false"
          :aria-label="formatters[outputFormat].label"
          readonly
        />
      </label>
    </div>

    <p v-if="status" class="status">{{ status }}</p>
  </article>
</template>
