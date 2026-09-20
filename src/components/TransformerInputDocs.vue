<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import {
  INPUT_DOC_TABS,
  type DocSpan,
  type InputDocExample,
  type InputDocTabId,
} from "lib/transformers/inputDocs";

const emit = defineEmits<{
  (event: "load-example", example: InputDocExample): void;
}>();

const tabs = INPUT_DOC_TABS;

const DOCS_PARAM = "docs";

const SECTION_ORDER = tabs.flatMap((tab) =>
  tab.sections.map((_section, sectionIndex) => ({
    tabId: tab.id,
    sectionIndex,
  }))
);

const activeTab = ref<InputDocTabId>("overview");
const docsPanelOpen = ref(false);

const collapsedSections = reactive<Record<string, boolean>>({});

const sectionStateKey = (tabId: InputDocTabId, sectionIndex: number): string =>
  `${tabId}:${sectionIndex}`;

const tabId = (id: InputDocTabId): string => `input-doc-tab-${id}`;
const panelId = (id: InputDocTabId): string => `input-doc-panel-${id}`;

const activePanel = computed(
  () => tabs.find((tab) => tab.id === activeTab.value) ?? tabs[0]!
);

const spanClass = (span: DocSpan): string | undefined =>
  span.emphasis ? `input-doc-span-${span.emphasis}` : undefined;

const isSectionOpen = (tabId: InputDocTabId, sectionIndex: number): boolean =>
  collapsedSections[sectionStateKey(tabId, sectionIndex)] !== true;

const SECTION_INDEX_WIDTH = 2;
const FIELD_BITS = Math.ceil(Math.log2(tabs.length * 2));
const PACKED_PREFIX = "-";

const docsField = (): number => {
  const tabIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === activeTab.value)
  );
  return tabIndex + (docsPanelOpen.value ? tabs.length : 0);
};

const encodeDocsState = (): string | null => {
  const field = docsField();
  const collapsed = SECTION_ORDER.flatMap((entry, bit) =>
    isSectionOpen(entry.tabId, entry.sectionIndex) ? [] : [bit]
  );
  if (field === 0 && collapsed.length === 0) return null;

  const sparse =
    field.toString(36) +
    collapsed
      .map((bit) => bit.toString(36).padStart(SECTION_INDEX_WIDTH, "0"))
      .join("");

  const collapsedBits = collapsed.reduce((bits, bit) => bits + 2 ** bit, 0);
  const packed = `${PACKED_PREFIX}${(
    collapsedBits * 2 ** FIELD_BITS +
    field
  ).toString(36)}`;

  return sparse.length <= packed.length ? sparse : packed;
};

const setActiveTabFromIndex = (tabIndex: number): void => {
  if (Number.isInteger(tabIndex) && tabIndex >= 0 && tabIndex < tabs.length) {
    activeTab.value = tabs[tabIndex]!.id;
  }
};

const applyDocsField = (field: number): void => {
  if (!Number.isInteger(field) || field < 0 || field >= tabs.length * 2) return;
  docsPanelOpen.value = field >= tabs.length;
  setActiveTabFromIndex(field % tabs.length);
};

const collapseSectionBit = (bit: number): void => {
  if (Number.isInteger(bit) && bit >= 0 && bit < SECTION_ORDER.length) {
    const entry = SECTION_ORDER[bit]!;
    collapsedSections[sectionStateKey(entry.tabId, entry.sectionIndex)] = true;
  }
};

const applyPackedDocsState = (raw: string): void => {
  const value = Number.parseInt(raw.slice(PACKED_PREFIX.length), 36);
  if (!Number.isInteger(value)) return;

  applyDocsField(value % 2 ** FIELD_BITS);
  const collapsedBits = Math.floor(value / 2 ** FIELD_BITS);
  for (let bit = 0; bit < SECTION_ORDER.length; bit += 1) {
    if (Math.floor(collapsedBits / 2 ** bit) % 2 === 1) {
      collapseSectionBit(bit);
    }
  }
};

const applySparseDocsState = (raw: string): void => {
  applyDocsField(Number.parseInt(raw.slice(0, 1), 36));
  const rest = raw.slice(1);
  if (rest.length % SECTION_INDEX_WIDTH !== 0) return;
  for (let offset = 0; offset < rest.length; offset += SECTION_INDEX_WIDTH) {
    collapseSectionBit(
      Number.parseInt(rest.slice(offset, offset + SECTION_INDEX_WIDTH), 36)
    );
  }
};

const applyDocsState = (): void => {
  const raw = new URL(window.location.href).searchParams.get(DOCS_PARAM);
  if (raw === null || raw === "") return;

  if (raw.startsWith(PACKED_PREFIX)) {
    applyPackedDocsState(raw);
    return;
  }
  applySparseDocsState(raw);
};

const updateDocsStateUrl = (): void => {
  const url = new URL(window.location.href);
  const encoded = encodeDocsState();
  if (encoded === null) {
    url.searchParams.delete(DOCS_PARAM);
  } else {
    url.searchParams.set(DOCS_PARAM, encoded);
  }
  window.history.replaceState({}, "", url.toString());
};

