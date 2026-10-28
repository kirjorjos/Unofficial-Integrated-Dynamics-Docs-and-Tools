<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import Tile from "../components/Tile.vue";
import TileGrid from "../components/TileGrid.vue";
import NbtTreeView from "../components/NbtTreeView.vue";
import LogicProgrammerVisualOutput from "../components/LogicProgrammerVisualOutput.vue";
import { FULL_TILE_SPAN } from "pages-lib/tileLayout";
import { compressWithInputState } from "lib/transformers/Compressed";
import {
  buildCallString,
  buildExpandedSource,
  buildNbtTree,
  buildPreviewAst,
  decodeNbtPaste,
  encodeNbtPaste,
  extractNbtBlobs,
  findNbtNode,
  isValidSelectionName,
  minimizeNamedPath,
  substituteTemplate,
  type NbtPathOperator,
  type NbtPathSegment,
  type NbtTreeNode,
} from "lib/transformers/nbtTools";

const NBT_PARAM = "nbt";
const NBT_URL_WRITE_DELAY = 300;

const readSnbtFromUrl = (): string => {
  const raw = new URL(window.location.href).searchParams.get(NBT_PARAM);
  return raw === null ? "" : (decodeNbtPaste(raw) ?? "");
};

const snbtInput = ref(readSnbtFromUrl());
const activeBlobIndex = ref(0);
const selectedSegments = ref<NbtPathSegment[] | null>(null);
const nameDraft = ref("");
const nameError = ref("");
const droppedNotice = ref("");
const operator = ref<NbtPathOperator>("matchFirst");
const templateText = ref("");
const templateTouched = ref(false);
const copiedLabel = ref("");

interface NamedEntry {
  name: string;
  segments: NbtPathSegment[];
}

const namedEntries = ref<NamedEntry[]>([]);

const extraction = computed(() => extractNbtBlobs(snbtInput.value));
const blobs = computed(() => extraction.value.blobs);
const inputWarnings = computed(() => extraction.value.warnings);
const activeBlob = computed(() => blobs.value[activeBlobIndex.value]);

let nbtUrlTimer: number | null = null;

const writeSnbtToUrl = (): void => {
  const url = new URL(window.location.href);
  if (snbtInput.value === "") {
    url.searchParams.delete(NBT_PARAM);
  } else {
    try {
      url.searchParams.set(
        NBT_PARAM,
        encodeNbtPaste(blobs.value, snbtInput.value)
      );
    } catch {
      return;
    }
  }
  window.history.replaceState({}, "", url.toString());
};

watch(snbtInput, () => {
  if (nbtUrlTimer !== null) window.clearTimeout(nbtUrlTimer);
  nbtUrlTimer = window.setTimeout(() => {
    nbtUrlTimer = null;
    writeSnbtToUrl();
  }, NBT_URL_WRITE_DELAY);
});

onBeforeUnmount(() => {
  if (nbtUrlTimer === null) return;
  window.clearTimeout(nbtUrlTimer);
  nbtUrlTimer = null;
  writeSnbtToUrl();
});
const tree = computed(() =>
  activeBlob.value ? buildNbtTree(activeBlob.value.tag) : undefined
);

const templateTokens: { tokens: string[]; meaning: string }[] = [
  {
    tokens: ["$name"],
    meaning:
      "That selection's path, substituted in before validation: $a becomes .stats.health.",
  },
  {
    tokens: ["> 5", ">= 5", "< 5", "<= 5"],
    meaning:
      "Compares the value at that point to a number: 1b when it holds, else 0b.",
  },
  {
    tokens: ['== "Steve"'],
    meaning: "Compares the value to a string literal: 1b when equal, else 0b.",
  },
  {
    tokens: [".length"],
    meaning: "Entry count of the list or compound at that point.",
  },
  {
    tokens: ["[?(…)]"],
    meaning: "Keeps only the children the inner expression holds for.",
  },
  {
    tokens: ["@"],
    meaning: "The node the surrounding filter is checking.",
  },
];

