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
import { humanizeIdentifier } from "./lib/HelperClasses/UtilityFunctions";

type FilePage = {
  kind: "page";
  id: string;
  label: string;
  component: Component;
  props?: Record<string, unknown>;
  tooltip?: string;
  categoryId?: string;
  searchIndex?: {
    nicknames: string[];
    internalName: string;
    description?: string;
  };
};

type FolderPage = {
  kind: "folder";
  id: string;
  label: string;
  children: NavItem[];
};

type NavItem = FilePage | FolderPage;
type MatchResult = {
  tier: number;
  matchLength: number;
};

const normalizeSearchText = (value: string): string => {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
};

const tokenizeNormalizedText = (value: string): string[] => {
  if (!value) return [];
  return value.split(" ").filter(Boolean);
};

const compactNormalizedText = (value: string): string => {
  return value.replace(/\s+/g, "");
};

const getNormalizedSearchLength = (value: string): number => {
  return compactNormalizedText(value).length;
};

const getSingleWordDirectMatch = (
  candidates: string[],
  query: string,
  exactTier: number,
  prefixTier: number
): MatchResult | null => {
  let best: MatchResult | null = null;

  for (const candidate of candidates) {
    const tokens = tokenizeNormalizedText(candidate);
    if (tokens.some((token) => token === query)) {
      const result = {
        tier: exactTier,
        matchLength: candidate.length,
      };
      if (
        !best ||
        result.tier < best.tier ||
        (result.tier === best.tier && result.matchLength < best.matchLength)
      ) {
        best = result;
      }
      continue;
    }

    if (tokens.some((token) => token.startsWith(query))) {
      const result = {
        tier: prefixTier,
        matchLength: candidate.length,
      };
      if (
        !best ||
        result.tier < best.tier ||
        (result.tier === best.tier && result.matchLength < best.matchLength)
      ) {
        best = result;
      }
    }
  }

  return best;
};

const getPhraseMatch = (
  candidates: string[],
  query: string,
  phraseTier: number
): MatchResult | null => {
  let best: MatchResult | null = null;
  const compactQuery = compactNormalizedText(query);

  for (const candidate of candidates) {
    if (
      !candidate.includes(query) &&
      !compactNormalizedText(candidate).includes(compactQuery)
    ) {
      continue;
    }
    const result = {
      tier: phraseTier,
      matchLength: candidate.length,
    };
    if (!best || result.matchLength < best.matchLength) {
      best = result;
    }
  }

  return best;
};

const matchOperatorDirect = (
  index: NonNullable<FilePage["searchIndex"]>,
  normalizedQuery: string
): MatchResult | null => {
  const isMultiWord = normalizedQuery.includes(" ");

  if (isMultiWord) {
    return (
      getPhraseMatch(index.nicknames, normalizedQuery, 5) ??
      getPhraseMatch([index.internalName], normalizedQuery, 6)
    );
  }

  return (
    getSingleWordDirectMatch(index.nicknames, normalizedQuery, 1, 3) ??
    getSingleWordDirectMatch([index.internalName], normalizedQuery, 2, 4)
  );
};

const matchOperatorDescription = (
  index: NonNullable<FilePage["searchIndex"]>,
  normalizedQuery: string
): MatchResult | null => {
  if (!index.description) return null;
  const compactQuery = compactNormalizedText(normalizedQuery);

  if (normalizedQuery.includes(" ")) {
    return index.description.includes(normalizedQuery) ||
      compactNormalizedText(index.description).includes(compactQuery)
      ? {
          tier: 7,
          matchLength: index.description.length,
        }
      : null;
  }

  return index.description.includes(normalizedQuery)
    ? {
        tier: 7,
        matchLength: index.description.length,
      }
    : null;
};

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
  .map((key) => {
    const operatorClass = operatorRegistry[
      key as keyof typeof operatorRegistry
    ] as {
      symbol?: string;
      interactName?: string;
      nicknames?: string[];
      internalName?: string;
      tooltipInfo?: string;
      kind?: string;
    };

    return {
      kind: "page" as const,
      id: `operator-${key}`,
      label: operatorClass.symbol ?? key,
      tooltip: operatorClass.interactName ?? key,
      searchIndex: {
        nicknames: (operatorClass.nicknames ?? []).map(normalizeSearchText),
        internalName: normalizeSearchText(operatorClass.internalName ?? ""),
        description: operatorClass.tooltipInfo
          ? normalizeSearchText(operatorClass.tooltipInfo)
          : undefined,
      },
      component: OperatorPage,
      props: {
        operatorKey: key,
      },
      categoryId: operatorClass.kind ?? "misc",
    };
  });

const operatorCategoryMap = new Map<string, FilePage[]>();

for (const page of operatorPages) {
  const categoryId = page.categoryId ?? "misc";
  const pages = operatorCategoryMap.get(categoryId) ?? [];
  pages.push(page);
  operatorCategoryMap.set(categoryId, pages);
}

