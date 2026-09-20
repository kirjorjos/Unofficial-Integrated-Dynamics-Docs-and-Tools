<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import {
  ASTToCodeLine,
  ASTToCompressed,
  ASTToCondensed,
  ASTToExpanded,
  ASTToExpandedWithSignatureOptions,
  ASTtoJSON,
  CodeLineToAST,
  CompressedToAST,
  CondensedToAST,
  ExpandedToAST,
  JSONtoAST,
  decodeSettingsOpts,
  encodeSettingsOpts,
  DEFAULT_TRANSFORMER_SETTINGS,
  type TransformerSettings,
} from "lib";
import type {
  ExpandedSignatureOptions,
  ExpandedToASTOptions,
} from "lib/transformers/Expanded";
import type { ExpandedDisplayOptions } from "lib/transformers/Expanded";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { globalMap } from "lib/HelperClasses/TypeMap";
import FoldableExpandedOutput from "../components/FoldableExpandedOutput.vue";
import LogicProgrammerVisualOutput from "../components/LogicProgrammerVisualOutput.vue";
import TransformerInputDocs from "../components/TransformerInputDocs.vue";
import Tile from "../components/Tile.vue";
import TileGrid from "../components/TileGrid.vue";
import { FULL_TILE_SPAN } from "pages-lib/tileLayout";
import { settingHelpText } from "lib/transformers/settingHelp";
import {
  inputDocExampleInput,
  type InputDocExample,
} from "lib/transformers/inputDocs";
import { detectInputFormat } from "lib/transformers/detectFormat";
import type { TransformerFormatKey } from "lib/transformers/detectFormat";
import type { InputStateSection } from "lib/transformers/Compressed";
import {
  computeCodeLineOverlay,
  computeCondensedOverlay,
  computeExpandedOverlay,
  computeJsonOverlay,
  discoverSignatureRestoreModes,
  stripAutoCurryVarNames,
} from "lib/transformers/inputState";
import { compressWithInputState } from "lib/transformers/Compressed";
import { decodeTransformerUrlCode } from "lib/transformers/decodeUrlState";

type FormatKey = TransformerFormatKey;
type OutputFormatKey = Exclude<FormatKey, "compressed"> | "visual";

const inputText = ref("");
const outputText = ref("");
const outputFormat = ref<OutputFormatKey>("condensed");
const displayedOutputFormat = ref<OutputFormatKey>("condensed");
const inputDirty = ref(false);
const safeToOverwriteInput = ref(true);
const status = ref("");
const outputError = ref("");
const lineNumberOffset = ref(0);
const inputEditor = ref<HTMLTextAreaElement | null>(null);
const expandedOutputViewer = ref<InstanceType<
  typeof FoldableExpandedOutput
> | null>(null);
const currentAst = ref<any>(null);
const settingsPanelOpen = ref(false);
const visualStepIds = ref<string[]>([]);
let restoringState = false;
let loadingExample = false;

const settings = ref<TransformerSettings>({
  ...DEFAULT_TRANSFORMER_SETTINGS,
});

const initialVariableId = computed(() => settings.value.initialVariableId);

type FormatFormatter = {
  label: string;
  toAST: (value: string, opts?: ExpandedToASTOptions) => TypeAST.AST;
  fromAST: (ast: TypeAST.AST) => string;
};

