<script setup lang="ts">
import { computed } from "vue";
import FitText from "./FitText.vue";
import HoverMinecraftTooltip from "./HoverMinecraftTooltip.vue";
import { publicAsset } from "pages-lib/visualTransformerHelpers";
import { LOGIC_PROGRAMMER_TYPE_COLORS } from "pages-lib/visualTransformer";
import type { ReaderStatic } from "lib/IntegratedDynamicsClasses/readers/ReaderBase";
import { getReaderAspectDefaultValue } from "lib/IntegratedDynamicsClasses/readers/readerRegistry";

const props = withDefaults(
  defineProps<{
    reader: ReaderStatic;
    /** The aspect currently being made — shown in search bar, scrolled to row 0. */
    focusedAspect?: string;
    /** Per-aspect display values (aspectKey -> text shown in the value box). */
    values?: Record<string, string>;
    typeError?: string;
  }>(),
  {}
);

const ASPECT_BOX_HEIGHT = 36;
const PAGE_SIZE = 3;

const READER_TITLES: Record<string, string> = {
  redstone: "Redstone Reader",
  inventory: "Inventory Reader",
  world: "World Reader",
  fluid: "Fluid Reader",
  network: "Network Reader",
  block: "Block Reader",
  entity: "Entity Reader",
  extradimensional: "Extra-Dimensional Reader",
  machine: "Machine Reader",
  audio: "Audio Reader",
};

const getTypeName = (aspectKey: string): string =>
  props.reader.aspects[aspectKey]?.outputType ?? "Any";

const getAspectName = (aspectKey: string): string =>
  props.reader.aspects[aspectKey]?.fullDisplayName ?? aspectKey;

const STRING_RED = LOGIC_PROGRAMMER_TYPE_COLORS["String"]?.primary ?? "#fa0a0d";

const hasTypeError = (aspectKey: string): boolean =>
  aspectKey === props.focusedAspect && !!props.typeError;

const getTypeColor = (aspectKey: string): string => {
  if (hasTypeError(aspectKey)) return STRING_RED;
  return (
    LOGIC_PROGRAMMER_TYPE_COLORS[getTypeName(aspectKey)]?.primary ?? "#f3f3f3"
  );
};

const getAspectDefaultValue = (aspectKey: string): string =>
  getReaderAspectDefaultValue(props.reader, aspectKey);

const getSmoothenedColor = (hex: string): string => {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((offset) => {
    const channel = parseInt(value.slice(offset, offset + 2), 16);
    return Math.round(191.25 + channel / 4);
  });
  return `rgb(${channels.join(", ")})`;
};

const getAspectValue = (aspectKey: string): string => {
  if (hasTypeError(aspectKey)) return "ERROR";
  return props.values?.[aspectKey] ?? getAspectDefaultValue(aspectKey);
};

const getAspectHasSettings = (aspectKey: string): boolean => {
  const settings = props.reader.aspects[aspectKey]?.settings;
  return !!settings && Object.keys(settings).length > 0;
};

const allAspectKeys = computed(() => Object.keys(props.reader.aspects));

const visibleAspects = computed(() => {
  if (props.focusedAspect) {
    const idx = allAspectKeys.value.indexOf(props.focusedAspect);
    if (idx >= 0) return [props.focusedAspect];
  }
  // Show up to PAGE_SIZE aspects from the scroll position
  // For simplicity in static rendering, show first PAGE_SIZE when unfocused
  return allAspectKeys.value.slice(0, PAGE_SIZE);
});

const totalRows = computed(() =>
  props.focusedAspect ? 1 : allAspectKeys.value.length
);

const getAspectIconPath = (aspectKey: string): string | null => {
  const icon = props.reader.aspects[aspectKey]?.icon;
  return icon ? `aspect/read/${icon}.png` : null;
};

const cardStyle = (aspectKey: string): Record<string, string> => {
  const iconPath = getAspectIconPath(aspectKey);
  const layers = [
    iconPath ? publicAsset(iconPath) : publicAsset("valuetype/any.png"),
    publicAsset("item/variable.png"),
  ];
  return { backgroundImage: layers.map((u) => `url('${u}')`).join(", ") };
};

