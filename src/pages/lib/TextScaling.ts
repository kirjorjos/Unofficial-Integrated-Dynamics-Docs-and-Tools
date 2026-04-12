// Pure calculation for text scaling based on container dimensions
export const calculateScaleFromContainer = (
  textWidth: number,
  textHeight: number,
  containerWidth: number,
  containerHeight: number,
  minScale: number = 0.5
): number => {
  if (
    textWidth <= 0 ||
    textHeight <= 0 ||
    containerWidth <= 0 ||
    containerHeight <= 0
  ) {
    return 1;
  }

  const widthRatio = containerWidth / textWidth;
  const heightRatio = containerHeight / textHeight;

  // Use smaller ratio so text fits in BOTH dimensions
  const neededScale = Math.min(widthRatio, heightRatio);

  // If text already fits (neededScale >= 1), cap at 1 (don't scale up)
  if (neededScale >= 1) {
    return 1;
  }

  // Text needs scaling down
  // If minScale is sufficient, use it
  const fitsAtMinScale =
    textWidth * minScale <= containerWidth &&
    textHeight * minScale <= containerHeight;

  if (fitsAtMinScale) {
    return minScale;
  }

  // Need full scaling down
  return neededScale;
};

describe("VisualTextScaling - Scale Calculation", () => {
  describe("calculateScaleFromContainer", () => {
    it("returns scale of 1 when text matches container", () => {
      const scale = calculateScaleFromContainer(100, 100, 100, 100);
      expect(scale).toBe(1);
    });

    it("scales down when text is larger than container", () => {
      const scale = calculateScaleFromContainer(200, 200, 100, 100);
      expect(scale).toBe(0.5);
    });

    it("returns 1 when text is smaller than container", () => {
      // Text smaller than container - don't scale up beyond 1
      const scale = calculateScaleFromContainer(50, 50, 100, 100);
      expect(scale).toBe(1);
    });

    it("ensures both width AND height fit", () => {
      const scale = calculateScaleFromContainer(200, 20, 100, 100);
      expect(scale).toBe(0.5);
      expect(200 * scale).toBeLessThanOrEqual(100);
      expect(20 * scale).toBeLessThanOrEqual(100);
    });

    it("uses smaller of width/height ratios to fit both", () => {
      // Height is the constraint (400 > 200)
      const scale = calculateScaleFromContainer(200, 400, 100, 100);
      expect(scale).toBeCloseTo(0.25, 2);
    });

    it("applies minScale when scaling down and text fits at minScale", () => {
      // Text 100x100, container 100x100, neededScale = 1, so return 1
      const scale1 = calculateScaleFromContainer(100, 100, 100, 100, 0.8);
      expect(scale1).toBe(1);

      // Text huge (500), neededScale = 0.2, at minScale 0.8: 500*0.8=400 > 100, doesn't fit
      // So use neededScale 0.2
      const scale2 = calculateScaleFromContainer(500, 500, 100, 100, 0.8);
      expect(scale2).toBe(0.2);
    });

    it("handles edge cases", () => {
      expect(calculateScaleFromContainer(0, 100, 100, 100)).toBe(1);
      expect(calculateScaleFromContainer(100, 0, 100, 100)).toBe(1);
      expect(calculateScaleFromContainer(100, 100, 0, 100)).toBe(1);
      expect(calculateScaleFromContainer(100, 100, 100, 0)).toBe(1);
      expect(calculateScaleFromContainer(100, 100, -100, 100)).toBe(1);
    });
  });
});

describe("FitText Component - Scaling Logic", () => {
  describe("direct calculation", () => {
    it("always ensures text fits in both dimensions", () => {
      const testCases = [
        // Text larger than container - scale down
        { textW: 200, textH: 200, contW: 100, contH: 100, expected: 0.5 },
        { textW: 200, textH: 400, contW: 100, contH: 100, expected: 0.25 },
        // Text smaller than container - cap at 1
        { textW: 50, textH: 50, contW: 100, contH: 100, expected: 1 },
        { textW: 100, textH: 200, contW: 100, contH: 50, expected: 0.25 },
        { textW: 200, textH: 50, contW: 50, contH: 100, expected: 0.25 },
      ];

      testCases.forEach(({ textW, textH, contW, contH, expected }) => {
        const scale = calculateScaleFromContainer(textW, textH, contW, contH);
        expect(scale).toBeCloseTo(expected, 2);
        expect(textW * scale).toBeLessThanOrEqual(contW);
        expect(textH * scale).toBeLessThanOrEqual(contH);
      });
    });

    it("respects minScale when needed", () => {
      // Huge text - doesn't fit at minScale, use needed
      const scale1 = calculateScaleFromContainer(500, 500, 100, 100, 0.8);
      expect(scale1).toBe(0.2);

      // Text fits without scaling
      const scale2 = calculateScaleFromContainer(50, 50, 100, 100, 0.8);
      expect(scale2).toBe(1);
    });
  });
});
