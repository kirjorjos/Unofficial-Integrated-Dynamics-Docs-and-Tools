<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import DisplayPanel from "./DisplayPanel.vue";
import { getTypeColor } from "pages-lib/visualTransformer";

const props = defineProps<{
  text: string;
  textColor?: string;
  align?: string;
  typeName?: string;
}>();

const textColor = computed(() => {
  if (props.textColor) {
    return props.textColor;
  }
  if (props.typeName) {
    return getTypeColor(props.typeName);
  }
  return "#00ff00";
});

const align = computed(() => {
  const a = props.align;
  if (a === "left" || a === "center" || a === "top") {
    return a;
  }
  return "center";
});

const isFullscreen = ref(false);

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value;
}

function handlePanelClick() {
  if (isFullscreen.value) {
    return;
  }
  toggleFullscreen();
}

function handleOverlayClick() {
  if (isFullscreen.value) {
    isFullscreen.value = false;
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && isFullscreen.value) {
    isFullscreen.value = false;
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div class="display-panel-wrapper">
    <div class="normal-panel" @click="handlePanelClick">
      <DisplayPanel
        :text="props.text"
        :text-color="textColor"
        :align="align"
        :type-name="props.typeName"
      />
    </div>
    <div
      v-if="isFullscreen"
      class="fullscreen-overlay"
      @click="handleOverlayClick"
    >
      <div class="fullscreen-content" @click.stop>
        <DisplayPanel
          :text="props.text"
          :text-color="textColor"
          :align="align"
          :type-name="props.typeName"
          :is-fullscreen="true"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: pointer;
}

.fullscreen-content {
  cursor: default;
  transform: scale(1.5);
  transform-origin: center;
}

.fullscreen-content :deep(.display-panel) {
  width: 345px;
  height: 345px;
}

.fullscreen-content :deep(.panel-grid) {
  grid-template-columns: repeat(10, 34.5px);
  grid-template-rows: repeat(10, 34.5px);
}

.fullscreen-content :deep(.pixel) {
  width: 34.5px;
  height: 34.5px;
}

.fullscreen-content :deep(.display-panel-screen) {
  width: 240px;
  height: 240px;
}

.fullscreen-content :deep(.fit-text) {
  font-size: 48px;
}

.fullscreen-content :deep(.fit-text-inner) {
  white-space: nowrap;
}

.normal-panel {
  cursor: pointer;
}

.display-panel-wrapper {
  display: inline-block;
}
</style>
