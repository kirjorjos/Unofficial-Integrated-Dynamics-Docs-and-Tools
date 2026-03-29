<script setup lang="ts">
defineOptions({ name: "FoldableAngleSegment" });

type AngleNode =
  | { type: "text"; value: string }
  | { type: "angle"; children: AngleNode[] };

defineProps<{
  node: AngleNode;
  path: string;
  isCollapsed: (path: string) => boolean;
  toggleCollapsed: (path: string) => void;
}>();
</script>

<template>
  <span v-if="node.type === 'text'">{{ node.value }}</span>
  <span v-else class="angle-group">
    <button
      class="angle-bracket-toggle"
      type="button"
      @click="toggleCollapsed(path)"
    >
      <span class="angle-bracket">&lt;</span>
    </button>
    <span v-if="isCollapsed(path)" class="angle-ellipsis">…</span>
    <template v-else>
      <FoldableAngleSegment
        v-for="(child, index) in node.children"
        :key="`${path}.${index}`"
        :node="child"
        :path="`${path}.${index}`"
        :is-collapsed="isCollapsed"
        :toggle-collapsed="toggleCollapsed"
      />
    </template>
    <button
      class="angle-bracket-toggle"
      type="button"
      @click="toggleCollapsed(path)"
    >
      <span class="angle-bracket">&gt;</span>
    </button>
  </span>
</template>
