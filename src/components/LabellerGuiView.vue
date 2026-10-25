<script setup lang="ts">
import FitText from "./FitText.vue";
import HoverMinecraftTooltip from "./HoverMinecraftTooltip.vue";
import { publicAsset } from "pages-lib/visualTransformerHelpers";

export interface LabellerCard {
  name: string;
  type: string;
  tooltip: { title: string; lines: string[] };
}

const props = defineProps<{
  card?: LabellerCard;
  label: string;
}>();

const getTextureName = (type: string | undefined): string => {
  switch (type) {
    case "Boolean":
      return "boolean";
    case "Integer":
      return "integer";
    case "Double":
      return "double";
    case "Long":
      return "long";
    case "String":
      return "string";
    case "List":
      return "list";
    case "NBT":
      return "nbt";
    case "Operator":
    case "Curry":
    case "Pipe":
    case "Pipe2":
    case "Flip":
    case "Materialize":
      return "operator";
    default:
      return "object";
  }
};

const cardStyle = (type: string | undefined): Record<string, string> => ({
  backgroundImage: `url('${publicAsset(
    `valuetype/${getTextureName(type)}.png`
  )}'), url('${publicAsset("item/variable.png")}')`,
});

const frameStyle: Record<string, string> = {
  backgroundImage: `url('${publicAsset("gui/labeller.png")}')`,
};
</script>

<template>
  <div class="labeller-gui-frame-shell">
    <div class="labeller-gui-frame" :style="frameStyle">
      <div class="labeller-gui-overlay">
        <div class="labeller-slot">
          <HoverMinecraftTooltip
            v-if="props.card"
            :title="props.card.tooltip.title"
            :lines="props.card.tooltip.lines"
          >
            <div class="labeller-card" :style="cardStyle(props.card.type)" />
          </HoverMinecraftTooltip>
        </div>

        <div class="labeller-name-field">
          <FitText :text="props.label" align="left" end-fit />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.labeller-gui-frame-shell {
  width: calc(176px * 2);
  height: calc(113px * 2);
  max-width: 100%;
  overflow: visible;
  justify-self: center;
  margin-inline: auto;
}

.labeller-gui-frame {
  position: relative;
  width: 176px;
  height: 113px;
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 256px 256px;
  image-rendering: pixelated;
  box-shadow: 0 14px 30px rgba(24, 48, 58, 0.18);
  overflow: visible;
  transform: scale(2);
  transform-origin: top left;
}

.labeller-gui-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 176px;
  height: 113px;
  font-family: "Minecraft", "Tinos", "SymbolsFallback";
  color: #2d2d2d;
}

.labeller-slot {
  position: absolute;
  left: 8px;
  top: 8px;
  width: 16px;
  height: 16px;
}

.labeller-card {
  width: 16px;
  height: 16px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated;
}

.labeller-name-field {
  position: absolute;
  left: 36px;
  top: 11px;
  width: 87px;
  height: 9px;
  font-size: 9px;
  line-height: 9px;
  color: #ffffff;
}
</style>