const title = computed(
  () =>
    READER_TITLES[props.reader.shortName] ?? `${props.reader.shortName} Reader`
);

const searchQuery = computed(() =>
  props.focusedAspect ? getAspectName(props.focusedAspect) : ""
);

const scrollFraction = computed(() => {
  if (totalRows.value <= PAGE_SIZE) return 0;
  if (props.focusedAspect) {
    const idx = allAspectKeys.value.indexOf(props.focusedAspect);
    const maxFirst = Math.max(0, allAspectKeys.value.length - PAGE_SIZE);
    return Math.min(idx, maxFirst) / maxFirst;
  }
  return 0;
});

const thumbTop = computed(() => {
  if (totalRows.value <= PAGE_SIZE) return 0;
  const travel = 112 - 17; // scrollbar track height - thumb height - 2
  return Math.round(travel * scrollFraction.value);
});
</script>

<template>
  <div class="reader-gui-frame-shell">
    <div class="reader-gui-frame">
      <div class="reader-gui-overlay">
        <!-- Title: centered at GUI (41, 10), 70px wide -->
        <div class="reader-title">
          <FitText :text="title" align="center" :min-scale="0.5" exact-fit />
        </div>

        <!-- Search field: GUI (82, 6), 89×9, white text -->
        <div class="reader-search-field">
          <FitText
            :text="searchQuery"
            align="center"
            :min-scale="0.4"
            color="#ffffff"
            exact-fit
          />
        </div>

        <!-- Aspect rows -->
        <div
          v-for="(aspectKey, index) in visibleAspects"
          :key="aspectKey"
          class="reader-row"
          :style="{ top: `${18 + ASPECT_BOX_HEIGHT * index}px` }"
        >
          <!-- Row sprite background from part_reader.png (0,213,160,35) -->
          <div class="reader-row-bg" />

          <!-- Tint overlay (multiply blend) -->
          <div
            class="reader-row-tint"
            :style="{ background: getSmoothenedColor(getTypeColor(aspectKey)) }"
          />

          <!-- Top-left output card (always shown) -->
          <div class="reader-row-card" :style="cardStyle(aspectKey)" />

          <!-- Aspect name: centered at row-rel (48.5, 7) = GUI (57.5, 25+36i) -->
          <div class="reader-row-name">
            <FitText
              :text="getAspectName(aspectKey)"
              align="center"
              :min-scale="0.4"
              exact-fit
            />
          </div>

          <!-- Value text: centered at row-rel (42, 20.5) = GUI (51, 38.5+36i) -->
          <div class="reader-row-value">
            <FitText
              :text="getAspectValue(aspectKey)"
              align="center"
              :color="getTypeColor(aspectKey)"
              exact-fit
            />
          </div>

          <!-- Input slot: variable_empty diamond at row-rel (86, 8) -->
          <div class="reader-slot-input">
            <div class="reader-slot-input-diamond" />
          </div>

          <!-- Output slot: card shown only for the focused aspect; an error
               X (with the type-error tooltip) replaces it on simulated-output
               type mismatches -->
          <div class="reader-slot-output">
            <HoverMinecraftTooltip
              v-if="aspectKey === focusedAspect && props.typeError"
              :title="props.typeError"
              :lines="[]"
            >
              <span class="logic-type-error-icon reader-output-error-icon" />
            </HoverMinecraftTooltip>
            <div
              v-else-if="aspectKey === focusedAspect"
              class="reader-slot-output-card"
              :style="cardStyle(aspectKey)"
            />
          </div>

          <!-- "+" button: only on aspects with settings -->
          <div v-if="getAspectHasSettings(aspectKey)" class="reader-plus">
            +
          </div>
        </div>

        <!-- Settings button: icons.png bg_inactive + settings middle -->
        <div class="reader-settings-button" />

        <!-- Offsets button: icons.png bg_inactive + offsets middle -->
        <div class="reader-offsets-button" />

        <!-- Scrollbar thumb: only when list is scrollable -->
        <div
          v-if="totalRows > PAGE_SIZE"
          class="reader-scrollbar-thumb"
          :style="{ top: `${18 + thumbTop}px` }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.reader-gui-frame-shell {
  width: calc(195px * 2);
  height: calc(213px * 2);
  max-width: 100%;
  overflow: visible;
}

