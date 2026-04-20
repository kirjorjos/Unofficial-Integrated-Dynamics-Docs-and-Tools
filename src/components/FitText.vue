<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";

const props = withDefaults(
  defineProps<{
    text: string;
    minScale?: number;
    align?: "left" | "center" | "top";
    color?: string;
    typeName?: string;
  }>(),
  {
    minScale: 0.5,
    align: "left",
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

  // Calculate scale to fit BOTH dimensions
  const widthRatio = availableWidth / baseWidth;
  const heightRatio = availableHeight / baseHeight;

  // For integer types, normalize to larger dimension (treat as square-ish)
  // so text fills container in the dominant dimension
  const isIntegerType = props.typeName === "Integer";
  let neededScale: number;
  if (isIntegerType) {
    const largerDimension = Math.max(baseWidth, baseHeight);
    const largerContainer = Math.max(availableWidth, availableHeight);
    neededScale = largerContainer / largerDimension;
  } else {
    neededScale = Math.min(widthRatio, heightRatio);
  }

  const minScale = props.minScale ?? 0.5;

  if (neededScale >= 1) {
    if (isIntegerType) {
      content.style.fontSize = `${neededScale}em`;
      return;
    }
    content.style.fontSize = "1em";
    return;
  }

  // Text needs to shrink - check if minScale would work
  const fitsAtMinScale =
    baseWidth * minScale <= availableWidth &&
    baseHeight * minScale <= availableHeight;

  if (fitsAtMinScale) {
    content.style.fontSize = `${minScale}em`;
    return;
  }

  // Need to scale down more than minScale allows
  content.style.fontSize = `${neededScale}em`;
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
