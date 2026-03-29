<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { Component } from "vue";
import { operatorRegistry } from "lib";
import AdvancedPage from "./pages/AdvancedPage.vue";
import IntegratedCraftingPage from "./pages/IntegratedCraftingPage.vue";
import IntegratedMekanismPage from "./pages/IntegratedMekanismPage.vue";
import IntegratedScriptingPage from "./pages/IntegratedScriptingPage.vue";
import IntegratedTerminalsPage from "./pages/IntegratedTerminalsPage.vue";
import IntegratedTunnelsPage from "./pages/IntegratedTunnelsPage.vue";
import TransformersPage from "./pages/TransformersPage.vue";
import DataTypesPage from "./pages/starting-out/DataTypesPage.vue";
import DelayerPage from "./pages/starting-out/DelayerPage.vue";
import LogicProgrammerAndLabellerPage from "./pages/starting-out/LogicProgrammerAndLabellerPage.vue";
import MaterializerPage from "./pages/starting-out/MaterializerPage.vue";
import ReadersAndWritersPage from "./pages/starting-out/ReadersAndWritersPage.vue";
import OperatorPage from "./pages/operators/OperatorPage.vue";

type FilePage = {
  kind: "page";
  id: string;
  label: string;
  component: Component;
  props?: Record<string, unknown>;
  tooltip?: string;
};

type FolderPage = {
  kind: "folder";
  id: string;
  label: string;
  children: FilePage[];
};

type NavItem = FilePage | FolderPage;

const startingOutPages: FilePage[] = [
  {
    kind: "page",
    id: "starting-out-logic-programmer-and-labeller",
    label: "Logic programmer and labeller",
    component: LogicProgrammerAndLabellerPage,
  },
  {
    kind: "page",
    id: "starting-out-data-types",
    label: "Data types",
    component: DataTypesPage,
  },
  {
    kind: "page",
    id: "starting-out-readers-and-writers",
    label: "Readers and writers",
    component: ReadersAndWritersPage,
  },
  {
    kind: "page",
    id: "starting-out-materializer",
    label: "Materializer",
    component: MaterializerPage,
  },
  {
    kind: "page",
    id: "starting-out-delayer",
    label: "Delayer",
    component: DelayerPage,
  },
];

const operatorPages: FilePage[] = Object.keys(operatorRegistry)
  .filter((key) => key !== "find" && key !== "operatorByNickname")
  .map((key) => ({
    kind: "page" as const,
    id: `operator-${key}`,
    label:
      (
        operatorRegistry[key as keyof typeof operatorRegistry] as {
          symbol?: string;
        }
      ).symbol ?? key,
    tooltip:
      (
        operatorRegistry[key as keyof typeof operatorRegistry] as {
          interactName?: string;
        }
      ).interactName ?? key,
    component: OperatorPage,
    props: {
      operatorKey: key,
    },
  }));

const sections: NavItem[] = [
  {
    kind: "page",
    id: "transformers",
    label: "Transformers",
    component: TransformersPage,
  },
  {
    kind: "folder",
    id: "starting-out",
    label: "Starting out",
    children: startingOutPages,
  },
  {
    kind: "page",
    id: "advanced",
    label: "Advanced",
    component: AdvancedPage,
  },
  {
    kind: "folder",
    id: "operators",
    label: "Operators",
    children: operatorPages,
  },
  {
    kind: "page",
    id: "integrated-tunnels",
    label: "Integrated Tunnels",
    component: IntegratedTunnelsPage,
  },
  {
    kind: "page",
    id: "integrated-terminals",
    label: "Integrated Terminals",
    component: IntegratedTerminalsPage,
  },
  {
    kind: "page",
    id: "integrated-crafting",
    label: "Integrated Crafting",
    component: IntegratedCraftingPage,
  },
  {
    kind: "page",
    id: "integrated-scripting",
    label: "Integrated Scripting",
    component: IntegratedScriptingPage,
  },
  {
    kind: "page",
    id: "integrated-mekanism",
    label: "Integrated Mekanism",
    component: IntegratedMekanismPage,
  },
];

