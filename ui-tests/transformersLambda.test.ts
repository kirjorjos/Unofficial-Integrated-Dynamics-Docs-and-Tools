import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const transform = async (
  page: Page,
  input: string,
  format: string
): Promise<void> => {
  await page.goto("/#transformers");
  await page.locator('textarea[aria-label="Transformer input"]').fill(input);
  await page.locator('select[aria-label="Output format"]').selectOption(format);
  await page.getByRole("button", { name: "Transform", exact: true }).click();
};

test.describe("transformersPageLambdaInput", () => {
  test("testLambdaDefinitionPrintsArrowInEveryTextFormat", async ({ page }) => {
    const input = "f = x => add(x, 1)";

    await transform(page, input, "condensed");
    await expect(page.locator('textarea[aria-label="Condensed"]')).toHaveValue(
      "x => numberAdd(x, 1)"
    );

    await page
      .locator('select[aria-label="Output format"]')
      .selectOption("codeline");
    await page.getByRole("button", { name: "Transform", exact: true }).click();
    await expect(page.locator('textarea[aria-label="Code Line"]')).toHaveValue(
      "x => numberAdd x 1"
    );

    await page
      .locator('select[aria-label="Output format"]')
      .selectOption("expanded");
    await page.getByRole("button", { name: "Transform", exact: true }).click();
    const expanded = page.locator(".expanded-output-viewer");
    await expect(expanded).toContainText("f :: Any → Number");
    await expect(expanded).toContainText("f = x => numberAdd(x, 1)");
  });

  test("testTypedParameterRoundTripsAndKeepsItsSignature", async ({ page }) => {
    const input = "(x: integer) => x";

    await transform(page, input, "condensed");
    await expect(page.locator('textarea[aria-label="Condensed"]')).toHaveValue(
      "(x: integer) => x"
    );

    await page
      .locator('select[aria-label="Output format"]')
      .selectOption("expanded");
    await page.getByRole("button", { name: "Transform", exact: true }).click();
    const expanded = page.locator(".expanded-output-viewer");
    await expect(expanded).toContainText("lambda :: integer → Any");
    await expect(expanded).toContainText("lambda = (x: integer) => x");
  });

  test("testNestedLambdaStaysInlineAndLowersToMultipleCards", async ({
    page,
  }) => {
    const input = "x => map (y => add x y) [1, 2]";

    await transform(page, input, "codeline");
    await expect(page.locator('textarea[aria-label="Code Line"]')).toHaveValue(
      "x => operatorMap (y => numberAdd x y) [1, 2]"
    );

    await page
      .locator('select[aria-label="Output format"]')
      .selectOption("visual");
    await page.getByRole("button", { name: "Transform", exact: true }).click();

    await expect(page.locator(".logic-programmer-shot")).toHaveCount(8);
    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(0);
    await expect(
      page.locator(".logic-programmer-shot").filter({ hasText: "Lambda" })
    ).toHaveCount(0);
  });

  test("testLambdaVisualOutputMatchesThePointFreeChain", async ({ page }) => {
    await transform(page, "x => numberAdd x 1", "visual");
    await expect(page.locator(".logic-programmer-shot")).toHaveCount(3);
    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(0);

    await transform(page, "apply numberAdd 1", "visual");
    await expect(page.locator(".logic-programmer-shot")).toHaveCount(3);
  });
});
