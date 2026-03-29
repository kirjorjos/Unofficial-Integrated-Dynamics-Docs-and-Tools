<script setup lang="ts">
import { computed, ref } from "vue";

type AngleNode =
  | { type: "text"; value: string }
  | { type: "angle"; children: AngleNode[] };

defineOptions({ name: "FoldableAngleSegment" });

const props = defineProps<{
  node: AngleNode;
  depth?: number;
}>();

const collapsed = ref(false);

const canCollapse = computed(
  () => props.node.type === "angle" && props.node.children.length > 0
);

const toggleCollapsed = (): void => {
  if (!canCollapse.value) return;
  collapsed.value = !collapsed.value;
};
</script>

<template>
  <span v-if="node.type === 'text'">{{ node.value }}</span>
  <span v-else class="angle-group">
    <template v-if="canCollapse">
      <button
        class="angle-bracket-toggle"
        type="button"
        @click="toggleCollapsed"
      >
        <span class="angle-bracket">&lt;</span>
      </button>
      <span v-if="collapsed" class="angle-ellipsis">…</span>
      <template v-else>
        <FoldableAngleSegment
          v-for="(child, index) in node.children"
          :key="index"
          :node="child"
          :depth="(depth ?? 0) + 1"
        />
      </template>
      <button
        class="angle-bracket-toggle"
        type="button"
        @click="toggleCollapsed"
      >
        <span class="angle-bracket">&gt;</span>
      </button>
    </template>
    <span v-else class="angle-literal">&lt;&gt;</span>
  </span>
</template>
