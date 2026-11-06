<script setup lang="ts">
import { computed } from "vue";
import FitText from "./FitText.vue";
import HoverMinecraftTooltip from "./HoverMinecraftTooltip.vue";
import { publicAsset } from "pages-lib/visualTransformerHelpers";

export interface DelayCard {
  name: string;
  type: string;
  tooltip: { title: string; lines: string[] };
}

const props = defineProps<{
  inputCard?: DelayCard;
  resultCard?: DelayCard;
  valueText?: string;
  tick?: number;
  interval?: number;
  capacity?: number;
  frozen?: boolean;
  error?: string;
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
  backgroundImage: `url('${publicAsset("gui/delay.png")}')`,
};

const emptyDiamondStyle: Record<string, string> = {
  backgroundImage: `url('${publicAsset("slot/variable_empty.png")}')`,
};

const readValueText = computed(() =>
  props.error ? "ERROR" : (props.valueText ?? "")
);

const statusText = computed(() => {
  const tick = props.tick ?? 0;
  return props.frozen ? `tick ${tick} · frozen` : `tick ${tick}`;
});
</script>

<template>
  <div class="delay-gui-frame-shell">
    <div class="delay-gui-frame" :style="frameStyle">
      <div class="delay-gui-overlay">
        <div class="delay-title">
          <FitText text="Delayer" align="left" :min-scale="0.5" exact-fit />
        </div>

        <div class="delay-status">
          <FitText :text="statusText" align="left" :min-scale="0.5" exact-fit />
        </div>

        <div class="delay-read-value">
          <HoverMinecraftTooltip
            v-if="props.error"
            :title="props.error"
            :lines="[]"
          >
            <FitText
              :text="readValueText"
              align="center"
              :min-scale="0.5"
              color="#fa0a0d"
              exact-fit
            />
          </HoverMinecraftTooltip>
          <FitText
            v-else
            :text="readValueText"
            align="center"
            :min-scale="0.5"
            exact-fit
          />
        </div>

        <div class="delay-slot delay-slot-input">
          <HoverMinecraftTooltip
            v-if="props.inputCard"
            :title="props.inputCard.tooltip.title"
            :lines="props.inputCard.tooltip.lines"
          >
            <div class="delay-card" :style="cardStyle(props.inputCard.type)" />
          </HoverMinecraftTooltip>
        </div>

        <div class="delay-slot delay-slot-write-in">
          <div class="delay-empty-diamond" :style="emptyDiamondStyle" />
        </div>

        <div class="delay-slot delay-slot-write-out">
          <HoverMinecraftTooltip
            v-if="props.resultCard"
            :title="props.resultCard.tooltip.title"
            :lines="props.resultCard.tooltip.lines"
          >
            <div class="delay-card" :style="cardStyle(props.resultCard.type)" />
          </HoverMinecraftTooltip>
        </div>

        <div class="delay-label delay-label-interval">
          <FitText
            text="Ticks/Operation"
            align="left"
            :min-scale="0.5"
            exact-fit
          />
        </div>
        <div class="delay-field delay-field-interval">
          <FitText
            :text="`${props.interval ?? 1}`"
            align="left"
            :min-scale="0.5"
            color="#ffffff"
            exact-fit
          />
        </div>

        <div class="delay-label delay-label-capacity">
          <FitText text="Capacity" align="left" :min-scale="0.5" exact-fit />
        </div>
        <div class="delay-field delay-field-capacity">
          <FitText
            :text="`${props.capacity ?? 5}`"
            align="left"
            :min-scale="0.5"
            color="#ffffff"
            exact-fit
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.delay-gui-frame-shell {
  width: calc(176px * 2);
  height: calc(227px * 2);
  max-width: 100%;
  overflow: visible;
  justify-self: center;
  margin-inline: auto;
}

.delay-gui-frame {
  position: relative;
  width: 176px;
  height: 227px;
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 256px 256px;
  image-rendering: pixelated;
  box-shadow: 0 14px 30px rgba(24, 48, 58, 0.18);
  overflow: visible;
  transform: scale(2);
  transform-origin: top left;
}

.delay-gui-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 176px;
  height: 227px;
  font-family: "Minecraft", "Tinos", "SymbolsFallback";
  color: #2d2d2d;
}

.delay-title {
  position: absolute;
  left: 8px;
  top: 6px;
  width: 60px;
  height: 10px;
  font-size: 10px;
  line-height: 10px;
  color: #404040;
}

.delay-status {
  position: absolute;
  left: 70px;
  top: 6px;
  width: 98px;
  height: 10px;
  font-size: 10px;
  line-height: 10px;
  color: #404040;
}

.delay-read-value {
  position: absolute;
  left: 54px;
  top: 57px;
  width: 70px;
  height: 9px;
  font-size: 9px;
  line-height: 9px;
  color: #404040;
}

.delay-slot {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.delay-slot-input {
  left: 81px;
  top: 25px;
}

.delay-slot-write-in {
  left: 56px;
  top: 78px;
}

.delay-slot-write-out {
  left: 104px;
  top: 78px;
}

.delay-card {
  width: 16px;
  height: 16px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated;
}

.delay-empty-diamond {
  width: 16px;
  height: 16px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated;
}

.delay-label {
  position: absolute;
  left: 8px;
  width: 84px;
  height: 9px;
  font-size: 9px;
  line-height: 9px;
  color: #404040;
}

.delay-label-interval {
  top: 104px;
}

.delay-label-capacity {
  top: 128px;
}

.delay-field {
  position: absolute;
  left: 98px;
  width: 73px;
  height: 14px;
  padding-left: 3px;
  box-sizing: border-box;
  font-size: 9px;
  line-height: normal;
  background: #000000;
  border: 1px solid #a0a0a0;
  color: #ffffff;
}

.delay-field-interval {
  top: 102px;
}

.delay-field-capacity {
  top: 126px;
}
</style>