const operatorOptions: { value: NbtPathOperator; label: string }[] = [
  { value: "matchFirst", label: "nbtPathMatchFirst" },
  { value: "matchAll", label: "nbtPathMatchAll" },
  { value: "test", label: "nbtPathTest" },
];

const countNodes = (node: NbtTreeNode): number =>
  1 + node.children.reduce((total, child) => total + countNodes(child), 0);

// --- Expansion -------------------------------------------------------------

const expandedIds = ref<Set<string>>(new Set());

const resetExpansion = (): void => {
  const next = new Set<string>();
  const walk = (node: NbtTreeNode): void => {
    // Collapse everything deeper than depth 2 by default.
    if (node.children.length > 0 && node.segments.length < 2) next.add(node.id);
    node.children.forEach(walk);
  };
  if (tree.value) walk(tree.value);
  expandedIds.value = next;
};

const toggleNode = (id: string): void => {
  const next = new Set(expandedIds.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  expandedIds.value = next;
};

const expandAll = (): void => {
  if (!tree.value) return;
  if (
    countNodes(tree.value) > 5000 &&
    !window.confirm(
      "This blob is very large; expanding everything may be slow. Continue?"
    )
  ) {
    return;
  }
  const next = new Set<string>();
  const walk = (node: NbtTreeNode): void => {
    if (node.children.length > 0) next.add(node.id);
    node.children.forEach(walk);
  };
  walk(tree.value);
  expandedIds.value = next;
};

const collapseAll = (): void => {
  // Keep the root open so the top-level entries stay reachable.
  expandedIds.value = tree.value ? new Set([tree.value.id]) : new Set();
};

// --- Selection -------------------------------------------------------------

const selectedNode = computed<NbtTreeNode | undefined>(() =>
  tree.value && selectedSegments.value
    ? findNbtNode(tree.value, selectedSegments.value)
    : undefined
);

const selectedPath = computed(() => selectedNode.value?.path ?? null);
const selectedIsArray = computed(
  () => selectedNode.value?.container === "array"
);

const selectNode = (node: NbtTreeNode): void => {
  selectedSegments.value = node.segments;
  nameDraft.value = nameDraft.value || "";
  nameError.value = "";
};

// --- Named paths -----------------------------------------------------------

const nodeFor = (entry: NamedEntry): NbtTreeNode | undefined =>
  tree.value ? findNbtNode(tree.value, entry.segments) : undefined;

const namedNodes = computed(() =>
  namedEntries.value
    .map(nodeFor)
    .filter((node): node is NbtTreeNode => node !== undefined)
);

const nameToPath = computed<Record<string, string>>(() => {
  const map: Record<string, string> = {};
  for (const entry of namedEntries.value) {
    const node = nodeFor(entry);
    if (node?.path) map[entry.name] = node.path;
  }
  return map;
});

const addName = (): void => {
  const name = nameDraft.value.trim();
  const node = selectedNode.value;
  if (!node) {
    nameError.value = "Select a key in the tree first.";
    return;
  }
  if (node.path === null) {
    nameError.value = "This node cannot be addressed by a 1.19.2 path.";
    return;
  }
  if (!isValidSelectionName(name)) {
    nameError.value = "Names must match [A-Za-z_][A-Za-z0-9_]*.";
    return;
  }
  if (namedEntries.value.some((entry) => entry.name === name)) {
    nameError.value = `The name "${name}" is already used.`;
    return;
  }
  namedEntries.value = [
    ...namedEntries.value,
    { name, segments: node.segments },
  ];
  nameDraft.value = "";
  nameError.value = "";
};

const renameName = (index: number, value: string, target: HTMLInputElement) => {
  const name = value.trim();
  const entry = namedEntries.value[index];
  if (!entry) return;
  if (!isValidSelectionName(name)) {
    nameError.value = "Names must match [A-Za-z_][A-Za-z0-9_]*.";
    target.value = entry.name;
    return;
  }
  if (
    namedEntries.value.some(
      (other, otherIndex) => otherIndex !== index && other.name === name
    )
  ) {
    nameError.value = `The name "${name}" is already used.`;
    target.value = entry.name;
    return;
  }
  namedEntries.value = namedEntries.value.map((current, currentIndex) =>
    currentIndex === index ? { ...current, name } : current
  );
  if (templateTouched.value) {
    // Rewrite the placeholder so the template keeps referring to this entry.
    templateText.value = templateText.value.replace(
      new RegExp(`\\$${entry.name}\\b`, "g"),
      `$${name}`
    );
  }
  nameError.value = "";
};

const onRenameInput = (index: number, event: Event): void => {
  const target = event.target as HTMLInputElement;
  renameName(index, target.value, target);
};

const removeName = (index: number): void => {
  namedEntries.value = namedEntries.value.filter(
    (_entry, currentIndex) => currentIndex !== index
  );
};

// --- Generated path --------------------------------------------------------

type GeneratedPath = { path: string } | { error: string };

const pathResult = computed<GeneratedPath>(() => {
  if (!tree.value) return { error: "" };
  if (namedEntries.value.length === 0) {
    return { error: "Name a selection to generate a path." };
  }
  if (operator.value === "matchFirst") {
    if (namedEntries.value.length !== 1) {
      return { error: "nbtPathMatchFirst needs exactly one named selection." };
    }
    const path = nameToPath.value[namedEntries.value[0]!.name];
    if (path === undefined) {
      return { error: "This node cannot be addressed by a 1.19.2 path." };
    }
    return { path };
  }
  if (operator.value === "matchAll") {
    return minimizeNamedPath(tree.value, namedNodes.value);
  }
  if (templateText.value.trim() === "") {
    return { error: "Write a logic template, for example $a > 5." };
  }
  const result = substituteTemplate(templateText.value, nameToPath.value);
  return result.ok ? { path: result.path } : { error: result.error };
});

const pathError = computed(() =>
  "error" in pathResult.value ? pathResult.value.error : ""
);
const generatedPath = computed(() =>
  "path" in pathResult.value ? pathResult.value.path : null
);

const literalPath = computed<string | null>(() => {
  if (namedEntries.value.length === 1) {
    return nameToPath.value[namedEntries.value[0]!.name] ?? null;
  }
  if (namedEntries.value.length > 1 && tree.value) {
    const result = minimizeNamedPath(tree.value, namedNodes.value);
    return "path" in result ? result.path : null;
  }
  return selectedPath.value;
});

// R19: an invalid edit keeps the last valid preview on screen.
const lastValidPaths = ref<Record<NbtPathOperator, string | null>>({
  test: null,
  matchFirst: null,
  matchAll: null,
});

watch(
  [generatedPath, operator],
  ([path, currentOperator]) => {
    if (path !== null) {
      lastValidPaths.value = {
        ...lastValidPaths.value,
        [currentOperator]: path,
      };
    }
  },
  { immediate: true }
);

const previewPath = computed(
  () => generatedPath.value ?? lastValidPaths.value[operator.value]
);
const previewIsStale = computed(
  () => generatedPath.value === null && previewPath.value !== null
);

const previewAst = computed(() =>
  previewPath.value === null
    ? null
    : buildPreviewAst(operator.value, previewPath.value)
);

const previewStepIds = ref<string[]>([]);
const finalPreviewStepId = computed(() => previewStepIds.value.at(-1) ?? null);

const onPreviewSteps = (ids: string[]): void => {
  previewStepIds.value = ids;
};

const logicText = computed(() => {
  if (generatedPath.value === null) return "";
  return operator.value === "test"
    ? generatedPath.value
    : buildCallString(operator.value, generatedPath.value);
});

// --- Side effects ----------------------------------------------------------

watch(
  tree,
  () => {
    resetExpansion();
    if (!tree.value) return;
    const kept: NamedEntry[] = [];
    const dropped: string[] = [];
    for (const entry of namedEntries.value) {
      if (findNbtNode(tree.value, entry.segments)) kept.push(entry);
      else dropped.push(entry.name);
    }
    if (dropped.length > 0) {
      namedEntries.value = kept;
      droppedNotice.value = `Dropped ${dropped.length} ${
        dropped.length === 1
          ? "name that no longer resolves"
          : "names that no longer resolve"
      }: ${dropped.join(", ")}`;
    } else {
      droppedNotice.value = "";
    }
    if (
      selectedSegments.value &&
      !findNbtNode(tree.value, selectedSegments.value)
    ) {
      selectedSegments.value = null;
    }
  },
  { immediate: true }
);

watch(
  blobs,
  (value) => {
    if (activeBlobIndex.value >= value.length) activeBlobIndex.value = 0;
  },
  { deep: false }
);

watch(namedEntries, () => {
  if (
    !templateTouched.value &&
    namedEntries.value.length === 1 &&
    templateText.value.trim() === ""
  ) {
    templateText.value = `$${namedEntries.value[0]!.name}`;
  }
});

const onTemplateInput = (event: Event): void => {
  templateText.value = (event.target as HTMLTextAreaElement).value;
  templateTouched.value = true;
};

const copy = async (text: string, label: string): Promise<void> => {
  if (!text) return;
  await navigator.clipboard.writeText(text);
  copiedLabel.value = label;
  window.setTimeout(() => {
    copiedLabel.value = "";
  }, 1500);
};

const openInTransformer = (): void => {
  if (generatedPath.value === null) return;
  const ast = buildPreviewAst(operator.value, generatedPath.value);
  const rawText = buildExpandedSource(operator.value, generatedPath.value);
  const code = compressWithInputState(ast, "visual", {
    format: "expanded",
    mode: "raw",
    rawText,
  });
  const url = new URL(window.location.href);
  url.searchParams.set("code", code);
  url.searchParams.set("output", "visual");
  url.hash = "transformers";
  window.location.href = url.toString();
};
</script>

<template>
  <article class="doc-page">
    <TileGrid v-slot="{ resetLayout }">
      <Tile id="title" :span="FULL_TILE_SPAN">
        <div class="tile-title-block">
          <div class="tile-title-text">
            <h2>NBT tools</h2>
            <p>
              Paste SNBT, format it like JSON.stringify(…, null, 2), click a key
              to get the NBT path the 1.19.2 operators expect.
            </p>
          </div>
          <div class="tile-actions">
            <button type="button" class="tile-reset" @click="resetLayout">
              Reset layout
            </button>
          </div>
        </div>
      </Tile>

      <Tile id="input" :span="2">
        <label class="field">
          <span>SNBT input</span>
          <textarea
            v-model="snbtInput"
            class="editor nbt-input"
            spellcheck="false"
            aria-label="SNBT input"
            placeholder="Paste SNBT, a /give, /setblock or data get command here…"
          />
        </label>

        <div v-if="blobs.length > 1" class="field nbt-blob-select">
          <label for="nbt-blob">Blob</label>
          <select
            id="nbt-blob"
            v-model.number="activeBlobIndex"
            aria-label="Blob"
          >
            <option v-for="blob in blobs" :key="blob.index" :value="blob.index">
              {{ blob.index + 1 }}: {{ blob.label }}
            </option>
          </select>
        </div>

        <p v-if="copiedLabel" class="status">{{ copiedLabel }}</p>
        <ul v-if="inputWarnings.length > 0" class="status warnings">
          <li v-for="(warning, index) in inputWarnings" :key="index">
            {{ warning }}
          </li>
        </ul>
      </Tile>

      <Tile id="tree" :span="2">
        <div class="nbt-tree-header">
          <span>Formatted tree</span>
          <span class="tile-actions">
            <button type="button" :disabled="!tree" @click="expandAll">
              Expand all
            </button>
            <button type="button" :disabled="!tree" @click="collapseAll">
              Collapse all
            </button>
          </span>
        </div>
        <div v-if="tree" class="nbt-tree-scroll">
          <NbtTreeView
            :node="tree"
            :expanded="expandedIds"
            :selected-id="selectedSegments ? (selectedNode?.id ?? null) : null"
            @toggle="toggleNode"
            @select="selectNode"
          />
        </div>
        <p v-else class="nbt-empty">Paste SNBT to see the formatted tree.</p>
      </Tile>

      <Tile id="selection" :span="1">
        <div class="field">
          <span>Selection</span>
          <template v-if="selectedNode">
            <code class="nbt-path" data-testid="selected-path">{{
              selectedPath ?? "not addressable"
            }}</code>
            <p v-if="selectedIsArray" class="nbt-note">
              Array elements are not addressable in 1.19.2; the array tag itself
              is addressed as a whole.
            </p>
          </template>
          <p v-else class="nbt-empty">Select a key in the tree.</p>
        </div>

        <div class="field">
          <label for="nbt-name">Name</label>
          <div class="nbt-name-row">
            <input
              id="nbt-name"
              v-model="nameDraft"
              type="text"
              placeholder="name"
              aria-label="Selection name"
              :disabled="!selectedNode || selectedPath === null"
              @keydown.enter="addName"
            />
            <button
              type="button"
              :disabled="!selectedNode || selectedPath === null"
              @click="addName"
            >
              Add
            </button>
          </div>
          <p v-if="nameError" class="nbt-error">{{ nameError }}</p>
        </div>

        <div class="field">
          <span>Named paths</span>
          <ul v-if="namedEntries.length > 0" class="nbt-name-list">
            <li v-for="(entry, index) in namedEntries" :key="index">
              <input
                :value="entry.name"
                type="text"
                aria-label="Path name"
                @change="onRenameInput(index, $event)"
              />
              <code data-testid="named-path">{{ nodeFor(entry)?.path }}</code>
              <button type="button" @click="removeName(index)">Remove</button>
            </li>
          </ul>
          <p v-else class="nbt-empty">
            Name one or more selections to build a path.
          </p>
          <p v-if="droppedNotice" class="nbt-note">{{ droppedNotice }}</p>
        </div>

        <div class="tile-actions">
          <button
            type="button"
            :disabled="!literalPath"
            data-testid="copy-path"
            @click="copy(literalPath ?? '', 'Copied path.')"
          >
            Copy path
          </button>
        </div>
      </Tile>

      <Tile id="output" :span="2">
        <div class="nbt-operator-row" role="radiogroup" aria-label="Operator">
          <label v-for="option in operatorOptions" :key="option.value">
            <input
              v-model="operator"
              type="radio"
              name="nbt-path-operator"
              :value="option.value"
            />
            {{ option.label }}
          </label>
        </div>

        <div v-if="operator === 'test'" class="field">
          <label for="nbt-template">Logic template</label>
          <textarea
            id="nbt-template"
            :value="templateText"
            class="editor nbt-template"
            spellcheck="false"
            aria-label="Logic template"
            placeholder="$name > 5"
            @input="onTemplateInput"
          />
          <div class="nbt-help" data-testid="template-help">
            <table class="nbt-token-table">
              <thead>
                <tr>
                  <th scope="col">Token</th>
                  <th scope="col">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="entry in templateTokens" :key="entry.meaning">
                  <td class="nbt-token-cell">
                    <code v-for="token in entry.tokens" :key="token">{{
                      token
                    }}</code>
                  </td>
                  <td>{{ entry.meaning }}</td>
                </tr>
              </tbody>
            </table>
            <span class="nbt-help-note">
              <code>&&</code>, <code>||</code>, <code>!</code> and grouping
              parentheses are not part of the grammar.
            </span>
          </div>
        </div>

        <p v-if="pathError" class="nbt-error" data-testid="path-error">
          {{ pathError }}
        </p>

        <p v-if="previewIsStale" class="nbt-note" data-testid="stale-preview">
          Showing the last valid preview.
        </p>

        <div v-if="previewAst" class="nbt-preview">
          <LogicProgrammerVisualOutput
            :ast="previewAst"
            :start-variable-id="0"
            discovery-only
            @steps="onPreviewSteps"
          />
          <LogicProgrammerVisualOutput
            v-if="finalPreviewStepId"
            :ast="previewAst"
            :start-variable-id="0"
            :show-step-numbers="false"
            :show-step-titles="false"
            :show-display-panels="false"
            :render-step-id="finalPreviewStepId"
            operator-preview-mode="value"
          />
        </div>

        <div class="tile-actions">
          <button
            type="button"
            :disabled="!logicText"
            data-testid="copy-logic"
            @click="copy(logicText, 'Copied logic.')"
          >
            Copy logic
          </button>
          <button
            type="button"
            :disabled="generatedPath === null"
            data-testid="open-transformer"
            @click="openInTransformer"
          >
            Open in transformer
          </button>
        </div>
      </Tile>
    </TileGrid>
  </article>
</template>

<style scoped>
.nbt-input {
  min-height: 8rem;
}

.nbt-blob-select {
  margin-top: 0.5rem;
}

.nbt-tree-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
  font-size: 0.8rem;
  color: #35545f;
}

