import { test, expect } from "@playwright/test";
import { openOperatorPattern } from "./visual-helpers";

test.describe("operatorPatternPreviewOperatorPage", () => {
  test("testPatternPreviewShotForArithmeticIncrement", async ({ page }) => {
    await openOperatorPattern(page, "ARITHMETIC_INCREMENT");

    const patternPanel = page.locator(
      '.operator-preview-panel:has(h3:text-is("Operator Tab"))'
    );
    await expect(page.locator(".operator-doc-page h2")).toContainText(
      "ARITHMETIC_INCREMENT"
    );
    const shot = patternPanel.locator(".logic-programmer-shot");
    await expect(shot).toHaveCount(1);

    await expect(shot.locator(".logic-search-overlay")).toContainText(
      "Operator"
    );
    await expect(shot.locator(".logic-write-card-composite")).toHaveCount(0);

    await expect(shot.locator(".display-panel").first()).toContainText(
      /Arithmetic Increment/
    );

    await expect(shot).toHaveScreenshot("operator-pattern-preview.png");
  });
});