const canonicalFormatters: Record<FormatKey, FormatFormatter> = {
  condensed: {
    label: "Condensed",
    toAST: (value) => CondensedToAST(value, undefined, initialVariableId.value),
    fromAST: (ast) => ASTToCondensed(ast, true, initialVariableId.value),
  },
  expanded: {
    label: "Expanded",
    toAST: (value, opts) => ExpandedToAST(value, initialVariableId.value, opts),
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

const formatters: Record<FormatKey, FormatFormatter> = {
  condensed: {
    label: "Condensed",
    toAST: canonicalFormatters.condensed.toAST,
    fromAST: (ast) =>
      ASTToCondensed(ast, true, initialVariableId.value, false, {
        joinStatements:
          settings.value.statementLayout === "newline" ? "\n" : ";",
        refStyle: settings.value.referenceStyle,
      }),
  },
  expanded: {
    label: "Expanded",
    toAST: canonicalFormatters.expanded.toAST,
    fromAST: (ast) =>
      ASTToExpandedWithSignatureOptions(
        ast,
        "Condensed",
        settingsToSigOpts(settings.value),
        settings.value.preferSourceNames,
        undefined,
        settingsToDisplayOpts(settings.value)
      ),
  },
  codeline: {
    label: "Code Line",
    toAST: canonicalFormatters.codeline.toAST,
    fromAST: (ast) =>
      ASTToCodeLine(ast, true, initialVariableId.value, {
        joinStatements:
          settings.value.statementLayout === "newline" ? "\n" : ";",
        refStyle: settings.value.referenceStyle,
      }),
  },
  compressed: canonicalFormatters.compressed,
  json: canonicalFormatters.json,
};

const settingsToSigOpts = (
  s: TransformerSettings
): ExpandedSignatureOptions | null => ({
  depth: s.signatureDepth === -1 ? null : s.signatureDepth,
  labels: s.depthLabels,
  arrow: s.arrowGlyph,
  hideOperatorWrappers: s.hideOperatorWrappers,
  resolveAnys: s.hardening === "full",
});

const settingsToDisplayOpts = (
  s: TransformerSettings
): ExpandedDisplayOptions => ({
  signatureLayout: s.signatureLayout,
  inlinePlacement: s.inlinePlacement,
  expandedRefForm: s.expandedRefForm,
  variableWrapper: s.variableWrapper,
  lambdaParamSugar: s.lambdaParamSugar,
  comments: s.comments,
  joinStatements: s.statementLayout === "newline" ? "\n" : ";",
  refStyle: s.referenceStyle,
  resolve: s.resolve,
});

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
  return detectInputFormat(raw);
});

const canTransform = computed(() => inputText.value.trim().length > 0);
const canCopyOutput = computed(
  () =>
    !outputError.value &&
    (displayedOutputFormat.value === "visual"
      ? currentAst.value !== null
      : outputText.value.trim().length > 0)
);

const discoverVisualSteps = computed(
  () => displayedOutputFormat.value === "visual" && currentAst.value !== null
);

const onVisualSteps = (ids: string[]): void => {
  visualStepIds.value = ids;
};

watch(discoverVisualSteps, (active) => {
  if (!active) visualStepIds.value = [];
});
const syncLineNumberOffsetFromTextarea = (): void => {
  lineNumberOffset.value = inputEditor.value?.scrollTop ?? 0;
};

const syncLineNumberScroll = (event: Event): void => {
  lineNumberOffset.value = (event.target as HTMLTextAreaElement).scrollTop;
};

const renderOutput = (format: OutputFormatKey, ast: TypeAST.AST): string => {
  return outputFormatters[format].fromAST(ast);
};

const buildStateUrl = (
  code: string | null,
  format: OutputFormatKey | null = outputFormat.value
): string => {
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

  const opts = encodeSettingsOpts(settings.value);
  if (opts !== null) {
    url.searchParams.set("opts", opts);
  } else {
    url.searchParams.delete("opts");
  }

  if (settings.value.initialVariableId !== 0) {
    url.searchParams.set("varId", String(settings.value.initialVariableId));
  } else {
    url.searchParams.delete("varId");
  }

  return url.toString();
};

const updateUrlState = (
  code: string | null,
  format: OutputFormatKey | null = outputFormat.value
): void => {
  window.history.replaceState({}, "", buildStateUrl(code, format));
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

  const canonicalInput = canonicalFormatters[sourceFormat].fromAST(
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

const reproUrl = computed<string | undefined>(() => {
  if (!currentAst.value || !inputText.value.trim()) return undefined;
  try {
    const code = buildUrlCode();
    if (!code) return undefined;
    return buildStateUrl(code);
  } catch {
    return undefined;
  }
});

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
  safeToOverwriteInput.value = loadingExample;
  loadingExample = false;
  inputDirty.value = true;
  await nextTick();
  syncLineNumberOffsetFromTextarea();
});