const operatorFolderPages: FolderPage[] = Array.from(
  operatorCategoryMap.entries()
).map(([categoryId, pages]) => ({
  kind: "folder" as const,
  id: `operators-${categoryId}`,
  label: humanizeIdentifier(categoryId),
  children: pages,
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
    children: operatorFolderPages,
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
  ...Object.fromEntries(
    operatorFolderPages.map((folder) => [folder.id, false])
  ),
});
const navSearch = ref("");

const flattenItems = (items: NavItem[]): FilePage[] => {
  return items.flatMap((item) =>
    item.kind === "page" ? [item] : flattenItems(item.children)
  );
};

const selectedPageId = ref("transformers");

const allPages = computed(() => flattenItems(sections));

const pageFolderMap = computed(() => {
  const entries: Record<string, string[]> = {};

  const visit = (items: NavItem[], parents: string[]) => {
    for (const item of items) {
      if (item.kind === "page") {
        entries[item.id] = parents;
        continue;
      }

      visit(item.children, [...parents, item.id]);
    }
  };

  visit(sections, []);

  return entries;
});

const selectedPage = computed(() => {
  return allPages.value.find((page) => page.id === selectedPageId.value);
});

const normalizedNavSearch = computed(() =>
  normalizeSearchText(navSearch.value)
);

const visibleSections = computed<NavItem[]>(() => {
  const query = normalizedNavSearch.value;
  if (!query) return sections;

  return sections.map((section) => {
    if (section.kind === "page") return section;
    if (section.id !== "operators") return section;

    const operatorPages = flattenItems(section.children);

    const directMatches = operatorPages
      .map((page, index) => ({
        page,
        index,
        match: page.searchIndex
          ? matchOperatorDirect(page.searchIndex, query)
          : null,
      }))
      .filter(
        (
          entry
        ): entry is { page: FilePage; index: number; match: MatchResult } =>
          entry.match !== null
      )
      .sort(
        (left, right) =>
          left.match.tier - right.match.tier ||
          left.match.matchLength - right.match.matchLength ||
          left.index - right.index
      );

    if (directMatches.length > 0) {
      return {
        ...section,
        children: directMatches.map((entry) => entry.page),
      };
    }

    if (getNormalizedSearchLength(query) < 3) {
      return {
        ...section,
        children: [],
      };
    }

    const descriptionMatches = operatorPages
      .map((page, index) => ({
        page,
        index,
        match: page.searchIndex
          ? matchOperatorDescription(page.searchIndex, query)
          : null,
      }))
      .filter(
        (
          entry
        ): entry is { page: FilePage; index: number; match: MatchResult } =>
          entry.match !== null
      )
      .sort(
        (left, right) =>
          left.match.tier - right.match.tier ||
          left.match.matchLength - right.match.matchLength ||
          left.index - right.index
      );

    return {
      ...section,
      children: descriptionMatches.map((entry) => entry.page),
    };
  });
});

const normalizeHashPageId = (hash: string): string | undefined => {
  const pageId = decodeURIComponent(hash.replace(/^#/, "").trim());
  if (!pageId) return undefined;
  return allPages.value.some((page) => page.id === pageId) ? pageId : undefined;
};

const expandFolderForPage = (pageId: string): void => {
  const folderIds = pageFolderMap.value[pageId] ?? [];
  for (const folderId of folderIds) {
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

watch(normalizedNavSearch, (query) => {
  if (query) {
    collapsedFolders.value["operators"] = false;
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

      <label class="sidebar-search">
        <span class="sidebar-search-label">Search tabs</span>
        <input
          v-model="navSearch"
          class="sidebar-search-input"
          type="text"
          placeholder="Filter operators for now"
          aria-label="Search tabs"
        />
      </label>

      <nav class="sidebar-nav">
        <section
          v-for="section in visibleSections"
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
              <template v-for="item in section.children" :key="item.id">
                <button
                  v-if="item.kind === 'page'"
                  type="button"
                  class="file-row"
                  :class="{ active: item.id === selectedPageId }"
                  :title="item.tooltip"
                  @click="openPage(item.id)"
                >
                  <span class="file-icon" aria-hidden="true">•</span>
                  <span class="file-label">{{ item.label }}</span>
                </button>

                <template v-else>
                  <button
                    type="button"
                    class="folder-row folder-button nested-folder-row"
                    @click="toggleFolder(item.id)"
                  >
                    <span class="folder-icon" aria-hidden="true">{{
                      collapsedFolders[item.id] ? "▸" : "▾"
                    }}</span>
                    <span class="folder-label">{{ item.label }}</span>
                  </button>

                  <div
                    v-if="!collapsedFolders[item.id]"
                    class="file-list nested-file-list"
                  >
                    <template v-for="page in item.children" :key="page.id">
                      <button
                        v-if="page.kind === 'page'"
                        type="button"
                        class="file-row"
                        :class="{ active: page.id === selectedPageId }"
                        :title="page.tooltip"
                        @click="openPage(page.id)"
                      >
                        <span class="file-icon" aria-hidden="true">•</span>
                        <span class="file-label">{{ page.label }}</span>
                      </button>
                    </template>
                  </div>
                </template>
              </template>
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
