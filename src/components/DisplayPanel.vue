<script setup lang="ts">
import FitText from "./FitText.vue";

const props = defineProps<{
  text: string;
  textColor?: string;
}>();

function getPixelColor(index: number): string {
  const row = Math.floor((index - 1) / 10);
  const col = (index - 1) % 10;

  const colors: Record<string, string> = {
    "0-0": "#27241f",
    "0-1": "#34474c",
    "0-2": "#425459",
    "0-3": "#465c61",
    "0-4": "#596a6d",
    "0-5": "#596a6d",
    "0-6": "#465c61",
    "0-7": "#425459",
    "0-8": "#34474c",
    "0-9": "#27241f",
    "1-0": "#34474c",
    "1-1": "#0d0f0e",
    "1-2": "#0d0f0e",
    "1-3": "#0d0f0e",
    "1-4": "#0d0f0e",
    "1-5": "#0d0f0e",
    "1-6": "#0d0f0e",
    "1-7": "#0d0f0e",
    "1-8": "#0d0f0e",
    "1-9": "#34474c",
    "2-0": "#425459",
    "2-1": "#0d0f0e",
    "2-2": "#0d0f0e",
    "2-3": "#0d0f0e",
    "2-4": "#0d0f0e",
    "2-5": "#0d0f0e",
    "2-6": "#0d0f0e",
    "2-7": "#0d0f0e",
    "2-8": "#0d0f0e",
    "2-9": "#425459",
    "3-0": "#465c61",
    "3-1": "#0d0f0e",
    "3-2": "#0d0f0e",
    "3-3": "#0d0f0e",
    "3-4": "#0d0f0e",
    "3-5": "#0d0f0e",
    "3-6": "#0d0f0e",
    "3-7": "#0d0f0e",
    "3-8": "#0d0f0e",
    "3-9": "#465c61",
    "4-0": "#596a6d",
    "4-1": "#0d0f0e",
    "4-2": "#0d0f0e",
    "4-3": "#0d0f0e",
    "4-4": "#0d0f0e",
    "4-5": "#0d0f0e",
    "4-6": "#0d0f0e",
    "4-7": "#0d0f0e",
    "4-8": "#0d0f0e",
    "4-9": "#596a6d",
    "5-0": "#596a6d",
    "5-1": "#0d0f0e",
    "5-2": "#0d0f0e",
    "5-3": "#0d0f0e",
    "5-4": "#0d0f0e",
    "5-5": "#0d0f0e",
    "5-6": "#0d0f0e",
    "5-7": "#0d0f0e",
    "5-8": "#0d0f0e",
    "5-9": "#596a6d",
    "6-0": "#465c61",
    "6-1": "#0d0f0e",
    "6-2": "#0d0f0e",
    "6-3": "#0d0f0e",
    "6-4": "#0d0f0e",
    "6-5": "#0d0f0e",
    "6-6": "#0d0f0e",
    "6-7": "#0d0f0e",
    "6-8": "#0d0f0e",
    "6-9": "#465c61",
    "7-0": "#425459",
    "7-1": "#0d0f0e",
    "7-2": "#0d0f0e",
    "7-3": "#0d0f0e",
    "7-4": "#0d0f0e",
    "7-5": "#0d0f0e",
    "7-6": "#0d0f0e",
    "7-7": "#0d0f0e",
    "7-8": "#0d0f0e",
    "7-9": "#425459",
    "8-0": "#34474c",
    "8-1": "#0d0f0e",
    "8-2": "#0d0f0e",
    "8-3": "#0d0f0e",
    "8-4": "#0d0f0e",
    "8-5": "#0d0f0e",
    "8-6": "#0d0f0e",
    "8-7": "#0d0f0e",
    "8-8": "#0d0f0e",
    "8-9": "#34474c",
    "9-0": "#27241f",
    "9-1": "#34474c",
    "9-2": "#425459",
    "9-3": "#465c61",
    "9-4": "#596a6d",
    "9-5": "#596a6d",
    "9-6": "#465c61",
    "9-7": "#425459",
    "9-8": "#34474c",
    "9-9": "#27241f",
  };

  const key = `${row}-${col}`;
  return colors[key] || "#0d0f0e";
}
</script>

<template>
  <div class="display-panel">
    <div class="panel-grid">
      <div
        v-for="i in 100"
        :key="i"
        class="pixel"
        :style="{ background: getPixelColor(i) }"
      ></div>
    </div>
    <div class="display-panel-screen">
      <FitText
        :text="props.text"
        :color="props.textColor"
        :min-scale="0.5"
        align="center"
      />
    </div>
  </div>
</template>

<style scoped>
.display-panel {
  width: 230px;
  height: 230px;
  image-rendering: pixelated;
  position: relative;
}

.panel-grid {
  display: grid;
  grid-template-columns: repeat(10, 23px);
  grid-template-rows: repeat(10, 23px);
  position: absolute;
  left: 0;
  top: 0;
}

.pixel {
  width: 23px;
  height: 23px;
}

.display-panel-screen {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 172px;
  height: 172px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family:
    "JetBrains Mono", "IBM Plex Mono", "Fira Code", ui-monospace,
    SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", monospace;
  color: #00ff00;
  font-size: 32px;
  overflow: hidden;
  background: #0a0c0e;
}

.display-panel-screen :deep(.fit-text) {
  font-size: 32px;
  line-height: 1;
}

.display-panel-screen :deep(.fit-text-inner) {
  white-space: nowrap;
}
</style>
