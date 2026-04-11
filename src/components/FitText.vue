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
    align?: "left" | "center";
    color?: string;
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

  const lines = props.text.split("\n");
  const isMultiLine = lines.length > 1;

  let low = isMultiLine ? 0.3 : props.minScale;
  let high = 1;
  let best = isMultiLine ? 0.3 : props.minScale;

  for (let index = 0; index < 8; index += 1) {
    const mid = (low + high) / 2;
    content.style.fontSize = `${mid}em`;

    const contentWidth = content.scrollWidth;
    const contentHeight = content.scrollHeight;
    const fits =
      contentWidth <= availableWidth &&
      (isMultiLine || contentHeight <= availableHeight);

    if (fits) {
      best = mid;
      low = mid;
    } else {
      high = mid;
    }
  }

  content.style.fontSize = `${best}em`;
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

const innerStyle = computed(() => ({
  left: props.align === "center" ? "50%" : "0",
  top: "50%",
  transform:
    props.align === "center" ? "translate(-50%, -50%)" : "translateY(-50%)",
}));

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
