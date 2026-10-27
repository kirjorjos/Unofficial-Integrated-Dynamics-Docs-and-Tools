<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { computeTooltipWidth, isInfoLine } from "pages-lib/tooltipWidth";

type TooltipSegment = {
  text: string;
  colorClass: string;
  bold: boolean;
  italic: boolean;
};

type TooltipLine = {
  info: boolean;
  segments: TooltipSegment[];
  words: string[];
  wordClasses: (string | Record<string, boolean>)[];
};

const props = defineProps<{
  title: string;
  lines: string[];
}>();

const DEFAULT_COLOR_CLASS = "mc-tooltip-color-f";

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
  let colorClass = DEFAULT_COLOR_CLASS;
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
        colorClass = DEFAULT_COLOR_CLASS;
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

const classListFor = (
  segment: Pick<TooltipSegment, "colorClass" | "bold" | "italic">
): (string | Record<string, boolean>)[] => [
  segment.colorClass,
  {
    "mc-tooltip-bold": segment.bold,
    "mc-tooltip-italic": segment.italic,
  },
];

const parsedTitle = computed(() => parseLegacyText(props.title));
const parsedLines = computed<TooltipLine[]>(() =>
  props.lines.map((line) => {
    const segments = parseLegacyText(line);
    if (!isInfoLine(line)) {
      return { info: false, segments, words: [], wordClasses: [] };
    }

    const format = segments[0] ?? {
      colorClass: DEFAULT_COLOR_CLASS,
      bold: false,
      italic: false,
    };
    const text = segments.map((segment) => segment.text).join("");

    return {
      info: true,
      segments,
      words: text.split(/\s+/).filter((word) => word.length > 0),
      wordClasses: classListFor(format),
    };
  })
);

const tooltipRoot = ref<HTMLElement | null>(null);
const tooltipWidth = ref<number | null>(null);

const tooltipStyle = computed(() =>
  tooltipWidth.value === null ? undefined : { width: `${tooltipWidth.value}px` }
);

const boxChromeWidth = (element: HTMLElement): number => {
  const style = window.getComputedStyle(element);
  const toPx = (value: string) => Number.parseFloat(value) || 0;

  return (
    toPx(style.paddingLeft) +
    toPx(style.paddingRight) +
    toPx(style.borderLeftWidth) +
    toPx(style.borderRightWidth)
  );
};

const measure = () => {
  const root = tooltipRoot.value;
  if (!root || typeof window === "undefined") return;

  let widestLinePx = 0;
  let widestWordPx = 0;

  root
    .querySelectorAll<HTMLElement>(
      ".mc-tooltip-line:not(.mc-tooltip-line-info)"
    )
    .forEach((line) => {
      widestLinePx = Math.max(widestLinePx, line.offsetWidth);
    });

  root.querySelectorAll<HTMLElement>(".mc-tooltip-word").forEach((word) => {
    widestWordPx = Math.max(widestWordPx, word.offsetWidth);
  });

  const contentWidth = computeTooltipWidth({ widestLinePx, widestWordPx });
  tooltipWidth.value =
    contentWidth > 0 ? Math.ceil(contentWidth + boxChromeWidth(root)) : null;
};

onMounted(() => {
  measure();
  document.fonts?.ready.then(() => measure()).catch(() => undefined);
});

watch(
  () => [props.title, ...props.lines],
  () => measure(),
  { flush: "post" }
);
</script>

<template>
  <div
    ref="tooltipRoot"
    class="mc-tooltip"
    role="tooltip"
    :style="tooltipStyle"
  >
    <div class="mc-tooltip-line mc-tooltip-title">
      <span
        v-for="segment in parsedTitle"
        :key="segment.text"
        :class="classListFor(segment)"
      >
        {{ segment.text }}
      </span>
    </div>

    <div
      v-for="(line, lineIndex) in parsedLines"
      :key="lineIndex"
      class="mc-tooltip-line"
      :class="{ 'mc-tooltip-line-info': line.info }"
    >
      <template v-if="line.info">
        <template v-for="(word, wordIndex) in line.words" :key="wordIndex">
          <span class="mc-tooltip-word" :class="line.wordClasses">{{
            word
          }}</span>
          {{ " " }}
        </template>
      </template>

      <template v-else>
        <span
          v-for="segment in line.segments"
          :key="`${lineIndex}-${segment.text}`"
          :class="classListFor(segment)"
        >
          {{ segment.text }}
        </span>
      </template>
    </div>
  </div>
</template>
