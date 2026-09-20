import {
  decodePackedList,
  encodePackedList,
  type BitPackConfig,
} from "lib/urlState/bitPack";

export const FULL_TILE_SPAN = 999;

export interface TileDefinition {
  id: string;
  span: number;
  defaultCol?: number;
  defaultRow?: number;
}

export interface TilePlacement {
  id: string;
  col: number;
  row: number;
  span: number;
}

export type LayoutOverrides = Record<number, { col: number; row: number }>;

export interface OperatorRowFits {
  panelsShareRow: boolean;
  operatorDisplayFitsRow4: boolean;
}

export interface OperatorRows {
  operatorTab: number;
  patternTab: number;
  operatorDisplay: number;
  patternDisplay: number;
}

const clampColumn = (value: number, cols: number, span: number): number => {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(0, Math.trunc(value)), Math.max(0, cols - span));
};

const clampRow = (value: number): number =>
  Number.isFinite(value) ? Math.max(0, Math.trunc(value)) : 0;

const clampSpan = (span: number, cols: number): number =>
  Math.min(Math.max(1, Math.trunc(span) || 1), cols);

export const computeColumnCount = (
  available: number,
  pitch: number
): number => {
  if (!Number.isFinite(available) || !Number.isFinite(pitch) || pitch <= 0) {
    return 1;
  }
  return Math.max(1, Math.floor(available / pitch));
};

export const computeTilePitch = (widths: number[], gap: number): number => {
  const finite = widths.filter((width) => Number.isFinite(width) && width > 0);
  if (finite.length === 0) return 0;
  return Math.max(...finite) + gap;
};

export const flowDefaultCells = (
  tiles: TileDefinition[],
  cols: number
): { col: number; row: number }[] => {
  const colCount = Math.max(1, cols);
  let row = 0;
  let col = 0;
  return tiles.map((tile) => {
    if (tile.defaultRow !== undefined || tile.defaultCol !== undefined) {
      return { col: tile.defaultCol ?? 0, row: tile.defaultRow ?? 0 };
    }
    const span = clampSpan(tile.span, colCount);
    if (col + span > colCount) {
      col = 0;
      row += 1;
    }
    const cell = { col, row };
    col += span;
    return cell;
  });
};

export const packTiles = (
  tiles: TileDefinition[],
  cols: number,
  overrides: LayoutOverrides = {}
): TilePlacement[] => {
  const colCount = Math.max(1, cols);
  const desired = flowDefaultCells(tiles, colCount);

  for (const [key, cell] of Object.entries(overrides)) {
    const index = Number(key);
    if (Number.isInteger(index) && index >= 0 && index < desired.length) {
      desired[index] = { col: cell.col, row: cell.row };
    }
  }

  const occupied = new Set<string>();
  const cellKey = (row: number, col: number): string => `${row}:${col}`;

  return tiles.map((tile, index) => {
    const span = clampSpan(tile.span, colCount);
    const target = desired[index]!;
    const col = clampColumn(target.col, colCount, span);
    let row = clampRow(target.row);

    const collides = (candidateRow: number, candidateCol: number): boolean => {
      for (let offset = 0; offset < span; offset += 1) {
        if (occupied.has(cellKey(candidateRow, candidateCol + offset))) {
          return true;
        }
      }
      return false;
    };

    while (collides(row, col)) row += 1;
    for (let offset = 0; offset < span; offset += 1) {
      occupied.add(cellKey(row, col + offset));
    }

    return { id: tile.id, col, row, span };
  });
};

export const swapOverrides = (
  overrides: LayoutOverrides,
  from: { index: number; col: number; row: number },
  to: { index: number; col: number; row: number }
): LayoutOverrides => ({
  ...overrides,
  [from.index]: { col: to.col, row: to.row },
  [to.index]: { col: from.col, row: from.row },
});

export const assignOperatorRows = (fits: OperatorRowFits): OperatorRows => {
  const operatorTab = 4;
  const patternTab = fits.panelsShareRow ? 4 : 6;
  const operatorDisplay =
    fits.operatorDisplayFitsRow4 && patternTab !== 4 ? 4 : 5;
  return {
    operatorTab,
    patternTab,
    operatorDisplay,
    patternDisplay: patternTab + 1,
  };
};

const LAYOUT_CONFIG: BitPackConfig = {
  indexDigits: 2,
  valueDigits: 2,
  valueCount: 2,
  slotDigits: 2,
};

export const encodeLayout = (
  overrides: LayoutOverrides,
  slotCount: number
): string | null =>
  encodePackedList(
    Object.entries(overrides).map(([key, cell]) => ({
      index: Number(key),
      values: [cell.col, cell.row],
    })),
    slotCount,
    LAYOUT_CONFIG
  );

export const decodeLayout = (raw: string | null): LayoutOverrides => {
  const entries = decodePackedList(raw, LAYOUT_CONFIG);
  if (!entries) return {};
  const overrides: LayoutOverrides = {};
  for (const entry of entries) {
    if (entry.values.length < 2) continue;
    const col = entry.values[0]!;
    const row = entry.values[1]!;
    if (!Number.isInteger(col) || !Number.isInteger(row)) continue;
    if (col < 0 || row < 0) continue;
    overrides[entry.index] = { col, row };
  }
  return overrides;
};
