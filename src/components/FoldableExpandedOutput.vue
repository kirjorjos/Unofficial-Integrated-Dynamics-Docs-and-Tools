<script setup lang="ts">
import { computed } from "vue";
import FoldableAngleSegment from "./FoldableAngleSegment.vue";

type AngleNode =
  | { type: "text"; value: string }
  | { type: "angle"; children: AngleNode[] };

const props = defineProps<{
  text: string;
}>();

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

const parsedLines = computed(() =>
  props.text.split("\n").map((line) => parseAngleSegments(line))
);
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
        :key="nodeIndex"
        :node="node"
      />
    </div>
  </div>
</template>
