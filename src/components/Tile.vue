<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted } from "vue";
import { TILE_GRID_KEY } from "pages-lib/tileGridContext";

const props = withDefaults(
  defineProps<{
    id: string;
    span?: number;
    defaultCol?: number;
    defaultRow?: number;
  }>(),
  { span: 1 }
);

const grid = inject(TILE_GRID_KEY, null);

let unregister: (() => void) | null = null;

onMounted(() => {
  if (!grid) return;
  unregister = grid.register({
    id: props.id,
    span: props.span,
    defaultCol: props.defaultCol,
    defaultRow: props.defaultRow,
  });
});

onBeforeUnmount(() => {
  unregister?.();
});

const placement = computed(() => grid?.placementFor(props.id));

const style = computed(() => {
  const placed = placement.value;
  if (!placed) return {};
  return {
    gridColumn: `${placed.col + 1} / span ${placed.span}`,
    gridRow: `${placed.row + 1}`,
  };
});

const dragging = computed(() => grid?.isDragging(props.id) ?? false);

const beginDrag = (event: MouseEvent): void => {
  grid?.startDrag(event, props.id);
};
</script>

<template>
  <section
    class="tile"
    :class="{ 'tile-dragging': dragging }"
    :data-tile-id="id"
    :style="style"
  >
    <div
      class="tile-drag-bar"
      role="separator"
      aria-label="Drag to rearrange tile"
      @mousedown="beginDrag"
    />
    <div class="tile-body">
      <slot />
    </div>
  </section>
</template>
