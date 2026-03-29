<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
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
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { globalMap } from "lib/HelperClasses/TypeMap";
import FoldableExpandedOutput from "../components/FoldableExpandedOutput.vue";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

type FormatKey = "condensed" | "expanded" | "codeline" | "compressed" | "json";
type OutputFormatKey = Exclude<FormatKey, "compressed">;

const inputText = ref("");
const outputText = ref("");
const outputFormat = ref<OutputFormatKey>("condensed");
const status = ref("");
const outputError = ref("");
const lineNumberOffset = ref(0);
const inputEditor = ref<HTMLTextAreaElement | null>(null);
const expandedOutputViewer = ref<InstanceType<
  typeof FoldableExpandedOutput
> | null>(null);
const currentAst = ref<any>(null);

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

const outputFormatters: Record<
  OutputFormatKey,
  {
    label: string;
    fromAST: (ast: TypeAST.AST) => string;
  }
> = {
  condensed: formatters.condensed,
  expanded: formatters.expanded,
  codeline: formatters.codeline,
  json: formatters.json,
};

const formatOptions = Object.entries(outputFormatters).map(
  ([value, formatter]) => ({
    value: value as OutputFormatKey,
    label: formatter.label,
  })
);

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
const canCopyOutput = computed(
  () => !outputError.value && outputText.value.trim().length > 0
);
const canProcessTypes = computed(
  () =>
    !outputError.value &&
    (outputText.value.trim().length > 0 || inputText.value.trim().length > 0)
);

const syncLineNumberOffsetFromTextarea = (): void => {
  lineNumberOffset.value = inputEditor.value?.scrollTop ?? 0;
};

const syncLineNumberScroll = (event: Event): void => {
  lineNumberOffset.value = (event.target as HTMLTextAreaElement).scrollTop;
};

const renderOutput = (format: OutputFormatKey, ast: TypeAST.AST): string => {
  return outputFormatters[format].fromAST(ast);
};

const updateOutputFromAst = (
  ast: TypeAST.AST,
  format: OutputFormatKey = outputFormat.value
): boolean => {
  try {
    outputError.value = "";
    outputText.value = renderOutput(format, ast);
    return true;
  } catch (error) {
    outputText.value = "";
    outputError.value = error instanceof Error ? error.message : String(error);
    status.value = "";
    return false;
  }
};

watch(inputText, async () => {
  currentAst.value = null;
  await nextTick();
  syncLineNumberOffsetFromTextarea();
});

watch(outputFormat, () => {
  if (!currentAst.value || outputError.value) return;
  updateOutputFromAst(currentAst.value, outputFormat.value);
});

const transform = (): void => {
  try {
    const trimmedInput = inputText.value.trim();
    const sourceFormat = detectInputFormat(trimmedInput);
    const ast = formatters[sourceFormat].toAST(trimmedInput);
    const compressedOutput = ASTToCompressed(ast);
    currentAst.value = ast;
    if (!updateOutputFromAst(ast, outputFormat.value)) return;
    status.value = `Detected ${formatters[sourceFormat].label}. Output as ${outputFormatters[outputFormat.value].label}.`;
    const url = new URL(window.location.href);
    url.searchParams.set("code", compressedOutput);
    window.history.replaceState({}, "", url);
  } catch (error) {
    outputText.value = "";
    outputError.value = error instanceof Error ? error.message : String(error);
    status.value = "";
    const url = new URL(window.location.href);
    url.searchParams.delete("code");
    window.history.replaceState({}, "", url);
  }
};

const getCurrentAst = (): TypeAST.AST => {
  if (currentAst.value) return currentAst.value;

  const trimmedInput = inputText.value.trim();
  const sourceFormat = detectInputFormat(trimmedInput);
  return formatters[sourceFormat].toAST(trimmedInput);
};

const processTypes = (): void => {
  try {
    const ast = getCurrentAst();
    globalMap.clear();
    ParsedSignature.resetTypeIDCounter();
    const compressedOutput = ASTToCompressed(ast);
    currentAst.value = ast;
    outputFormat.value = "expanded";
    if (!updateOutputFromAst(ast, "expanded")) return;
    status.value = "Processed types and regenerated expanded output.";
    const url = new URL(window.location.href);
    url.searchParams.set("code", compressedOutput);
    window.history.replaceState({}, "", url);
  } catch (error) {
    outputText.value = "";
    outputError.value = error instanceof Error ? error.message : String(error);
    status.value = "";
  }
};

const copyOutput = async (): Promise<void> => {
  if (!canCopyOutput.value) return;

  const textToCopy =
    outputFormat.value === "expanded"
      ? (expandedOutputViewer.value?.getCopyText() ?? outputText.value)
      : outputText.value;

  await navigator.clipboard.writeText(textToCopy);
  status.value = "Copied output.";
};

onMounted(() => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  if (!code) return;

  const ast = CompressedToAST(code);
  currentAst.value = ast;
  outputFormat.value = "condensed";
  if (updateOutputFromAst(ast, "condensed")) {
    status.value = "Loaded output from URL.";
  }
});
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
        <button
          :disabled="!canProcessTypes"
          type="button"
          @click="processTypes"
        >
          Process Types
        </button>
        <button :disabled="!canCopyOutput" type="button" @click="copyOutput">
          Copy output
        </button>
      </div>

      <label class="field">
        <span>{{ outputFormatters[outputFormat].label }}</span>
        <div v-if="outputError" class="output-error" v-text="outputError" />
        <FoldableExpandedOutput
          v-else-if="outputFormat === 'expanded'"
          ref="expandedOutputViewer"
          :text="outputText"
        />
        <textarea
          v-else
          :value="outputText"
          class="editor"
          spellcheck="false"
          :aria-label="outputFormatters[outputFormat].label"
          readonly
        />
      </label>
    </div>

    <p v-if="status" class="status">{{ status }}</p>
  </article>
</template>
