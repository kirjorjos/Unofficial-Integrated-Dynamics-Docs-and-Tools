<script setup lang="ts">
import { computed } from "vue";
import { Tag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";
import { formatNbtValue, type NbtTreeNode } from "lib/transformers/nbtTools";
import { writeKey } from "lib/transformers/SNBT";

const props = withDefaults(
  defineProps<{
    node: NbtTreeNode;
    expanded: Set<string>;
    selectedId: string | null;
    isLast?: boolean;
    depth?: number;
  }>(),
  { isLast: true, depth: 0 }
);

const emit = defineEmits<{
  (event: "toggle", id: string): void;
  (event: "select", node: NbtTreeNode): void;
}>();

const hasChildren = computed(() => props.node.children.length > 0);
const isOpen = computed(() => props.expanded.has(props.node.id));
const openContainer = computed(() => hasChildren.value && isOpen.value);

const lastSegment = computed(() => props.node.segments.at(-1));
const isIndexChild = computed(() => lastSegment.value?.kind === "index");
const indexLabel = computed(() =>
  lastSegment.value?.kind === "index" ? String(lastSegment.value.index) : ""
);
const keyLabel = computed(() =>
  props.node.label === "" ? "" : writeKey(props.node.label)
);

const isContainerShape = computed(
  () => props.node.container === "compound" || props.node.container === "list"
);

const emptyContainer = computed(
  () => isContainerShape.value && !hasChildren.value
);

const valueText = computed(() => formatNbtValue(props.node.tag));

const valueClass = computed(() => {
  const type = props.node.tag.getType();
  if (type === Tag.TAG_STRING) return "is-string";
  if (
    type === Tag.TAG_BYTE_ARRAY ||
    type === Tag.TAG_INT_ARRAY ||
    type === Tag.TAG_LONG_ARRAY
  ) {
    return "is-array-literal";
  }
  return "is-number";
});

const countLabel = computed(() => {
  const count = props.node.children.length;
  if (props.node.container === "compound") {
    return `${count} ${count === 1 ? "entry" : "entries"}`;
  }
  return `${count} ${count === 1 ? "element" : "elements"}`;
});

const openBracket = computed(() =>
  props.node.container === "compound" ? "{" : "["
);
const closeBracket = computed(() =>
  props.node.container === "compound" ? "}" : "]"
);

const indentStyle = computed(() => ({
  paddingLeft: `${props.depth * 1.1}rem`,
}));
</script>

<template>
  <div class="nbt-tree-node">
    <div
      class="nbt-tree-row"
      :class="{ 'is-selected': node.id === selectedId }"
      :style="indentStyle"
      :data-node-id="node.id"
      :data-path="node.path ?? ''"
      @click="emit('select', node)"
    >
      <button
        v-if="hasChildren"
        type="button"
        class="nbt-tree-arrow"
        :aria-expanded="isOpen"
        :aria-label="isOpen ? 'Collapse' : 'Expand'"
        @click.stop="emit('toggle', node.id)"
      >
        {{ isOpen ? "▾" : "▸" }}
      </button>
      <span v-else class="nbt-tree-arrow-spacer" aria-hidden="true" />

      <span class="nbt-tree-text">
        <template v-if="isIndexChild">
          <span class="nbt-tree-index">[{{ indexLabel }}]</span>
        </template>
        <template v-else-if="node.label !== ''">
          <span class="nbt-tree-key">{{ keyLabel }}</span
          ><span class="nbt-tree-colon">: </span>
        </template>

        <template v-if="openContainer">
          <span class="nbt-tree-bracket">{{ openBracket }}</span>
        </template>
        <template v-else-if="hasChildren">
          <span class="nbt-tree-collapsed">{{
            node.container === "compound" ? "{…}" : "[…]"
          }}</span>
          <span class="nbt-tree-count"> {{ countLabel }}</span>
          <span class="nbt-tree-comma">{{ isLast ? "" : "," }}</span>
        </template>
        <template v-else-if="emptyContainer">
          <span class="nbt-tree-bracket">{{
            node.container === "compound" ? "{}" : "[]"
          }}</span>
          <span class="nbt-tree-comma">{{ isLast ? "" : "," }}</span>
        </template>
        <template v-else>
          <span class="nbt-tree-value" :class="valueClass">{{
            valueText
          }}</span>
          <span class="nbt-tree-comma">{{ isLast ? "" : "," }}</span>
        </template>
      </span>
    </div>

    <template v-if="openContainer">
      <NbtTreeView
        v-for="(child, index) in node.children"
        :key="child.id"
        :node="child"
        :expanded="expanded"
        :selected-id="selectedId"
        :is-last="index === node.children.length - 1"
        :depth="depth + 1"
        @toggle="emit('toggle', $event)"
        @select="emit('select', $event)"
      />
      <div class="nbt-tree-row nbt-tree-close" :style="indentStyle">
        <span class="nbt-tree-arrow-spacer" aria-hidden="true" />
        <span class="nbt-tree-text"
          >{{ closeBracket
          }}<span class="nbt-tree-comma">{{ isLast ? "" : "," }}</span></span
        >
      </div>
    </template>
  </div>
</template>

<style scoped>
.nbt-tree-node {
  display: contents;
}

.nbt-tree-row {
  display: flex;
  align-items: baseline;
  gap: 0.15rem;
  font-family: monospace;
  font-size: 0.8rem;
  line-height: 1.45;
  white-space: pre;
  cursor: pointer;
  border-radius: 0.2rem;
  color: #3b3b3b;
}

.nbt-tree-row:hover {
  background: rgba(4, 81, 165, 0.06);
}

.nbt-tree-row.is-selected {
  background: #d3e3fd;
}

.nbt-tree-arrow {
  width: 1rem;
  min-width: 1rem;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.nbt-tree-arrow-spacer {
  display: inline-block;
  width: 1rem;
  min-width: 1rem;
}

.nbt-tree-key {
  color: #0451a5;
}

.nbt-tree-colon,
.nbt-tree-comma {
  color: #3b3b3b;
}

.nbt-tree-index {
  color: #0451a5;
}

.nbt-tree-bracket {
  color: #3b3b3b;
}

.nbt-tree-value.is-string {
  color: #a31515;
}

.nbt-tree-value.is-number {
  color: #098658;
}

.nbt-tree-value.is-array-literal {
  color: #267f99;
}

.nbt-tree-collapsed {
  color: #6a737d;
}

.nbt-tree-count {
  color: #6a737d;
}
</style>
