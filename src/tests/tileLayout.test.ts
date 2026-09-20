import {
  FULL_TILE_SPAN,
  assignOperatorRows,
  computeColumnCount,
  computeTilePitch,
  decodeLayout,
  encodeLayout,
  packTiles,
  type TileDefinition,
} from "pages-lib/tileLayout";

const transformerTiles = (steps = 1): TileDefinition[] => [
  { id: "title", span: FULL_TILE_SPAN },
  { id: "docs", span: 2 },
  { id: "input", span: 2 },
  { id: "settings", span: 1 },
  { id: "format", span: 1 },
  { id: "output", span: 2 },
  ...Array.from({ length: steps }, (_, index) => ({
    id: `step${index}`,
    span: 2,
  })),
];

const rows = (
  placements: { id: string; row: number; col: number }[]
): Record<string, [number, number]> =>
  Object.fromEntries(placements.map((p) => [p.id, [p.row, p.col]]));

describe("TestTileLayout", () => {
  it("computesPitchAndColumnCount", () => {
    expect(computeTilePitch([100, 320, 250], 16)).toBe(336);
    expect(computeTilePitch([], 16)).toBe(0);
    expect(computeColumnCount(1000, 336)).toBe(2);
    expect(computeColumnCount(100, 336)).toBe(1);
    expect(computeColumnCount(1000, 0)).toBe(1);
  });

  it("flowsDefaultsAtWideThreeColumnLayout", () => {
    const placements = packTiles(transformerTiles(), 3);
    expect(rows(placements)).toEqual({
      title: [0, 0],
      docs: [1, 0],
      input: [2, 0],
      settings: [2, 2],
      format: [3, 0],
      output: [3, 1],
      step0: [4, 0],
    });
    expect(placements[0]!.span).toBe(3);
  });

  it("pushesTilesDownAndLeftWhenNarrow", () => {
    const two = rows(packTiles(transformerTiles(), 2));
    expect(two).toEqual({
      title: [0, 0],
      docs: [1, 0],
      input: [2, 0],
      settings: [3, 0],
      format: [3, 1],
      output: [4, 0],
      step0: [5, 0],
    });

    const one = rows(packTiles(transformerTiles(), 1));
    expect(one["title"]).toEqual([0, 0]);
    expect(one["docs"]).toEqual([1, 0]);
    expect(one["input"]).toEqual([2, 0]);
    expect(one["settings"]).toEqual([3, 0]);
    expect(one["format"]).toEqual([4, 0]);
    expect(one["output"]).toEqual([5, 0]);
    expect(one["step0"]).toEqual([6, 0]);
  });

  it("swapsTwoTilesThroughOverrides", () => {
    const overrides = {
      3: { col: 0, row: 3 },
      4: { col: 2, row: 2 },
    };
    const placed = rows(packTiles(transformerTiles(), 3, overrides));
    expect(placed["settings"]).toEqual([3, 0]);
    expect(placed["format"]).toEqual([2, 2]);
    expect(placed["input"]).toEqual([2, 0]);
    expect(placed["output"]).toEqual([3, 1]);
  });

  it("resolvesCollisionsByPushingDown", () => {
    const placed = packTiles(transformerTiles(), 3, {
      3: { col: 0, row: 2 },
    });
    const settings = placed.find((p) => p.id === "settings")!;
    expect(settings.row).toBeGreaterThan(2);
  });

  it("assignsOperatorRowsForEachFitCombination", () => {
    expect(
      assignOperatorRows({
        panelsShareRow: true,
        operatorDisplayFitsRow4: true,
      })
    ).toEqual({
      operatorTab: 4,
      patternTab: 4,
      operatorDisplay: 5,
      patternDisplay: 5,
    });
    expect(
      assignOperatorRows({
        panelsShareRow: false,
        operatorDisplayFitsRow4: false,
      })
    ).toEqual({
      operatorTab: 4,
      patternTab: 6,
      operatorDisplay: 5,
      patternDisplay: 7,
    });
    expect(
      assignOperatorRows({
        panelsShareRow: false,
        operatorDisplayFitsRow4: true,
      })
    ).toEqual({
      operatorTab: 4,
      patternTab: 6,
      operatorDisplay: 4,
      patternDisplay: 7,
    });
    expect(
      assignOperatorRows({
        panelsShareRow: true,
        operatorDisplayFitsRow4: false,
      })
    ).toEqual({
      operatorTab: 4,
      patternTab: 4,
      operatorDisplay: 5,
      patternDisplay: 5,
    });
  });

  it("roundTripsLayoutOverridesAndIgnoresMalformed", () => {
    const overrides = {
      0: { col: 1, row: 0 },
      6: { col: 0, row: 4 },
    };
    const encoded = encodeLayout(overrides, 7);
    expect(encoded).not.toBeNull();
    expect(decodeLayout(encoded)).toEqual(overrides);

    expect(encodeLayout({}, 7)).toBeNull();
    expect(decodeLayout(null)).toEqual({});
    expect(decodeLayout("not-a-layout")).toEqual({});
  });
});
