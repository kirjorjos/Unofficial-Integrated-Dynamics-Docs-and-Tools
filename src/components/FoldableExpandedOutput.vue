<script setup lang="ts">
import { computed, ref, watch } from "vue";
import FoldableAngleSegment from "./FoldableAngleSegment.vue";

type AngleNode =
  | { type: "text"; value: string }
  | { type: "angle"; children: AngleNode[] };

const props = defineProps<{
  text: string;
}>();

const collapsedPaths = ref(new Set<string>());

const parseAngleSegments = (line: string): AngleNode[] => {
  const root: AngleNode[] = [];
  const stack: AngleNode[][] = [root];
  let textBuffer = "";

  const flushText = (): void => {
    if (!textBuffer) return;
    stack[stack.length - 1]!.push({ type: "text", value: textBuffer });
    textBuffer = "";
  };

  for (const char of line) {
    if (char === "<") {
      flushText();
      const children: AngleNode[] = [];
      stack[stack.length - 1]!.push({ type: "angle", children });
      stack.push(children);
      continue;
    }

    if (char === ">" && stack.length > 1) {
      flushText();
      stack.pop();
      continue;
    }

    textBuffer += char;
  }

  flushText();

  while (stack.length > 1) {
    const danglingChildren = stack.pop()!;
    const parent = stack[stack.length - 1]!;
    const danglingNode = parent[parent.length - 1];
    if (!danglingNode || danglingNode.type !== "angle") continue;

    parent[parent.length - 1] = {
      type: "text",
      value: `<${stringifyAngleNodes(danglingChildren)}`,
    };
  }

  return root;
};

const stringifyAngleNodes = (nodes: AngleNode[]): string =>
  nodes
    .map((node) =>
      node.type === "text"
        ? node.value
        : `<${stringifyAngleNodes(node.children)}>`
    )
    .join("");

const serializeForCopy = (nodes: AngleNode[], pathPrefix: string): string =>
  nodes
    .map((node, index) => {
      const path = `${pathPrefix}.${index}`;
      if (node.type === "text") return node.value;
      if (collapsedPaths.value.has(path)) return "";
      return `<${serializeForCopy(node.children, path)}>`;
    })
    .join("");

const parsedLines = computed(() =>
  props.text.split("\n").map((line) => parseAngleSegments(line))
);

const isCollapsed = (path: string): boolean => collapsedPaths.value.has(path);

const toggleCollapsed = (path: string): void => {
  const next = new Set(collapsedPaths.value);
  if (next.has(path)) next.delete(path);
  else next.add(path);
  collapsedPaths.value = next;
};

const getCopyText = (): string =>
  parsedLines.value
    .map((line, lineIndex) => serializeForCopy(line, `line-${lineIndex}`))
    .join("\n");

watch(
  () => props.text,
  () => {
    collapsedPaths.value = new Set<string>();
  }
);

defineExpose<{ getCopyText: () => string }>({
  getCopyText,
});
</script>

<template>
  <div class="expanded-output-viewer">
    <div
      v-for="(line, lineIndex) in parsedLines"
      :key="lineIndex"
      class="expanded-output-line"
    >
      <FoldableAngleSegment
        v-for="(node, nodeIndex) in line"
        :key="`line-${lineIndex}.${nodeIndex}`"
        :node="node"
        :path="`line-${lineIndex}.${nodeIndex}`"
        :is-collapsed="isCollapsed"
        :toggle-collapsed="toggleCollapsed"
      />
    </div>
  </div>
</template>
