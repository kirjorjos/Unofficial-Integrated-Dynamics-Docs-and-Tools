import {
  calculateScaleFromContainer,
  snapToPixelGrid,
} from "pages-lib/visualTextScaling";

describe("calculateScaleFromContainer", () => {
  it("testReturns1WhenTextFits", () => {
    expect(calculateScaleFromContainer(10, 10, 100, 100)).toBe(1);
  });

  it("testScalesDownToSmallerDimensionRatio", () => {
    // Width needs 0.5x, height needs 0.8x -> 0.5x wins
    expect(calculateScaleFromContainer(200, 100, 100, 80)).toBe(0.5);
  });

  it("testAppliesMinScaleFloorOnlyWhenScalingDown", () => {
    expect(calculateScaleFromContainer(1000, 10, 100, 10, 0.3)).toBe(0.3);
  });

  it("testDoesNotScaleUpPast1WithSmallMinScale", () => {
    expect(calculateScaleFromContainer(10, 10, 1000, 1000, 0.1)).toBe(1);
  });

  it("testReturns1ForDegenerateDimensions", () => {
    expect(calculateScaleFromContainer(0, 10, 100, 100)).toBe(1);
    expect(calculateScaleFromContainer(10, 0, 100, 100)).toBe(1);
    expect(calculateScaleFromContainer(10, 10, 0, 100)).toBe(1);
    expect(calculateScaleFromContainer(10, 10, 100, 0)).toBe(1);
  });

  it("testUsesDefaultMinScaleOf0_5", () => {
    expect(calculateScaleFromContainer(1000, 1000, 100, 100)).toBe(0.5);
  });
});

describe("snapToPixelGrid", () => {
  it("testFloorsFractionalSizesToIntegerPixelGrid", () => {
    expect(snapToPixelGrid(50.92)).toBe(50);
    expect(snapToPixelGrid(4.2)).toBe(4);
    expect(snapToPixelGrid(9.99)).toBe(9);
  });

  it("testPassesIntegerSizesThroughUnchanged", () => {
    expect(snapToPixelGrid(12)).toBe(12);
    expect(snapToPixelGrid(32)).toBe(32);
  });

  it("testNeverReturnsBelow1px", () => {
    expect(snapToPixelGrid(0.5)).toBe(1);
    expect(snapToPixelGrid(0)).toBe(1);
    expect(snapToPixelGrid(-3)).toBe(1);
  });
});
