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

  let low = props.minScale;
  let high = 1;
  let best = props.minScale;

  for (let index = 0; index < 8; index += 1) {
    const mid = (low + high) / 2;
    content.style.fontSize = `${mid}em`;

    const contentWidth = content.scrollWidth;
    const contentHeight = content.scrollHeight;
    const fits =
      contentWidth <= availableWidth && contentHeight <= availableHeight;

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

watch(() => [props.text, props.align, props.minScale], scheduleUpdate);

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
      {{ text }}
    </span>
  </span>
</template>
