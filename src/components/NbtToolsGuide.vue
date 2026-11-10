<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue";
import {
  NBT_GUIDE_SECTIONS,
  NBT_GUIDE_TOKEN_ROWS,
  type NbtGuideExample,
  type NbtGuideExampleLoad,
} from "lib/transformers/nbtToolsGuide";

const emit = defineEmits<{
  (event: "load-example", example: NbtGuideExampleLoad): void;
}>();

const DOCS_PARAM = "docs";

const guideOpen = ref(false);
const collapsedSections = reactive<Record<string, boolean>>({});

const sectionOpen = (id: string): boolean => collapsedSections[id] !== true;

const encodeDocsState = (): string | null => {
  const mask = NBT_GUIDE_SECTIONS.reduce(
    (bits, section, bit) => (sectionOpen(section.id) ? bits : bits + 2 ** bit),
    0
  );
  const value = mask * 2 + (guideOpen.value ? 1 : 0);
  return value === 0 ? null : value.toString(36);
};

const writeDocsState = (): void => {
  const url = new URL(window.location.href);
  const encoded = encodeDocsState();
  if (encoded === null) {
    url.searchParams.delete(DOCS_PARAM);
  } else {
    url.searchParams.set(DOCS_PARAM, encoded);
  }
  window.history.replaceState({}, "", url.toString());
};

const applyDocsState = (): void => {
  const raw = new URL(window.location.href).searchParams.get(DOCS_PARAM);
  if (raw === null || raw === "" || !/^[0-9a-z]+$/i.test(raw)) return;
  const value = Number.parseInt(raw, 36);
  if (!Number.isInteger(value) || value < 0) return;
  const mask = Math.floor(value / 2);
  if (mask >= 2 ** NBT_GUIDE_SECTIONS.length) return;
  guideOpen.value = value % 2 === 1;
  NBT_GUIDE_SECTIONS.forEach((section, bit) => {
    if (Math.floor(mask / 2 ** bit) % 2 === 1) {
      collapsedSections[section.id] = true;
    }
  });
};

const toggleGuide = (event: MouseEvent): void => {
  event.preventDefault();
  guideOpen.value = !guideOpen.value;
  writeDocsState();
};

const toggleSection = (event: MouseEvent, id: string): void => {
  event.preventDefault();
  if (collapsedSections[id] === true) {
    delete collapsedSections[id];
  } else {
    collapsedSections[id] = true;
  }
  writeDocsState();
};

const openSection = (id: string): void => {
  guideOpen.value = true;
  delete collapsedSections[id];
  writeDocsState();
  void nextTick(() => {
    document
      .querySelector(`[data-guide-section="${id}"]`)
      ?.scrollIntoView({ block: "start" });
  });
};

const loadExample = (example: NbtGuideExample, nbt: string): void => {
  emit("load-example", {
    code: example.code,
    operator: example.operator,
    selectionName: "selection1",
    nbt,
  });
};

onMounted(applyDocsState);

defineExpose({ openSection });
</script>

