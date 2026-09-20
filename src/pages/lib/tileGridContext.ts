import type { ComputedRef, InjectionKey } from "vue";
import type { TileDefinition, TilePlacement } from "pages-lib/tileLayout";

export interface TileGridContext {
  register: (definition: TileDefinition) => () => void;
  placementFor: (id: string) => TilePlacement | undefined;
  cols: ComputedRef<number>;
  startDrag: (event: MouseEvent, id: string) => void;
  isDragging: (id: string) => boolean;
  reset: () => void;
}

export const TILE_GRID_KEY: InjectionKey<TileGridContext> = Symbol("tile-grid");
