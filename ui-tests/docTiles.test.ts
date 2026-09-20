import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const tile = (page: Page, id: string) => page.locator(`[data-tile-id="${id}"]`);

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

test.describe("operatorPageTiles", () => {
  test("testOperatorTilesSplitTabsFromTheirDisplayPanels", async ({ page }) => {
    await page.goto("/#operator-ARITHMETIC_INCREMENT");
    await page.locator(".tile-grid").waitFor();

    await expect(tile(page, "title")).toContainText("ARITHMETIC_INCREMENT");
    await expect(tile(page, "info")).toBeVisible();
    await expect(tile(page, "operatorTab")).toBeVisible();
    await expect(tile(page, "patternTab")).toBeVisible();

    await expect(
      tile(page, "operatorTab").locator(".display-panel")
    ).toHaveCount(0);
    await expect(
      tile(page, "operatorDisplay").locator(".display-panel").first()
    ).toContainText(/Arithmetic Increment/);
  });

  test("testOperatorLayoutIsPerPage", async ({ page }) => {
    await page.goto("/#operator-ARITHMETIC_INCREMENT");
    await page.locator(".tile-grid").waitFor();

    await dragTile(page, "operatorTab", "patternTab");
    expect(layoutParam(page)).not.toBeNull();

    await page.goto("/#operator-ARITHMETIC_ADDITION");
    await page.locator(".tile-grid").waitFor();
    await expect(tile(page, "title")).toContainText("ARITHMETIC_ADDITION");
  });
});

test.describe("readerAspectPageTiles", () => {
  test("testReaderAspectTilesRenderInOrder", async ({ page }) => {
    await page.goto("/#reader-inventory-object-item-stack-slot");
    await page.locator(".tile-grid").waitFor();

    await expect(tile(page, "title")).toBeVisible();
    await expect(tile(page, "info")).toBeVisible();
    await expect(tile(page, "input")).toBeVisible();
    await expect(tile(page, "view")).toBeVisible();
    await expect(tile(page, "displayPanel")).toBeVisible();

    const infoBox = await tile(page, "info").boundingBox();
    const viewBox = await tile(page, "view").boundingBox();
    expect(infoBox!.y).toBeLessThan(viewBox!.y);
  });

  test("testReaderLayoutPersistsOnTheSamePage", async ({ page }) => {
    await page.goto("/#reader-inventory-object-item-stack-slot");
    await page.locator(".tile-grid").waitFor();

    await dragTile(page, "info", "view");
    const saved = layoutParam(page);
    expect(saved).not.toBeNull();

    await page.goto(page.url());
    await page.locator(".tile-grid").waitFor();
    expect(layoutParam(page)).toBe(saved);
  });
});
