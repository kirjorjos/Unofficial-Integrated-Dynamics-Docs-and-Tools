<script setup lang="ts">
import { computed } from "vue";
import FitText from "./FitText.vue";
import HoverMinecraftTooltip from "./HoverMinecraftTooltip.vue";
import { publicAsset } from "pages-lib/visualTransformerHelpers";
import { getMaterializerMiddleText } from "pages-lib/visualTransformerLogic";

export interface MaterializerCard {
  name: string;
  type: string;
  tooltip: { title: string; lines: string[] };
  node?: TypeAST.AST;
}

const props = defineProps<{
  topCard?: MaterializerCard;
  resultCard?: MaterializerCard;
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
  backgroundImage: `url('${publicAsset("gui/materializer.png")}')`,
};

const emptyDiamondStyle: Record<string, string> = {
  backgroundImage: `url('${publicAsset("slot/variable_empty.png")}')`,
};

const middleText = computed(() => {
  const card = props.topCard;
  if (!card?.node) return "";
  try {
    return getMaterializerMiddleText(card.node, card.name);
  } catch {
    return card.name;
  }
});
</script>

<template>
  <div class="materializer-gui-frame-shell">
    <div class="materializer-gui-frame" :style="frameStyle">
      <div class="materializer-gui-overlay">
        <div class="materializer-title">
          <FitText
            text="Materializer"
            align="left"
            :min-scale="0.5"
            exact-fit
          />
        </div>

        <div class="materializer-read-value">
          <FitText
            :text="middleText"
            align="center"
            :min-scale="0.5"
            exact-fit
          />
        </div>

        <div class="materializer-slot materializer-slot-top">
          <HoverMinecraftTooltip
            v-if="props.topCard"
            :title="props.topCard.tooltip.title"
            :lines="props.topCard.tooltip.lines"
          >
            <div
              class="materializer-card"
              :style="cardStyle(props.topCard.type)"
            />
          </HoverMinecraftTooltip>
        </div>

        <div class="materializer-slot materializer-slot-left">
          <div class="materializer-empty-diamond" :style="emptyDiamondStyle" />
        </div>

        <div class="materializer-slot materializer-slot-right">
          <HoverMinecraftTooltip
            v-if="props.resultCard"
            :title="props.resultCard.tooltip.title"
            :lines="props.resultCard.tooltip.lines"
          >
            <div
              class="materializer-card"
              :style="cardStyle(props.resultCard.type)"
            />
          </HoverMinecraftTooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.materializer-gui-frame-shell {
  width: calc(176px * 2);
  height: calc(189px * 2);
  max-width: 100%;
  overflow: visible;
  justify-self: center;
  margin-inline: auto;
}

.materializer-gui-frame {
  position: relative;
  width: 176px;
  height: 189px;
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 256px 256px;
  image-rendering: pixelated;
  box-shadow: 0 14px 30px rgba(24, 48, 58, 0.18);
  overflow: visible;
  transform: scale(2);
  transform-origin: top left;
}

.materializer-gui-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 176px;
  height: 189px;
  font-family: "Minecraft", "Tinos", "SymbolsFallback";
  color: #2d2d2d;
}

.materializer-title {
  position: absolute;
  left: 8px;
  top: 6px;
  width: 120px;
  height: 10px;
  font-size: 10px;
  line-height: 10px;
  color: #404040;
}

.materializer-read-value {
  position: absolute;
  left: 52px;
  top: 52px;
  width: 74px;
  height: 9px;
  font-size: 10px;
  line-height: 9px;
  color: #404040;
}

.materializer-slot {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.materializer-slot-top {
  left: 81px;
  top: 25px;
}

.materializer-slot-left {
  left: 56px;
  top: 78px;
}

.materializer-slot-right {
  left: 104px;
  top: 78px;
}

.materializer-card {
  width: 16px;
  height: 16px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated;
}

.materializer-empty-diamond {
  width: 16px;
  height: 16px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated;
}
</style>
