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
import LogicProgrammerVisualOutput from "../components/LogicProgrammerVisualOutput.vue";
import { detectInputFormat } from "lib/transformers/detectFormat";
import type { TransformerFormatKey } from "lib/transformers/detectFormat";
import {
  ASTToExpandedWithSignatureOptions,
  type ExpandedSignatureOptions,
} from "lib/transformers/Expanded";
import type { InputStateSection } from "lib/transformers/Compressed";
import {
  applyCodeLineOverlay,
  applyCondensedOverlay,
  applyExpandedOverlay,
  applyJsonOverlay,
  computeCodeLineOverlay,
  computeCondensedOverlay,
  computeExpandedOverlay,
  computeJsonOverlay,
  discoverSignatureRestoreModes,
  resolveExpandedOverlayNames,
  stripAutoCurryVarNames,
} from "lib/transformers/inputState";
import {
  compressWithInputState,
  decodeInputStateFromCompressed,
} from "lib/transformers/Compressed";

type FormatKey = TransformerFormatKey;
type OutputFormatKey = Exclude<FormatKey, "compressed"> | "visual";

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
const initialVariableId = ref(0);
let restoringState = false;

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
    toAST: (value) => CondensedToAST(value, undefined, initialVariableId.value),
    fromAST: (ast) => ASTToCondensed(ast, true, initialVariableId.value),
  },
  expanded: {
    label: "Expanded",
    toAST: (value) => ExpandedToAST(value, initialVariableId.value),
    fromAST: (ast) => ASTToExpanded(ast),
  },
  codeline: {
    label: "Code Line",
    toAST: (value) => CodeLineToAST(value, undefined, initialVariableId.value),
    fromAST: (ast) => ASTToCodeLine(ast, true, initialVariableId.value),
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
  visual: {
    label: "Visual",
    fromAST: (ast) =>
      ast.type === "NetworkCards"
        ? ASTToExpanded(ast)
        : ASTToCondensed(ast, true, initialVariableId.value),
  },
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

const detectedInputFormat = computed<FormatKey | null>(() => {
  const raw = inputText.value;
  if (!raw.trim()) return null;
  // detectInputFormat normalizes whitespace internally (spec §5.2), so pass raw.
  return detectInputFormat(raw);
});

const canTransform = computed(() => inputText.value.trim().length > 0);
const canCopyOutput = computed(
  () =>
    !outputError.value &&
    (outputFormat.value === "visual"
      ? currentAst.value !== null
      : outputText.value.trim().length > 0)
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

const updateUrlState = (
  code: string | null,
  format: OutputFormatKey | null = outputFormat.value,
  variableId: number | null = initialVariableId.value
): void => {
  const url = new URL(window.location.href);

  if (code) {
    url.searchParams.set("code", code);
  } else {
    url.searchParams.delete("code");
  }

  if (format) {
    url.searchParams.set("output", format);
  } else {
    url.searchParams.delete("output");
  }

  if (variableId !== null) {
    url.searchParams.set("varId", String(variableId));
  } else {
    url.searchParams.delete("varId");
  }

  window.history.replaceState({}, "", url);
};

const SIGNATURE_ARROW_VALUES: ExpandedSignatureOptions["arrow"][] = ["->", "→"];

const signatureCandidateOpts = (): (ExpandedSignatureOptions | null)[] => {
  const depths: ExpandedSignatureOptions["depth"][] = [null, 0, 1, 2, 3];
  const opts: (ExpandedSignatureOptions | null)[] = [null]; // baseline: full canonical
  for (const labels of [false, true]) {
    for (const arrow of SIGNATURE_ARROW_VALUES) {
      for (const depth of depths) {
        for (const hideOperatorWrappers of [false, true]) {
          opts.push({ depth, labels, arrow, hideOperatorWrappers });
        }
      }
    }
  }
  return opts;
};

const signatureCandidates = signatureCandidateOpts();

const pickExpandedSignatureRender = (
  rawInput: string,
  strippedAst: TypeAST.AST,
  ast: TypeAST.AST
): {
  canonicalInput: string;
  sigOpts: ExpandedSignatureOptions | undefined;
  modes: { name: string; opts: ExpandedSignatureOptions }[] | undefined;
} => {
  let bestCanonical = ASTToExpandedWithSignatureOptions(
    strippedAst,
    "Condensed",
    null,
    true
  );
  let bestSigOpts: ExpandedSignatureOptions | undefined;
  let bestLen = Infinity;

  for (const sigOpts of signatureCandidates) {
    const canonicalInput = ASTToExpandedWithSignatureOptions(
      strippedAst,
      "Condensed",
      sigOpts,
      true
    );
    const result = computeExpandedOverlay(
      rawInput,
      canonicalInput,
      sigOpts ?? undefined
    );
    if (result.mode !== 0) continue;
    const len = compressWithInputState(ast, "expanded", {
      format: "expanded",
      mode: "overlay",
      overlay: result.overlay,
    }).length;
    if (len < bestLen) {
      bestLen = len;
      bestCanonical = canonicalInput;
      bestSigOpts = sigOpts ?? undefined;
    }
  }

  const winOpts = bestSigOpts ?? {
    depth: null,
    labels: false,
    arrow: "→",
    hideOperatorWrappers: false,
  };
  const modes = discoverSignatureRestoreModes(rawInput, strippedAst, winOpts);
  let adoptedModes: typeof modes | undefined;
  if (modes.length > 0) {
    const modesMap = new Map(modes.map((m) => [m.name, m.opts]));
    const canonicalInput = ASTToExpandedWithSignatureOptions(
      strippedAst,
      "Condensed",
      winOpts,
      true,
      modesMap
    );
    const result = computeExpandedOverlay(rawInput, canonicalInput, winOpts);
    if (result.mode === 0) {
      const overlay = { ...result.overlay, modes };
      const len = compressWithInputState(ast, "expanded", {
        format: "expanded",
        mode: "overlay",
        overlay,
      }).length;
      if (len < bestLen) {
        bestLen = len;
        bestCanonical = canonicalInput;
        bestSigOpts = winOpts;
        adoptedModes = modes;
      }
    }
  }
  return {
    canonicalInput: bestCanonical,
    sigOpts: bestSigOpts,
    modes: adoptedModes,
  };
};

const buildInputStateSection = (
  rawInput: string,
  sourceFormat: FormatKey,
  ast: TypeAST.AST,
  outputKey: OutputFormatKey
): InputStateSection | null => {
  if (!rawInput.trim()) return null;
  if (sourceFormat === "compressed") return null;

  const canonicalInput = formatters[sourceFormat].fromAST(
    stripAutoCurryVarNames(CompressedToAST(ASTToCompressed(ast)))
  );
  if (canonicalInput === rawInput && sourceFormat === outputKey) {
    return null;
  }

  if (sourceFormat === "condensed") {
    const overlay = computeCondensedOverlay(rawInput, canonicalInput);
    if (overlay.mode === 0) {
      return { format: "condensed", mode: "overlay", overlay };
    }
    return { format: "condensed", mode: "raw", rawText: rawInput };
  }

  if (sourceFormat === "codeline") {
    const overlay = computeCodeLineOverlay(rawInput, canonicalInput);
    if (overlay.mode === 0) {
      return { format: "codeline", mode: "overlay", overlay };
    }
    return { format: "codeline", mode: "raw", rawText: rawInput };
  }

  if (sourceFormat === "expanded") {
    const strippedAst = stripAutoCurryVarNames(
      CompressedToAST(ASTToCompressed(ast))
    );
    const {
      canonicalInput: tunedCanonical,
      sigOpts,
      modes,
    } = pickExpandedSignatureRender(rawInput, strippedAst, ast);
    const overlay = computeExpandedOverlay(rawInput, tunedCanonical, sigOpts);
    if (overlay.mode === 0) {
      const withModes =
        modes && modes.length > 0
          ? { ...overlay.overlay, modes }
          : overlay.overlay;
      return { format: "expanded", mode: "overlay", overlay: withModes };
    }
    return { format: "expanded", mode: "raw", rawText: rawInput };
  }

  if (sourceFormat === "json") {
    const overlay = computeJsonOverlay(rawInput, canonicalInput);
    if (overlay.mode === 0) {
      return { format: "json", mode: "overlay", overlay };
    }
    return { format: "json", mode: "raw", rawText: rawInput };
  }

  return null;
};

const buildUrlCode = (): string | null => {
  if (!currentAst.value) return null;
  const rawInput = inputText.value;
  const sourceFormat = detectInputFormat(rawInput);
  const inputState = buildInputStateSection(
    rawInput,
    sourceFormat,
    currentAst.value as TypeAST.AST,
    outputFormat.value
  );
  return inputState
    ? compressWithInputState(
        currentAst.value as TypeAST.AST,
        outputFormat.value,
        inputState
      )
    : ASTToCompressed(currentAst.value as TypeAST.AST);
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
  if (restoringState) return;
  currentAst.value = null;
  await nextTick();
  syncLineNumberOffsetFromTextarea();
});

watch(outputFormat, () => {
  updateUrlState(buildUrlCode(), outputFormat.value, initialVariableId.value);
  if (!currentAst.value || outputError.value) return;
  updateOutputFromAst(currentAst.value, outputFormat.value);
});

watch(initialVariableId, (value) => {
  const normalized = Number.isFinite(value)
    ? Math.max(0, Math.trunc(value))
    : 0;
  if (normalized !== value) {
    initialVariableId.value = normalized;
    return;
  }

  if (currentAst.value && inputText.value.trim()) {
    transform();
    return;
  }
  updateUrlState(buildUrlCode(), outputFormat.value, normalized);
});

const transform = (skipUrlUpdate: boolean = false): void => {
  try {
    const rawInput = inputText.value; // untrimmed (no-trim rule)
    const sourceFormat = detectInputFormat(rawInput);
    const ast = formatters[sourceFormat].toAST(rawInput);
    currentAst.value = ast;
    if (!updateOutputFromAst(ast, outputFormat.value)) return;
    status.value = `Detected ${formatters[sourceFormat].label}. Output as ${outputFormatters[outputFormat.value].label}.`;
    if (skipUrlUpdate) return;
    const inputState = buildInputStateSection(
      rawInput,
      sourceFormat,
      ast,
      outputFormat.value
    );
    const code = inputState
      ? compressWithInputState(ast, outputFormat.value, inputState)
      : ASTToCompressed(ast);
    updateUrlState(code, outputFormat.value, initialVariableId.value);
  } catch (error) {
    outputText.value = "";
    outputError.value = error instanceof Error ? error.message : String(error);
    status.value = "";
    if (!skipUrlUpdate) {
      updateUrlState(null, outputFormat.value, initialVariableId.value);
    }
  }
};

const getCurrentAst = (): TypeAST.AST => {
  if (currentAst.value) return currentAst.value;

  const rawInput = inputText.value; // untrimmed
  const sourceFormat = detectInputFormat(rawInput);
  return formatters[sourceFormat].toAST(rawInput);
};

const processTypes = (): void => {
  try {
    const ast = getCurrentAst();
    globalMap.clear();
    ParsedSignature.resetTypeIDCounter();
    currentAst.value = ast;
    outputFormat.value = "expanded";
    if (!updateOutputFromAst(ast, "expanded")) return;
    status.value = "Processed types and regenerated expanded output.";
    const rawInput = inputText.value; // untrimmed
    const inputState = rawInput.trim()
      ? buildInputStateSection(
          rawInput,
          detectInputFormat(rawInput),
          ast,
          "expanded"
        )
      : null;
    const code = inputState
      ? compressWithInputState(ast, "expanded", inputState)
      : ASTToCompressed(ast);
    updateUrlState(code, "expanded", initialVariableId.value);
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
      : outputFormat.value === "visual" && currentAst.value
        ? currentAst.value.type === "NetworkCards"
          ? ASTToExpanded(currentAst.value)
          : ASTToCondensed(currentAst.value, true, initialVariableId.value)
        : outputText.value;

  await navigator.clipboard.writeText(textToCopy);
  status.value = "Copied output.";
};

onMounted(async () => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const output = url.searchParams.get("output");
  const varId = url.searchParams.get("varId");

  if (varId !== null) {
    const parsed = Number.parseInt(varId, 10);
    initialVariableId.value =
      Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  }

  if (
    output &&
    Object.prototype.hasOwnProperty.call(outputFormatters, output) &&
    output !== "compressed"
  ) {
    outputFormat.value = output as OutputFormatKey;
  }

  if (!code) return;

  const ast = stripAutoCurryVarNames(CompressedToAST(code));
  currentAst.value = ast;

  const inputState = decodeInputStateFromCompressed(code, outputFormat.value);
  if (inputState) {
    let rawInput: string;
    if (inputState.mode === "raw") {
      rawInput = inputState.rawText;
    } else {
      const strippedAst = stripAutoCurryVarNames(ast);
      if (inputState.format === "expanded") {
        const canonicalBase = ASTToExpandedWithSignatureOptions(
          strippedAst,
          "Condensed",
          inputState.overlay.sig ?? null,
          true
        );
        const overlay = resolveExpandedOverlayNames(
          inputState.overlay,
          canonicalBase
        );
        const modesMap = overlay.modes
          ? new Map(overlay.modes.map((m) => [m.name, m.opts]))
          : undefined;
        const canonicalInput = ASTToExpandedWithSignatureOptions(
          strippedAst,
          "Condensed",
          overlay.sig ?? null,
          true,
          modesMap
        );
        rawInput = applyExpandedOverlay(canonicalInput, overlay);
      } else {
        const canonicalInput =
          formatters[inputState.format].fromAST(strippedAst);
        if (inputState.format === "codeline") {
          rawInput = applyCodeLineOverlay(canonicalInput, inputState.overlay);
        } else if (inputState.format === "json") {
          rawInput = applyJsonOverlay(canonicalInput, inputState.overlay);
        } else {
          rawInput = applyCondensedOverlay(canonicalInput, inputState.overlay);
        }
      }
    }

    restoringState = true;
    inputText.value = rawInput;
    await nextTick(); // let the (guarded) inputText watcher flush while restoring
    restoringState = false;
    transform(true);
    status.value = "Loaded state from URL.";
    return;
  }

  if (updateOutputFromAst(ast, outputFormat.value)) {
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
            wrap="off"
            spellcheck="false"
            aria-label="Transformer input"
            @scroll="syncLineNumberScroll"
          />
        </div>
      </label>

      <div class="transformer-actions">
        <label class="field">
          <span>Initial variable ID</span>
          <input
            v-model.number="initialVariableId"
            class="select"
            type="number"
            min="0"
            step="1"
            aria-label="Initial variable ID"
          />
        </label>

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

        <button :disabled="!canTransform" type="button" @click="transform()">
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
        <LogicProgrammerVisualOutput
          v-else-if="outputFormat === 'visual' && currentAst"
          :ast="currentAst"
          :start-variable-id="initialVariableId"
          :show-step-numbers="true"
          :show-step-titles="true"
          operator-preview-mode="pattern"
          force-show-output-card
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