watch(outputFormat, () => {
  if (inputDirty.value || !currentAst.value || outputError.value) return;
  if (!updateOutputFromAst(currentAst.value, outputFormat.value)) return;
  inputDirty.value = false;
  displayedOutputFormat.value = outputFormat.value;
  updateUrlState(buildUrlCode());
});

watch(
  settings,
  () => {
    const normalized = Number.isFinite(settings.value.initialVariableId)
      ? Math.max(0, Math.trunc(settings.value.initialVariableId))
      : 0;
    if (normalized !== settings.value.initialVariableId) {
      settings.value.initialVariableId = normalized;
      return;
    }

    if (!inputDirty.value && currentAst.value && inputText.value.trim()) {
      transform();
      return;
    }
    if (!inputDirty.value) {
      updateUrlState(buildUrlCode());
    }
  },
  { deep: true }
);

const transform = (skipUrlUpdate: boolean = false): void => {
  try {
    globalMap.clear();
    ParsedSignature.resetTypeIDCounter();
    const rawInput = inputText.value; // untrimmed (no-trim rule)
    const sourceFormat = detectInputFormat(rawInput);
    const dupWarnings: string[] = [];
    const ast = canonicalFormatters[sourceFormat].toAST(rawInput, {
      allowDuplicateNames: settings.value.duplicateNames === "allow",
      warnings: dupWarnings,
      declarationCards: settings.value.declarationCards,
    });
    currentAst.value = ast;
    if (!updateOutputFromAst(ast, outputFormat.value)) return;
    inputDirty.value = false;
    displayedOutputFormat.value = outputFormat.value;
    const dupNote = dupWarnings.length > 0 ? ` ${dupWarnings.join(" ")}` : "";
    status.value = `Detected ${formatters[sourceFormat].label}. Output as ${outputFormatters[outputFormat.value].label}.${dupNote}`;
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
    updateUrlState(code);
  } catch (error) {
    outputText.value = "";
    outputError.value = error instanceof Error ? error.message : String(error);
    status.value = "";
    if (!skipUrlUpdate) {
      updateUrlState(null);
    }
  }
};

const copyOutput = async (): Promise<void> => {
  if (!canCopyOutput.value) return;

  const textToCopy =
    displayedOutputFormat.value === "expanded"
      ? (expandedOutputViewer.value?.getCopyText() ?? outputText.value)
      : displayedOutputFormat.value === "visual" && currentAst.value
        ? currentAst.value.type === "NetworkCards"
          ? ASTToExpanded(currentAst.value)
          : ASTToCondensed(currentAst.value, true, initialVariableId.value)
        : outputText.value;

  await navigator.clipboard.writeText(textToCopy);
  status.value = "Copied output.";
};

const settingEnabled = (setting: string): boolean => {
  const fmt = outputFormat.value;
  switch (setting) {
    case "varId":
    case "wrap":
    case "duplicateNames":
    case "declarationCards":
      return true;
    case "statementLayout":
      return fmt === "codeline" || fmt === "condensed";
    case "referenceStyle":
      return fmt === "codeline" || fmt === "condensed" || fmt === "expanded";
    case "signatureDepth":
    case "depthLabels":
    case "arrowGlyph":
    case "signatureLayout":
    case "inlinePlacement":
    case "expandedRefForm":
    case "comments":
    case "variableWrapper":
    case "lambdaParamSugar":
    case "hardening":
    case "hideOperatorWrappers":
    case "resolve":
    case "preferSourceNames":
      return fmt === "expanded";
    default:
      return true;
  }
};

const loadExample = (example: InputDocExample): void => {
  if (!safeToOverwriteInput.value) {
    const confirmed = window.confirm(
      "Replace the current input with this example?"
    );
    if (!confirmed) return;
  }
  loadingExample = true;
  if (example.output) {
    outputFormat.value = example.output;
  }
  inputText.value = inputDocExampleInput(example);
  transform();
};

