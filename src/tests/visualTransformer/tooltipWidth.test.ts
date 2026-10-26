import tooltipInfo from "lib/generated/integratedDynamicsTooltipInfo.json";
import {
  computeTooltipWidth,
  INFO_LINE_PREFIX,
  isInfoLine,
  toInfoLines,
} from "pages-lib/tooltipWidth";
import { getBaseTooltipLines } from "pages-lib/visualTransformerLogic";
import { beforeEachVisualTransformer } from "./fixtures";

const VARIABLE_CARD_INFO = tooltipInfo["item.integrateddynamics.variable.info"];

describe("computeTooltipWidth", () => {
  it("testLongestStructuralLineDecidesTheWidth", () => {
    expect(computeTooltipWidth({ widestLinePx: 100, widestWordPx: 40 })).toBe(
      100
    );
  });

  it("testWordWiderThanTheLineWidensTheBox", () => {
    expect(computeTooltipWidth({ widestLinePx: 100, widestWordPx: 180 })).toBe(
      180
    );
  });

  it("testWordJustOverTheLineWidensTheBoxInsteadOfBreaking", () => {
    expect(computeTooltipWidth({ widestLinePx: 100, widestWordPx: 124 })).toBe(
      124
    );
    expect(computeTooltipWidth({ widestLinePx: 100, widestWordPx: 125 })).toBe(
      125
    );
  });

  it("testUnmeasurableInputStaysZero", () => {
    expect(computeTooltipWidth({ widestLinePx: 0, widestWordPx: 0 })).toBe(0);
    expect(
      computeTooltipWidth({
        widestLinePx: Number.NaN,
        widestWordPx: Number.NaN,
      })
    ).toBe(0);
    expect(computeTooltipWidth({ widestLinePx: -5, widestWordPx: -1 })).toBe(0);
  });
});

describe("infoLines", () => {
  beforeEach(beforeEachVisualTransformer);

  it("testDetectsDescriptionLinesByTheirPrefix", () => {
    expect(
      isInfoLine(`${INFO_LINE_PREFIX}Clear or copy in a crafting grid`)
    ).toBe(true);
    expect(isInfoLine("§eType: §r§6Integer")).toBe(false);
    expect(isInfoLine("§oVariable Card")).toBe(false);
  });

  it("testKeepsTheWholeDescriptionOnOneLine", () => {
    expect(toInfoLines("Clear or copy in a crafting grid")).toEqual([
      "§5§oClear or copy in a crafting grid",
    ]);
  });

  it("testSplitsOnAuthoredLineBreaksOnly", () => {
    expect(toInfoLines(String.raw`first\nsecond`)).toEqual([
      "§5§ofirst",
      "§5§osecond",
    ]);
    expect(toInfoLines("")).toEqual([]);
  });

  it("testBaseTooltipLinesCarryTheUnbrokenDescription", () => {
    expect(getBaseTooltipLines(2)).toEqual([
      "§e§oVariable ID: §r§o2",
      `${INFO_LINE_PREFIX}${VARIABLE_CARD_INFO}`,
    ]);
    expect(VARIABLE_CARD_INFO).not.toContain("\n");
  });
});