.reader-gui-frame {
  position: relative;
  width: 195px;
  height: 213px;
  background: url("/gui/part_reader.png") top left / 256px 256px no-repeat;
  image-rendering: pixelated;
  box-shadow: 0 14px 30px rgba(24, 48, 58, 0.18);
  overflow: visible;
  transform: scale(2);
  transform-origin: top left;
}

.reader-gui-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 195px;
  height: 213px;
  font-family: "Minecraft", "Tinos", "SymbolsFallback";
  color: #2d2d2d;
}

.reader-title {
  position: absolute;
  left: 6px;
  top: 5px;
  width: 70px;
  height: 10px;
  font-size: 10px;
  line-height: 10px;
  color: #404040;
}

.reader-search-field {
  position: absolute;
  left: 82px;
  top: 6px;
  width: 89px;
  height: 9px;
  font-size: 9px;
  line-height: 9px;
  color: #ffffff;
}

.reader-row {
  position: absolute;
  left: 9px;
  width: 160px;
  height: 35px;
}

.reader-row-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 160px;
  height: 35px;
  background: url("/gui/part_reader.png") 0 -213px / 256px 256px no-repeat;
  image-rendering: pixelated;
}

.reader-row-tint {
  position: absolute;
  left: 0;
  top: 0;
  width: 160px;
  height: 35px;
  mix-blend-mode: multiply;
}

.reader-row-card {
  position: absolute;
  left: -1px;
  top: -1px;
  width: 16px;
  height: 16px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated;
}

.reader-row-name {
  position: absolute;
  left: 17px;
  top: 1.5px;
  width: 63px;
  height: 11px;
  font-size: 11px;
  line-height: 11px;
  color: #282828;
}

.reader-row-value {
  position: absolute;
  left: 7px;
  top: 16px;
  width: 70px;
  height: 9px;
  font-size: 9px;
  line-height: 9px;
}

.reader-slot-input {
  position: absolute;
  left: 85px;
  top: 7px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reader-slot-input-diamond {
  width: 16px;
  height: 16px;
  background: url("/slot/variable_empty.png") center / 16px 16px no-repeat;
  image-rendering: pixelated;
}

.reader-slot-output {
  position: absolute;
  left: 134px;
  top: 8px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reader-slot-output-card {
  width: 16px;
  height: 16px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated;
}

.reader-output-error-icon {
  width: 14px;
  height: 14px;
}

.reader-plus {
  position: absolute;
  left: 116px;
  top: 20px;
  width: 10px;
  height: 10px;
  background: #8b8b8b;
  box-shadow:
    inset 1px 1px 0 #c6c6c6,
    inset -1px -1px 0 #555555;
  color: #e8e8e8;
  font-size: 8px;
  line-height: 10px;
  text-align: center;
  text-shadow: 1px 1px 0 rgba(40, 40, 40, 0.8);
}

.reader-settings-button {
  position: absolute;
  left: -20px;
  top: 0px;
  width: 18px;
  height: 18px;
  background-image: url("/gui/icons1.png"), url("/gui/icons1.png");
  background-position:
    -18px -18px,
    0px 0px;
  background-size: 256px 256px;
  background-repeat: no-repeat;
}

.reader-offsets-button {
  position: absolute;
  left: -20px;
  top: 20px;
  width: 18px;
  height: 18px;
  background-image: url("/gui/icons1.png"), url("/gui/icons1.png");
  background-position:
    0px -18px,
    0px 0px;
  background-size: 256px 256px;
  background-repeat: no-repeat;
}

.reader-scrollbar-thumb {
  position: absolute;
  left: 175px;
  width: 12px;
  height: 15px;
  background: url("/gui/scrollbar-thumb.png") center / 12px 15px no-repeat;
  image-rendering: pixelated;
}
</style>