.nbt-tree-scroll {
  max-height: 24rem;
  overflow: auto;
  padding: 0.4rem;
  border: 1px solid #e1e5e8;
  border-radius: 0.35rem;
  background: #f6f7f8;
}

.nbt-path {
  display: inline-block;
  padding: 0.2rem 0.4rem;
  border: 1px solid #e1e5e8;
  border-radius: 0.25rem;
  background: #f6f7f8;
  color: #1f2328;
  font-size: 0.85rem;
  word-break: break-all;
}

.nbt-note {
  margin: 0.3rem 0 0;
  font-size: 0.75rem;
  color: #5b6b74;
}

.nbt-empty {
  margin: 0.3rem 0 0;
  font-size: 0.8rem;
  color: #6b7a83;
}

.nbt-error {
  margin: 0.3rem 0 0;
  font-size: 0.8rem;
  color: #ff8a8a;
}

.nbt-name-row {
  display: flex;
  gap: 0.35rem;
}

.nbt-name-list {
  list-style: none;
  margin: 0.25rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.nbt-name-list li {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.nbt-name-list input {
  width: 6rem;
}

.nbt-name-list code {
  padding: 0.15rem 0.35rem;
  border: 1px solid #e1e5e8;
  border-radius: 0.25rem;
  background: #f6f7f8;
  color: #1f2328;
  font-size: 0.75rem;
  word-break: break-all;
}

.nbt-help {
  display: block;
  padding: 0.5rem 0.6rem;
  border-radius: 0.35rem;
  background: #e7eaec;
  color: #000000;
  font-size: 0.75rem;
}

.nbt-token-table {
  border-collapse: collapse;
  width: 100%;
}

.nbt-token-table th {
  padding: 0 0.5rem 0.2rem 0;
  border-bottom: 1px solid #c3c9cd;
  color: #333333;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-align: left;
  text-transform: uppercase;
}

.nbt-token-table td {
  padding: 0.2rem 0.5rem 0.2rem 0;
  vertical-align: top;
}

.nbt-token-cell {
  width: 1%;
  white-space: nowrap;
}

.nbt-token-table code {
  display: inline-block;
  margin-right: 0.2rem;
  padding: 0.02rem 0.3rem;
  border: 1px solid #aeb7bc;
  border-radius: 0.25rem;
  background: #ffffff;
  color: #0451a5;
  font-weight: 600;
}

.nbt-help-note {
  display: block;
  margin-top: 0.35rem;
  color: #333333;
}

.nbt-operator-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.nbt-operator-row label {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
}

.nbt-template {
  min-height: 4rem;
}

.nbt-preview {
  margin-top: 0.5rem;
  overflow: auto;
}
</style>
