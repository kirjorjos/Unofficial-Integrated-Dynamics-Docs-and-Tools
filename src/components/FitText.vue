<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { snapToPixelGrid } from "pages-lib/visualTextScaling";

const props = withDefaults(
  defineProps<{
    text: string;
    minScale?: number;
    align?: "left" | "center" | "top";
    color?: string;
    typeName?: string;
    fill?: boolean;
    /** When true, scale to exact fit instead of flooring to minScale. */
    exactFit?: boolean;
  }>(),
  {
    minScale: 0.5,
    align: "left",
    fill: false,
  }
);

const containerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

let resizeObserver: ResizeObserver | null = null;
let scheduledFrame: number | null = null;

const updateScale = () => {
  const container = containerRef.value;
  const content = contentRef.value;
  if (!container || !content) return;

  content.style.fontSize = "1em";

  const availableWidth = container.clientWidth;
  const availableHeight = container.clientHeight;

  if (availableWidth <= 0 || availableHeight <= 0) {
    content.style.fontSize = "1em";
    return;
  }

  // Measure at base font size to get non-wrapped dimensions
  const baseWidth = content.scrollWidth;
  const baseHeight = content.scrollHeight;

  if (baseWidth <= 0 || baseHeight <= 0) {
    content.style.fontSize = "1em";
    return;
  }

  // Convert the em multiplier to px via the container's computed font size:
  // the pre-snapping code set `fontSize = ${scaleEm}em`, which resolves against
  // the container's font-size — so `scaleEm * parentPx` px is the same size,
  // then snapped to an integer pixel (this was left undefined, throwing a
  // ReferenceError on every updateScale and silently rendering all text at 1em).
  const parentPx =
    Number.parseFloat(getComputedStyle(container).fontSize) || 16;

  const applySize = (scaleEm: number) => {
    content.style.fontSize = `${snapToPixelGrid(scaleEm * parentPx)}px`;
  };

  // Calculate scale to fit BOTH dimensions
  const widthRatio = availableWidth / baseWidth;
  const heightRatio = availableHeight / baseHeight;

  // For integer, string, and operator types (or when explicitly asked to
  // fill), normalize to larger dimension (treat as square-ish) so text fills
  // container in the dominant dimension
  const isSpecialType =
    props.fill ||
    props.typeName === "Integer" ||
    props.typeName === "String" ||
    props.typeName === "Operator";
  let neededScale: number;
  if (isSpecialType) {
    const largerDimension = Math.max(baseWidth, baseHeight);
    const largerContainer = Math.max(availableWidth, availableHeight);
    neededScale = largerContainer / largerDimension;
  } else {
    neededScale = Math.min(widthRatio, heightRatio);
  }

  const minScale = props.minScale ?? 0.5;

  if (neededScale >= 1) {
    if (isSpecialType) {
      applySize(neededScale);
      return;
    }
    applySize(1);
    return;
  }

  if (props.exactFit) {
    // Scale to the exact fit size — best for contexts where text should be
    // as large as possible (e.g. the reader GUI search bar).
    applySize(Math.max(neededScale, minScale));
  } else {
    // Legacy behaviour: floor to minScale when text fits there, so
    // display panels and other existing callers keep their baseline
    // layout unchanged.
    const fitsAtMinScale =
      baseWidth * minScale <= availableWidth &&
      baseHeight * minScale <= availableHeight;
    applySize(fitsAtMinScale ? minScale : neededScale);
  }
};

const scheduleUpdate = () => {
  if (scheduledFrame !== null) cancelAnimationFrame(scheduledFrame);
  void nextTick(() => {
    scheduledFrame = window.requestAnimationFrame(() => {
      scheduledFrame = null;
      updateScale();
    });
  });
};

const innerStyle = computed(() => {
  const isCenter = props.align === "center";
  const isTop = props.align === "top";
  return {
    left: isCenter ? "50%" : "0",
    top: isTop ? "0" : "50%",
    transform: isCenter
      ? "translate(-50%, -50%)"
      : isTop
        ? "translateY(0)"
        : "translateY(-50%)",
  };
});

const textLines = computed(() => props.text.split("\n"));

const lineStyle = computed(() => {
  if (props.color) {
    return { color: props.color };
  }
  return {};
});

watch(
  () => [props.text, props.align, props.minScale, props.color],
  scheduleUpdate
);

onMounted(() => {
  scheduleUpdate();
  if (document.fonts?.ready) {
    void document.fonts.ready.then(() => scheduleUpdate());
  }
  resizeObserver = new ResizeObserver(scheduleUpdate);
  if (containerRef.value) resizeObserver.observe(containerRef.value);
  window.addEventListener("resize", scheduleUpdate);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  if (scheduledFrame !== null) cancelAnimationFrame(scheduledFrame);
  window.removeEventListener("resize", scheduleUpdate);
});
</script>

<template>
  <span ref="containerRef" class="fit-text">
    <span ref="contentRef" class="fit-text-inner" :style="innerStyle">
      <span v-for="(line, index) in textLines" :key="index" :style="lineStyle">
        {{ line
        }}<span v-if="index < textLines.length - 1" class="line-break" />
      </span>
    </span>
  </span>
</template>

<style scoped>
.line-break {
  display: block;
}
</style>