const collapsedFolders = ref<Record<string, boolean>>({
  "starting-out": false,
  operators: false,
});

const flattenItems = (items: NavItem[]): FilePage[] => {
  return items.flatMap((item) =>
    item.kind === "page" ? [item] : flattenItems(item.children)
  );
};

const selectedPageId = ref("transformers");

const allPages = computed(() => flattenItems(sections));

const pageFolderMap = computed(() => {
  const entries: Record<string, string | undefined> = {};

  for (const item of sections) {
    if (item.kind === "page") {
      entries[item.id] = undefined;
      continue;
    }

    for (const page of item.children) {
      entries[page.id] = item.id;
    }
  }

  return entries;
});

const selectedPage = computed(() => {
  return allPages.value.find((page) => page.id === selectedPageId.value);
});

const normalizeHashPageId = (hash: string): string | undefined => {
  const pageId = decodeURIComponent(hash.replace(/^#/, "").trim());
  if (!pageId) return undefined;
  return allPages.value.some((page) => page.id === pageId) ? pageId : undefined;
};

const expandFolderForPage = (pageId: string): void => {
  const folderId = pageFolderMap.value[pageId];
  if (folderId) {
    collapsedFolders.value[folderId] = false;
  }
};

const syncPageFromHash = (): void => {
  const pageId = normalizeHashPageId(window.location.hash);
  if (!pageId) return;
  selectedPageId.value = pageId;
  expandFolderForPage(pageId);
};

const openPage = (pageId: string): void => {
  selectedPageId.value = pageId;
};

const toggleFolder = (folderId: string): void => {
  collapsedFolders.value[folderId] = !collapsedFolders.value[folderId];
};

watch(selectedPageId, (pageId) => {
  expandFolderForPage(pageId);

  const nextHash = `#${encodeURIComponent(pageId)}`;
  if (window.location.hash !== nextHash) {
    window.location.hash = nextHash;
  }
});

onMounted(() => {
  syncPageFromHash();

  if (!window.location.hash) {
    window.location.hash = `#${encodeURIComponent(selectedPageId.value)}`;
  }

  window.addEventListener("hashchange", syncPageFromHash);
});

onBeforeUnmount(() => {
  window.removeEventListener("hashchange", syncPageFromHash);
});
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar" aria-label="Navigation">
      <div class="sidebar-header">
        <h1>Integrated Dynamics</h1>
        <p>Reference pages and generated operator docs.</p>
      </div>

      <nav class="sidebar-nav">
        <section
          v-for="section in sections"
          :key="section.id"
          class="sidebar-section"
        >
          <button
            v-if="section.kind === 'page'"
            type="button"
            class="file-row top-level-file"
            :class="{ active: section.id === selectedPageId }"
            @click="openPage(section.id)"
          >
            <span class="file-icon" aria-hidden="true">•</span>
            <span class="file-label">{{ section.label }}</span>
          </button>

          <template v-else>
            <button
              type="button"
              class="folder-row folder-button"
              @click="toggleFolder(section.id)"
            >
              <span class="folder-icon" aria-hidden="true">{{
                collapsedFolders[section.id] ? "▸" : "▾"
              }}</span>
              <span class="folder-label">{{ section.label }}</span>
            </button>

            <div v-if="!collapsedFolders[section.id]" class="file-list">
              <button
                v-for="page in section.children"
                :key="page.id"
                type="button"
                class="file-row"
                :class="{ active: page.id === selectedPageId }"
                :title="page.tooltip"
                @click="openPage(page.id)"
              >
                <span class="file-icon" aria-hidden="true">•</span>
                <span class="file-label">{{ page.label }}</span>
              </button>
            </div>
          </template>
        </section>
      </nav>
    </aside>

    <main class="content-panel">
      <component
        :is="selectedPage?.component"
        v-if="selectedPage"
        v-bind="selectedPage.props"
      />
      <section v-else class="doc-page">
        <h2>Select a page</h2>
      </section>
    </main>
  </div>
</template>