onMounted(async () => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const output = url.searchParams.get("output");

  const opts = url.searchParams.get("opts");
  if (opts !== null) {
    settings.value = decodeSettingsOpts(opts);
  }

  const varId = url.searchParams.get("varId");
  if (varId !== null) {
    const parsed = Number.parseInt(varId, 10);
    settings.value.initialVariableId =
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

  const { ast, input } = decodeTransformerUrlCode(code, outputFormat.value, {
    initialVariableId: initialVariableId.value,
  });
  currentAst.value = ast;

  if (input !== null) {
    restoringState = true;
    inputText.value = input;
    await nextTick(); // let the (guarded) inputText watcher flush while restoring
    restoringState = false;
    transform(true);
    status.value = "Loaded state from URL.";
    return;
  }

  if (updateOutputFromAst(ast, outputFormat.value)) {
    inputDirty.value = false;
    displayedOutputFormat.value = outputFormat.value;
    status.value = "Loaded output from URL.";
  }
});
</script>

<template>
  <article class="doc-page">
    <LogicProgrammerVisualOutput
      v-if="discoverVisualSteps"
      :ast="currentAst"
      :start-variable-id="initialVariableId"
      operator-preview-mode="pattern"
      discovery-only
      @steps="onVisualSteps"
    />

    <TileGrid v-slot="{ resetLayout }">
      <Tile id="title" :span="FULL_TILE_SPAN">
        <div class="tile-title-block">
          <div class="tile-title-text">
            <h2>Transformers</h2>
            <p>
              Transform from auto-detected input form to selected output form.
            </p>
          </div>
          <div class="tile-actions">
            <button type="button" class="tile-reset" @click="resetLayout">
              Reset layout
            </button>
          </div>
        </div>
      </Tile>

      <Tile id="docs" :span="2">
        <TransformerInputDocs @load-example="loadExample" />
      </Tile>

      <Tile id="input" :span="2">
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
              :wrap="settings.wrap ? 'soft' : 'off'"
              spellcheck="false"
              aria-label="Transformer input"
              @scroll="syncLineNumberScroll"
            />
          </div>
        </label>
      </Tile>

      <Tile id="settings" :span="1">
        <details class="settings-panel" :open="settingsPanelOpen">
          <summary
            class="settings-summary"
            @click.prevent="settingsPanelOpen = !settingsPanelOpen"
          >
            Settings
          </summary>
          <div class="settings-body">
            <div class="settings-row">
              <label
                class="settings-label"
                for="setting-varid"
                :data-help="settingHelpText('initialVariableId')"
              >
                Initial variable ID<sup
                  class="settings-help-mark"
                  aria-hidden="true"
                  >?</sup
                >
              </label>
              <input
                id="setting-varid"
                v-model.number="settings.initialVariableId"
                class="select"
                type="number"
                min="0"
                step="1"
                aria-label="Initial variable ID"
              />
            </div>

            <div
              class="settings-row"
              :class="{ disabled: !settingEnabled('signatureDepth') }"
            >
              <label
                class="settings-label"
                for="setting-depth"
                :data-help="settingHelpText('signatureDepth')"
              >
                Signature depth (-1 = unlimited)<sup
                  class="settings-help-mark"
                  aria-hidden="true"
                  >?</sup
                >
              </label>
              <input
                id="setting-depth"
                v-model.number="settings.signatureDepth"
                class="select"
                type="number"
                min="-1"
                step="1"
                :disabled="!settingEnabled('signatureDepth')"
                aria-label="Signature depth"
              />
            </div>

            <div
              class="settings-row"
              :class="{ disabled: !settingEnabled('depthLabels') }"
            >
              <label
                class="settings-label"
                for="setting-labels"
                :data-help="settingHelpText('depthLabels')"
              >
                Operator depth labels<sup
                  class="settings-help-mark"
                  aria-hidden="true"
                  >?</sup
                >
              </label>
              <input
                id="setting-labels"
                v-model="settings.depthLabels"
                type="checkbox"
                :disabled="!settingEnabled('depthLabels')"
                aria-label="Operator depth labels"
              />
            </div>

            <div
              class="settings-row"
              :class="{ disabled: !settingEnabled('arrowGlyph') }"
            >
              <label
                class="settings-label"
                for="setting-arrow"
                :data-help="settingHelpText('arrowGlyph')"
              >
                Arrow glyph<sup class="settings-help-mark" aria-hidden="true"
                  >?</sup
                >
              </label>
              <select
                id="setting-arrow"
                v-model="settings.arrowGlyph"
                class="select"
                :disabled="!settingEnabled('arrowGlyph')"
                aria-label="Arrow glyph"
              >
                <option value="→">→ (unicode)</option>
                <option value="->">-&gt; (ascii)</option>
              </select>
            </div>

            <div
              class="settings-row"
              :class="{ disabled: !settingEnabled('signatureLayout') }"
            >
              <label
                class="settings-label"
                for="setting-siglayout"
                :data-help="settingHelpText('signatureLayout')"
              >
                Signature lines<sup
                  class="settings-help-mark"
                  aria-hidden="true"
                  >?</sup
                >
              </label>
              <select
                id="setting-siglayout"
                v-model="settings.signatureLayout"
                class="select"
                :disabled="!settingEnabled('signatureLayout')"
                aria-label="Signature lines"
              >
                <option value="own-line">Own line</option>
                <option value="inline">Inline</option>
              </select>
            </div>

            <div
              class="settings-row"
              :class="{
                disabled:
                  !settingEnabled('inlinePlacement') ||
                  settings.signatureLayout !== 'inline',
              }"
            >
              <label
                class="settings-label"
                for="setting-inline-placement"
                :data-help="settingHelpText('inlinePlacement')"
              >
                Inline signature placement<sup
                  class="settings-help-mark"
                  aria-hidden="true"
                  >?</sup
                >
              </label>
              <select
                id="setting-inline-placement"
                v-model="settings.inlinePlacement"
                class="select"
                :disabled="
                  !settingEnabled('inlinePlacement') ||
                  settings.signatureLayout !== 'inline'
                "
                aria-label="Inline signature placement"
              >
                <option value="after">After definition</option>
                <option value="before">Before definition</option>
              </select>
            </div>

            <div
              class="settings-row"
              :class="{ disabled: !settingEnabled('statementLayout') }"
            >
              <label
                class="settings-label"
                for="setting-statement-layout"
                :data-help="settingHelpText('statementLayout')"
              >
                Statement layout<sup
                  class="settings-help-mark"
                  aria-hidden="true"
                  >?</sup
                >
              </label>
              <select
                id="setting-statement-layout"
                v-model="settings.statementLayout"
                class="select"
                :disabled="!settingEnabled('statementLayout')"
                aria-label="Statement layout"
              >
                <option value="same-line">Same line</option>
                <option value="newline">One per line</option>
              </select>
            </div>

            <div
              class="settings-row"
              :class="{ disabled: !settingEnabled('referenceStyle') }"
            >
              <label
                class="settings-label"
                for="setting-ref-style"
                :data-help="settingHelpText('referenceStyle')"
              >
                Reference style<sup
                  class="settings-help-mark"
                  aria-hidden="true"
                  >?</sup
                >
              </label>
              <select
                id="setting-ref-style"
                v-model="settings.referenceStyle"
                class="select"
                :disabled="!settingEnabled('referenceStyle')"
                aria-label="Reference style"
              >
                <option value="varId">Var ID</option>
                <option value="refs">@refs</option>
              </select>
            </div>

            <div
              class="settings-row"
              :class="{ disabled: !settingEnabled('expandedRefForm') }"
            >
              <label
                class="settings-label"
                for="setting-expanded-ref-form"
                :data-help="settingHelpText('expandedRefForm')"
              >
                Expanded ref form<sup
                  class="settings-help-mark"
                  aria-hidden="true"
                  >?</sup
                >
              </label>
              <select
                id="setting-expanded-ref-form"
                v-model="settings.expandedRefForm"
                class="select"
                :disabled="!settingEnabled('expandedRefForm')"
                aria-label="Expanded ref form"
              >
                <option value="varId">Var ID</option>
                <option value="name">@name</option>
              </select>
            </div>

            <div
              class="settings-row"
              :class="{ disabled: !settingEnabled('wrap') }"
            >
              <label
                class="settings-label"
                for="setting-wrap"
                :data-help="settingHelpText('wrap')"
              >
                Wrap vs scroll<sup class="settings-help-mark" aria-hidden="true"
                  >?</sup
                >
              </label>
              <select
                id="setting-wrap"
                v-model="settings.wrap"
                class="select"
                aria-label="Wrap vs scroll"
              >
                <option :value="false">Current defaults</option>
                <option :value="true">Flipped</option>
              </select>
            </div>

            <div
              class="settings-row"
              :class="{ disabled: !settingEnabled('comments') }"
            >
              <label
                class="settings-label"
                for="setting-comments"
                :data-help="settingHelpText('comments')"
              >
                Preserve comments<sup
                  class="settings-help-mark"
                  aria-hidden="true"
                  >?</sup
                >
              </label>
              <input
                id="setting-comments"
                v-model="settings.comments"
                type="checkbox"
                :disabled="!settingEnabled('comments')"
                aria-label="Preserve comments"
              />
            </div>

            <div
              class="settings-row"
              :class="{ disabled: !settingEnabled('declarationCards') }"
            >
              <label
                class="settings-label"
                for="setting-declaration-cards"
                :data-help="settingHelpText('declarationCards')"
              >
                Declaration-only operators<sup
                  class="settings-help-mark"
                  aria-hidden="true"
                  >?</sup
                >
              </label>
              <select
                id="setting-declaration-cards"
                v-model="settings.declarationCards"
                class="select"
                :disabled="!settingEnabled('declarationCards')"
                aria-label="Declaration-only operators"
              >
                <option value="ignore">Accept and ignore</option>
                <option value="add">Accept and add card</option>
              </select>
            </div>

            <div
              class="settings-row"
              :class="{ disabled: !settingEnabled('variableWrapper') }"
            >
              <label
                class="settings-label"
                for="setting-variable-wrapper"
                :data-help="settingHelpText('variableWrapper')"
              >
                Variable("name") wrapper<sup
                  class="settings-help-mark"
                  aria-hidden="true"
                  >?</sup
                >
              </label>
              <input
                id="setting-variable-wrapper"
                v-model="settings.variableWrapper"
                type="checkbox"
                :disabled="!settingEnabled('variableWrapper')"
                aria-label="Variable wrapper"
              />
            </div>

            <div
              class="settings-row"
              :class="{ disabled: !settingEnabled('lambdaParamSugar') }"
            >
              <label
                class="settings-label"
                for="setting-lambda-sugar"
                :data-help="settingHelpText('lambdaParamSugar')"
              >
                Lambda-param sugar<sup
                  class="settings-help-mark"
                  aria-hidden="true"
                  >?</sup
                >
              </label>
              <input
                id="setting-lambda-sugar"
                v-model="settings.lambdaParamSugar"
                type="checkbox"
                :disabled="!settingEnabled('lambdaParamSugar')"
                aria-label="Lambda-param sugar"
              />
            </div>

            <div
              class="settings-row"
              :class="{ disabled: !settingEnabled('duplicateNames') }"
            >
              <label
                class="settings-label"
                for="setting-dup-names"
                :data-help="settingHelpText('duplicateNames')"
              >
                Duplicate names<sup
                  class="settings-help-mark"
                  aria-hidden="true"
                  >?</sup
                >
              </label>
              <select
                id="setting-dup-names"
                v-model="settings.duplicateNames"
                class="select"
                aria-label="Duplicate names"
              >
                <option value="error">Hard error</option>
                <option value="allow">Allow + warning</option>
              </select>
            </div>

            <div
              class="settings-row"
              :class="{ disabled: !settingEnabled('hardening') }"
            >
              <label
                class="settings-label"
                for="setting-hardening"
                :data-help="settingHelpText('hardening')"
              >
                Hardening logic<sup
                  class="settings-help-mark"
                  aria-hidden="true"
                  >?</sup
                >
              </label>
              <select
                id="setting-hardening"
                v-model="settings.hardening"
                class="select"
                :disabled="!settingEnabled('hardening')"
                aria-label="Hardening logic"
              >
                <option value="inGame">In-game (lhs)</option>
                <option value="full">Full (rhs)</option>
              </select>
            </div>

            <div
              class="settings-row"
              :class="{ disabled: !settingEnabled('hideOperatorWrappers') }"
            >
              <label
                class="settings-label"
                for="setting-hide-op-wrappers"
                :data-help="settingHelpText('hideOperatorWrappers')"
              >
                Hide operator wrappers<sup
                  class="settings-help-mark"
                  aria-hidden="true"
                  >?</sup
                >
              </label>
              <input
                id="setting-hide-op-wrappers"
                v-model="settings.hideOperatorWrappers"
                type="checkbox"
                :disabled="!settingEnabled('hideOperatorWrappers')"
                aria-label="Hide operator wrappers"
              />
            </div>

            <div
              class="settings-row"
              :class="{ disabled: !settingEnabled('resolve') }"
            >
              <label
                class="settings-label"
                for="setting-resolve"
                :data-help="settingHelpText('resolve')"
              >
                Resolve (display face)<sup
                  class="settings-help-mark"
                  aria-hidden="true"
                  >?</sup
                >
              </label>
              <input
                id="setting-resolve"
                v-model="settings.resolve"
                type="checkbox"
                :disabled="!settingEnabled('resolve')"
                aria-label="Resolve display face"
              />
            </div>

            <div
              class="settings-row"
              :class="{ disabled: !settingEnabled('preferSourceNames') }"
            >
              <label
                class="settings-label"
                for="setting-source-names"
                :data-help="settingHelpText('preferSourceNames')"
              >
                Source-name preference<sup
                  class="settings-help-mark"
                  aria-hidden="true"
                  >?</sup
                >
              </label>
              <input
                id="setting-source-names"
                v-model="settings.preferSourceNames"
                type="checkbox"
                :disabled="!settingEnabled('preferSourceNames')"
                aria-label="Source-name preference"
              />
            </div>
          </div>
        </details>
      </Tile>

      <Tile id="format" :span="1">
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

          <button :disabled="!canTransform" type="button" @click="transform()">
            Transform
          </button>
        </div>
      </Tile>

      <Tile id="output" :span="2">
        <label class="field">
          <span>{{ outputFormatters[displayedOutputFormat].label }}</span>
          <div v-if="outputError" class="output-error" v-text="outputError" />
          <FoldableExpandedOutput
            v-else-if="displayedOutputFormat === 'expanded'"
            ref="expandedOutputViewer"
            :text="outputText"
            :class="{ 'scroll-mode': settings.wrap }"
          />
          <textarea
            v-else-if="displayedOutputFormat !== 'visual'"
            :value="outputText"
            class="editor"
            :wrap="settings.wrap ? 'off' : 'soft'"
            spellcheck="false"
            :aria-label="outputFormatters[displayedOutputFormat].label"
            readonly
          />
        </label>

        <div class="tile-actions">
          <button :disabled="!canCopyOutput" type="button" @click="copyOutput">
            Copy output
          </button>
        </div>

        <p v-if="status" class="status">{{ status }}</p>
      </Tile>

      <Tile
        v-for="(stepId, index) in visualStepIds"
        :key="stepId"
        :id="`step${index}`"
        :span="2"
      >
        <LogicProgrammerVisualOutput
          v-if="currentAst"
          :ast="currentAst"
          :start-variable-id="initialVariableId"
          :show-step-numbers="true"
          :show-step-titles="true"
          :render-step-id="stepId"
          operator-preview-mode="pattern"
          force-show-output-card
          :repro-url="reproUrl"
        />
      </Tile>
    </TileGrid>
  </article>
</template>
