<script setup lang="ts">
import { computed } from "vue";

type TooltipSegment = {
  text: string;
  colorClass: string;
  bold: boolean;
  italic: boolean;
};

const props = defineProps<{
  title: string;
  lines: string[];
}>();

const LEGACY_COLOR_CLASS: Record<string, string> = {
  "0": "mc-tooltip-color-0",
  "1": "mc-tooltip-color-1",
  "2": "mc-tooltip-color-2",
  "3": "mc-tooltip-color-3",
  "4": "mc-tooltip-color-4",
  "5": "mc-tooltip-color-5",
  "6": "mc-tooltip-color-6",
  "7": "mc-tooltip-color-7",
  "8": "mc-tooltip-color-8",
  "9": "mc-tooltip-color-9",
  a: "mc-tooltip-color-a",
  b: "mc-tooltip-color-b",
  c: "mc-tooltip-color-c",
  d: "mc-tooltip-color-d",
  e: "mc-tooltip-color-e",
  f: "mc-tooltip-color-f",
};

const parseLegacyText = (value: string): TooltipSegment[] => {
  const segments: TooltipSegment[] = [];
  let colorClass = "mc-tooltip-color-f";
  let bold = false;
  let italic = false;
  let buffer = "";

  const pushBuffer = () => {
    if (!buffer) return;
    segments.push({
      text: buffer,
      colorClass,
      bold,
      italic,
    });
    buffer = "";
  };

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index]!;
    const formattingCode = value[index + 1]?.toLowerCase();

    if (character === "§" && formattingCode) {
      pushBuffer();

      if (formattingCode in LEGACY_COLOR_CLASS) {
        colorClass = LEGACY_COLOR_CLASS[formattingCode]!;
        bold = false;
        italic = false;
      } else if (formattingCode === "l") {
        bold = true;
      } else if (formattingCode === "o") {
        italic = true;
      } else if (formattingCode === "r") {
        colorClass = "mc-tooltip-color-f";
        bold = false;
        italic = false;
      }

      index += 1;
      continue;
    }

    buffer += character;
  }

  pushBuffer();

  return segments;
};

const parsedTitle = computed(() => parseLegacyText(props.title));
const parsedLines = computed(() =>
  props.lines.map((line) => parseLegacyText(line))
);
</script>

<template>
  <div class="mc-tooltip" role="tooltip">
    <div class="mc-tooltip-line mc-tooltip-title">
      <template v-for="segment in parsedTitle" :key="segment.text">
        <span
          :class="[
            segment.colorClass,
            {
              'mc-tooltip-bold': segment.bold,
              'mc-tooltip-italic': segment.italic,
            },
          ]"
        >
          {{ segment.text }}
        </span>
      </template>
    </div>

    <div
      v-for="(line, lineIndex) in parsedLines"
      :key="lineIndex"
      class="mc-tooltip-line"
    >
      <template v-for="segment in line" :key="`${lineIndex}-${segment.text}`">
        <span
          :class="[
            segment.colorClass,
            {
              'mc-tooltip-bold': segment.bold,
              'mc-tooltip-italic': segment.italic,
            },
          ]"
        >
          {{ segment.text }}
        </span>
      </template>
    </div>
  </div>
</template>
