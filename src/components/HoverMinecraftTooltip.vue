<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from "vue";
import MinecraftTooltip from "./MinecraftTooltip.vue";

const props = defineProps<{
  title: string;
  lines: string[];
}>();

const anchor = ref<HTMLElement | null>(null);
const tooltip = ref<HTMLElement | null>(null);
const visible = ref(false);
const tooltipStyle = ref<Record<string, string>>({
  left: "0px",
  top: "0px",
});
let listeningToViewport = false;

let rafId: number | null = null;

const cancelScheduledUpdate = () => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
};

const updatePosition = () => {
  cancelScheduledUpdate();
  rafId = requestAnimationFrame(() => {
    rafId = null;

    const anchorElement = anchor.value;
    const tooltipElement = tooltip.value;
    if (!anchorElement || !tooltipElement) return;

    const anchorRect = anchorElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const margin = 8;

    let left = anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
    if (left + tooltipRect.width > viewportWidth - margin) {
      left = viewportWidth - margin - tooltipRect.width;
    }
    left = Math.max(margin, left);

    const top = anchorRect.top - tooltipRect.height - 4;

    tooltipStyle.value = {
      left: `${left}px`,
      top: `${top}px`,
    };
  });
};

const addViewportListeners = () => {
  if (listeningToViewport || typeof window === "undefined") return;
  window.addEventListener("resize", handleViewportChange);
  window.addEventListener("scroll", handleViewportChange, true);
  listeningToViewport = true;
};

const removeViewportListeners = () => {
  if (!listeningToViewport || typeof window === "undefined") return;
  window.removeEventListener("resize", handleViewportChange);
  window.removeEventListener("scroll", handleViewportChange, true);
  listeningToViewport = false;
};

const handleEnter = async () => {
  visible.value = true;
  addViewportListeners();
  await nextTick();
  updatePosition();
};

const handleLeave = () => {
  visible.value = false;
  cancelScheduledUpdate();
  removeViewportListeners();
};

const handleMove = () => {
  if (!visible.value) return;
  updatePosition();
};

const handleViewportChange = () => {
  if (!visible.value) return;
  updatePosition();
};

onBeforeUnmount(() => {
  cancelScheduledUpdate();
  removeViewportListeners();
});
</script>

<template>
  <div
    ref="anchor"
    class="logic-tooltip-anchor"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
    @mousemove="handleMove"
  >
    <slot />
  </div>

  <Teleport to="body">
    <div
      v-if="visible"
      ref="tooltip"
      class="logic-card-tooltip logic-card-tooltip-floating"
      :style="tooltipStyle"
    >
      <MinecraftTooltip :title="props.title" :lines="props.lines" />
    </div>
  </Teleport>
</template>