const selectTab = (id: InputDocTabId): void => {
  activeTab.value = id;
  updateDocsStateUrl();
};

const togglePanel = (event: MouseEvent): void => {
  event.preventDefault();
  docsPanelOpen.value = !docsPanelOpen.value;
  updateDocsStateUrl();
};

const toggleSection = (
  event: MouseEvent,
  tabId: InputDocTabId,
  sectionIndex: number
): void => {
  event.preventDefault();
  const key = sectionStateKey(tabId, sectionIndex);
  if (collapsedSections[key] === true) {
    delete collapsedSections[key];
  } else {
    collapsedSections[key] = true;
  }
  updateDocsStateUrl();
};

const handleTabKeydown = (event: KeyboardEvent, index: number): void => {
  let next = index;
  if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
  else if (event.key === "ArrowLeft")
    next = (index - 1 + tabs.length) % tabs.length;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = tabs.length - 1;
  else return;

  event.preventDefault();
  const target = tabs[next]!;
  activeTab.value = target.id;
  updateDocsStateUrl();
  document.getElementById(tabId(target.id))?.focus();
};

onMounted(applyDocsState);

const loadExample = (example: InputDocExample): void => {
  if (example.kind !== "concrete") return;
  emit("load-example", example);
};
</script>

<template>
  <details class="input-docs" :open="docsPanelOpen">
    <summary class="input-docs-summary" @click="togglePanel">
      Input reference
    </summary>
    <div class="input-docs-body">
      <div
        class="input-docs-tablist"
        role="tablist"
        aria-label="Input syntax reference"
      >
        <button
          v-for="(tab, index) in tabs"
          :id="tabId(tab.id)"
          :key="tab.id"
          type="button"
          role="tab"
          class="input-docs-tab"
          :aria-selected="tab.id === activeTab"
          :aria-controls="panelId(tab.id)"
          :tabindex="tab.id === activeTab ? 0 : -1"
          @click="selectTab(tab.id)"
          @keydown="handleTabKeydown($event, index)"
        >
          {{ tab.label }}
        </button>
      </div>

      <div
        :id="panelId(activePanel.id)"
        class="input-docs-panel"
        role="tabpanel"
        :aria-labelledby="tabId(activePanel.id)"
        tabindex="0"
      >
        <details
          v-for="(section, sectionIndex) in activePanel.sections"
          :key="`${activePanel.id}:${sectionIndex}`"
          class="input-docs-section"
          :open="isSectionOpen(activePanel.id, sectionIndex)"
        >
          <summary
            class="input-docs-heading"
            @click="toggleSection($event, activePanel.id, sectionIndex)"
          >
            {{ section.heading }}
          </summary>

          <div class="input-docs-section-body">
            <p v-if="section.summary" class="input-docs-text">
              {{ section.summary }}
            </p>

            <ul v-if="section.bullets" class="input-docs-bullets">
              <li
                v-for="(bullet, bulletIndex) in section.bullets"
                :key="bulletIndex"
              >
                {{ bullet }}
              </li>
            </ul>

            <dl v-if="section.legend" class="input-docs-legend">
              <div
                v-for="entry in section.legend"
                :key="entry.emphasis"
                class="input-docs-legend-row"
              >
                <dt :class="`input-doc-span-${entry.emphasis}`">
                  {{ entry.label }}
                </dt>
                <dd>{{ entry.description }}</dd>
              </div>
            </dl>

            <div v-if="section.syntax" class="input-docs-syntax">
              <div
                v-for="(line, lineIndex) in section.syntax"
                :key="lineIndex"
                class="input-docs-syntax-line"
              >
                <code class="input-docs-syntax-code">
                  <span
                    v-for="(span, spanIndex) in line.spans"
                    :key="spanIndex"
                    :class="spanClass(span)"
                    >{{ span.text }}</span
                  >
                </code>
                <span v-if="line.note" class="input-docs-note">{{
                  line.note
                }}</span>
              </div>
            </div>

            <div v-if="section.examples" class="input-docs-examples">
              <template
                v-for="(example, exampleIndex) in section.examples"
                :key="exampleIndex"
              >
                <button
                  v-if="example.kind === 'concrete'"
                  type="button"
                  class="input-docs-example input-docs-example-concrete"
                  @click="loadExample(example)"
                >
                  <code class="input-docs-example-text">{{
                    example.text
                  }}</code>
                  <span
                    v-if="example.caption"
                    class="input-docs-example-caption"
                  >
                    {{ example.caption }}
                  </span>
                </button>
                <div
                  v-else
                  class="input-docs-example input-docs-example-structural"
                >
                  <code class="input-docs-example-text">{{
                    example.text
                  }}</code>
                  <span
                    v-if="example.caption"
                    class="input-docs-example-caption"
                  >
                    {{ example.caption }}
                  </span>
                </div>
              </template>
            </div>

            <div v-if="section.links" class="input-docs-links">
              <a
                v-for="link in section.links"
                :key="link.href"
                class="input-docs-link"
                :href="link.href"
              >
                {{ link.label }}
              </a>
            </div>
          </div>
        </details>
      </div>
    </div>
  </details>
</template>