<template>
  <details class="input-docs nbt-guide" :open="guideOpen">
    <summary class="input-docs-summary" @click="toggleGuide">
      Using NBT tools
    </summary>
    <div v-if="guideOpen" class="input-docs-body" data-testid="nbt-guide-body">
      <details
        v-for="section in NBT_GUIDE_SECTIONS"
        :key="section.id"
        class="input-docs-section"
        :data-guide-section="section.id"
        :open="sectionOpen(section.id)"
      >
        <summary
          class="input-docs-heading"
          @click="toggleSection($event, section.id)"
        >
          {{ section.heading }}
        </summary>

        <div class="input-docs-section-body">
          <p
            v-for="(paragraph, index) in section.paragraphs"
            :key="`paragraph-${index}`"
            class="input-docs-text"
          >
            {{ paragraph }}
          </p>

          <ul v-if="section.bullets" class="input-docs-bullets">
            <li v-for="(bullet, index) in section.bullets" :key="index">
              <template v-if="typeof bullet === 'string'">
                {{ bullet }}
              </template>
              <template v-else>
                <template v-for="(part, partIndex) in bullet" :key="partIndex">
                  <a
                    v-if="typeof part !== 'string'"
                    :href="part.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    >{{ part.label }}</a
                  >
                  <template v-else>{{ part }}</template>
                </template>
              </template>
            </li>
          </ul>

          <div v-if="section.table" class="nbt-guide-table-scroll">
            <table class="nbt-guide-table">
              <thead>
                <tr>
                  <th
                    v-for="header in section.table.headers"
                    :key="header"
                    scope="col"
                  >
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, rowIndex) in section.table.rows"
                  :key="rowIndex"
                >
                  <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                    {{ cell }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            v-if="section.tokenTable"
            class="nbt-guide-table-scroll nbt-token-panel"
          >
            <table class="nbt-token-table">
              <thead>
                <tr>
                  <th scope="col">Token</th>
                  <th scope="col">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="entry in NBT_GUIDE_TOKEN_ROWS" :key="entry.meaning">
                  <td class="nbt-token-cell">
                    <code v-for="token in entry.tokens" :key="token">{{
                      token
                    }}</code>
                  </td>
                  <td>{{ entry.meaning }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            v-for="(sample, sampleIndex) in section.samples"
            :key="`sample-${sampleIndex}`"
            class="nbt-guide-sample"
          >
            <pre
              class="nbt-guide-sample-code"
            ><code>{{ sample.code }}</code></pre>
            <p v-if="sample.note" class="input-docs-note">{{ sample.note }}</p>
            <div class="input-docs-examples">
              <button
                v-for="(example, exampleIndex) in sample.examples"
                :key="exampleIndex"
                type="button"
                class="input-docs-example input-docs-example-concrete"
                :data-operator="example.operator"
                :aria-label="`Load example ${example.code}`"
                @click="loadExample(example, sample.code)"
              >
                <code class="input-docs-example-text">{{ example.code }}</code>
                <span v-if="example.note" class="input-docs-example-caption">{{
                  example.note
                }}</span>
              </button>
            </div>
          </div>

          <div v-if="section.examples" class="input-docs-examples">
            <template
              v-for="(example, exampleIndex) in section.examples"
              :key="exampleIndex"
            >
              <button
                v-if="example.operator !== 'matchAll'"
                type="button"
                class="input-docs-example input-docs-example-concrete"
                :data-operator="example.operator"
                :aria-label="`Load example ${example.code}`"
                @click="loadExample(example, section.nbt ?? '')"
              >
                <code class="input-docs-example-text">{{ example.code }}</code>
                <span v-if="example.note" class="input-docs-example-caption">{{
                  example.note
                }}</span>
              </button>
              <div
                v-else
                class="input-docs-example input-docs-example-structural"
                :data-operator="example.operator"
              >
                <code class="input-docs-example-text">{{ example.code }}</code>
                <span v-if="example.note" class="input-docs-example-caption">{{
                  example.note
                }}</span>
              </div>
            </template>
          </div>
        </div>
      </details>
    </div>
  </details>
</template>

<style scoped>
.nbt-guide {
  margin-bottom: 0.75rem;
}

.nbt-guide a {
  color: #1b6f83;
}

.nbt-guide-table-scroll {
  max-width: 100%;
  overflow-x: auto;
}

.nbt-guide-table {
  border-collapse: collapse;
  width: 100%;
  font-size: 0.8rem;
}

.nbt-guide-table th {
  padding: 0 0.5rem 0.2rem 0;
  border-bottom: 1px solid #c3c9cd;
  color: #333333;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-align: left;
  text-transform: uppercase;
}

.nbt-guide-table td {
  padding: 0.2rem 0.5rem 0.2rem 0;
  vertical-align: top;
}

.nbt-guide-table td:first-child {
  font-family: monospace;
  white-space: nowrap;
}

.nbt-guide-table tbody tr:nth-child(even),
.nbt-token-table tbody tr:nth-child(even) {
  background: rgba(0, 0, 0, 0.05);
}

.nbt-guide-sample {
  display: grid;
  gap: 0.3rem;
  margin-top: 0.4rem;
}

.nbt-guide-sample-code {
  margin: 0;
  padding: 0.4rem 0.55rem;
  border: 1px solid #cfe4e9;
  border-radius: 0.3rem;
  background: rgba(255, 255, 255, 0.7);
  overflow-x: auto;
  font-size: 0.8rem;
}

.nbt-token-panel {
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
</style>
