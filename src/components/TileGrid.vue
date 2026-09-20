<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  shallowReactive,
} from "vue";
import {
  computeColumnCount,
  decodeLayout,
  encodeLayout,
  packTiles,
  swapOverrides,
  type LayoutOverrides,
  type TileDefinition,
} from "pages-lib/tileLayout";
import { TILE_GRID_KEY } from "pages-lib/tileGridContext";

const props = withDefaults(
  defineProps<{
    pitch?: number;
    layoutParam?: string;
  }>(),
  { pitch: 420, layoutParam: "layout" }
);

defineSlots<{
  default?: (props: {
    cols: number;
    resetLayout: () => void;
    isCustomized: boolean;
  }) => unknown;
}>();

const container = ref<HTMLElement | null>(null);
const availableWidth = ref(0);

const cols = computed(() =>
  computeColumnCount(availableWidth.value || props.pitch * 3, props.pitch)
);

const registry = shallowReactive<TileDefinition[]>([]);

const register = (definition: TileDefinition): (() => void) => {
  registry.push({ ...definition });
  return () => {
    const index = registry.findIndex((tile) => tile.id === definition.id);
    if (index >= 0) registry.splice(index, 1);
  };
};

const overrides = ref<LayoutOverrides>({});

const placements = computed(() =>
  packTiles([...registry], cols.value, overrides.value)
);
const placementById = computed(
  () => new Map(placements.value.map((placement) => [placement.id, placement]))
);
const isCustomized = computed(() => Object.keys(overrides.value).length > 0);

const persistableOverrides = (): LayoutOverrides => {
  const valid: LayoutOverrides = {};
  for (const [key, cell] of Object.entries(overrides.value)) {
    const index = Number(key);
    if (Number.isInteger(index) && index >= 0 && index < registry.length) {
      valid[index] = cell;
    }
  }
  return valid;
};

const writeUrl = (): void => {
  const url = new URL(window.location.href);
  const valid = persistableOverrides();
  const encoded =
    Object.keys(valid).length > 0
      ? encodeLayout(valid, Math.max(registry.length, 1))
      : null;
  if (encoded === null) {
    url.searchParams.delete(props.layoutParam);
  } else {
    url.searchParams.set(props.layoutParam, encoded);
  }
  window.history.replaceState({}, "", url.toString());
};

const reset = (): void => {
  overrides.value = {};
  writeUrl();
};

const isDragging = (id: string): boolean => dragId.value === id;

const startDrag = (event: MouseEvent, id: string): void => {
  event.preventDefault();
  dragId.value = id;
  dragPos.value = { x: event.clientX, y: event.clientY };
  window.addEventListener("mousemove", onDragMove);
  window.addEventListener("mouseup", onDragEnd);
};

const onDragMove = (event: MouseEvent): void => {
  dragPos.value = { x: event.clientX, y: event.clientY };
};

const onDragEnd = (event: MouseEvent): void => {
  const sourceId = dragId.value;
  dragId.value = null;
  window.removeEventListener("mousemove", onDragMove);
  window.removeEventListener("mouseup", onDragEnd);
  if (!sourceId) return;

  const target = (
    document.elementFromPoint(
      event.clientX,
      event.clientY
    ) as HTMLElement | null
  )?.closest("[data-tile-id]");
  const targetId = target?.getAttribute("data-tile-id");
  if (!targetId || targetId === sourceId) return;

  const order = registry.map((tile) => tile.id);
  const fromIndex = order.indexOf(sourceId);
  const toIndex = order.indexOf(targetId);
  if (fromIndex < 0 || toIndex < 0) return;

  const from = placements.value[fromIndex];
  const to = placements.value[toIndex];
  if (!from || !to) return;

  overrides.value = swapOverrides(
    overrides.value,
    { index: fromIndex, col: from.col, row: from.row },
    { index: toIndex, col: to.col, row: to.row }
  );
  writeUrl();
};

const dragId = ref<string | null>(null);
const dragPos = ref({ x: 0, y: 0 });

const applyLayoutFromUrl = (): void => {
  const raw = new URL(window.location.href).searchParams.get(props.layoutParam);
  const decoded = decodeLayout(raw);
  if (Object.keys(decoded).length > 0) overrides.value = decoded;
};

let resizeObserver: ResizeObserver | null = null;

const measure = (): void => {
  availableWidth.value = container.value?.clientWidth ?? 0;
};

onMounted(() => {
  applyLayoutFromUrl();
  measure();
  if (typeof ResizeObserver !== "undefined" && container.value) {
    resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container.value);
  } else {
    window.addEventListener("resize", measure);
  }
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  window.removeEventListener("resize", measure);
  window.removeEventListener("mousemove", onDragMove);
  window.removeEventListener("mouseup", onDragEnd);
});

provide(TILE_GRID_KEY, {
  register,
  placementFor: (id: string) => placementById.value.get(id),
  cols,
  startDrag,
  isDragging,
  reset,
});
</script>

<template>
  <div
    ref="container"
    class="tile-grid"
    :style="{ '--tile-cols': cols }"
    :data-tile-cols="cols"
  >
    <slot :cols="cols" :reset-layout="reset" :is-customized="isCustomized" />

    <div
      v-if="dragId"
      class="tile-ghost"
      :style="{ left: `${dragPos.x}px`, top: `${dragPos.y}px` }"
      aria-hidden="true"
    >
      Move
    </div>
  </div>
</template>

<style scoped>
.tile-ghost {
  position: fixed;
  z-index: 50;
  pointer-events: none;
  transform: translate(-50%, -50%);
  padding: 0.35rem 0.6rem;
  border-radius: 0.4rem;
  background: rgba(27, 64, 77, 0.85);
  color: #ecf9fb;
  font-size: 0.75rem;
}
</style>
