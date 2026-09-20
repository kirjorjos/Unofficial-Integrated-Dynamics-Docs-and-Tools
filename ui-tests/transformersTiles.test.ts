import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { compileCode } from "./visual-helpers";

const tile = (page: Page, id: string) => page.locator(`[data-tile-id="${id}"]`);

const openTransformers = async (page: Page): Promise<void> => {
  await page.goto("/#transformers");
  await page.locator(".tile-grid").waitFor();
};

const layoutParam = (page: Page): string | null =>
  new URL(page.url()).searchParams.get("layout");

const dragTile = async (
  page: Page,
  fromId: string,
  toId: string
): Promise<void> => {
  const bar = tile(page, fromId).locator(".tile-drag-bar");
  const from = await bar.boundingBox();
  const to = await tile(page, toId).boundingBox();
  await page.mouse.move(from!.x + from!.width / 2, from!.y + from!.height / 2);
  await page.mouse.down();
  await page.mouse.move(to!.x + to!.width / 2, to!.y + to!.height / 2, {
    steps: 5,
  });
  await page.mouse.up();
};

test.describe("transformersPageTiles", () => {
  test("testTilesRenderInTheirDefaultOrder", async ({ page }) => {
    await openTransformers(page);

    await expect(page.locator(".tile")).toHaveCount(6);
    await expect(tile(page, "title")).toBeVisible();
    await expect(tile(page, "docs")).toBeVisible();
    await expect(tile(page, "input")).toBeVisible();
    await expect(tile(page, "settings")).toBeVisible();
    await expect(tile(page, "format")).toBeVisible();
    await expect(tile(page, "output")).toBeVisible();

    const docsBox = await tile(page, "docs").boundingBox();
    const inputBox = await tile(page, "input").boundingBox();
    const outputBox = await tile(page, "output").boundingBox();
    expect(docsBox!.y).toBeLessThan(inputBox!.y);
    expect(inputBox!.y).toBeLessThan(outputBox!.y);
  });

  test("testStatusLineLivesInsideTheOutputTile", async ({ page }) => {
    await openTransformers(page);
    await page
      .locator('textarea[aria-label="Transformer input"]')
      .fill("add(1, 2)");
    await page.getByRole("button", { name: "Transform", exact: true }).click();

    await expect(tile(page, "output").locator(".status")).toBeVisible();
  });

  test("testVisualOutputBecomesOneTilePerStep", async ({ page }) => {
    await openTransformers(page);
    await page.locator(".input-docs-summary").click();
    await page.locator(".input-docs-tab", { hasText: "Visual" }).click();
    await page
      .locator("button.input-docs-example-concrete", {
        hasText: "apply add 1 2",
      })
      .click();

    const stepTiles = page.locator('[data-tile-id^="step"]');
    await expect(stepTiles).toHaveCount(3);
    await expect(
      stepTiles.first().locator(".logic-programmer-shot")
    ).toHaveCount(1);
    await expect(
      stepTiles.first().locator(".logic-programmer-step")
    ).toContainText("Step 1");
  });

  test("testOperatorAstStepTileRendersItsShot", async ({ page }) => {
    const code = await compileCode("operatorApply3");
    await page.goto(`/?code=${code}&output=visual`);
    await page.locator(".tile-grid").waitFor();

    const stepTiles = page.locator('[data-tile-id^="step"]');
    await expect(stepTiles).toHaveCount(1);
    await expect(stepTiles.locator(".logic-programmer-shot")).toHaveCount(1);
  });

  test("testDraggingATileWritesTheLayoutParamAndReloadRestoresIt", async ({
    page,
  }) => {
    await openTransformers(page);
    expect(layoutParam(page)).toBeNull();

    await dragTile(page, "input", "settings");

    const saved = layoutParam(page);
    expect(saved).not.toBeNull();

    await page.goto(page.url());
    await page.locator(".tile-grid").waitFor();
    expect(layoutParam(page)).toBe(saved);
  });

  test("testResetLayoutClearsTheParam", async ({ page }) => {
    await openTransformers(page);
    await dragTile(page, "input", "settings");
    expect(layoutParam(page)).not.toBeNull();

    await page.locator(".tile-reset").click();
    expect(layoutParam(page)).toBeNull();
  });

  test("testMalformedLayoutFallsBackToDefaults", async ({ page }) => {
    await page.goto("/?layout=!!!#transformers");
    await page.locator(".tile-grid").waitFor();
    await expect(page.locator(".tile")).toHaveCount(6);
    await expect(tile(page, "title")).toBeVisible();
  });
});
