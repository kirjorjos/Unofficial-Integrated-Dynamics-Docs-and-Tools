import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import {
  expandShellForScreenshots,
  waitForFontsAndNetworkIdle,
} from "./visual-helpers";

const PLAYER_INPUT =
  '{Health:20.0f,Name:"Steve",abilities:{flying:0b,walkSpeed:0.1f},Inventory:[{Slot:0b,id:"minecraft:stone",Count:64b},{Slot:1b,id:"minecraft:dirt",Count:12b}]}';

const STATS_INPUT =
  '{stats:{custom:{jump:42,walk:1234},timers:{total:5000}},rows:[{label:"first",value:1},{label:"second",value:2}]}';

const treeRow = (page: Page, path: string) =>
  page.locator(`.nbt-tree-row[data-path="${path}"]`);

const openNbtTools = async (page: Page, input: string): Promise<void> => {
  await page.goto("/#nbt-tools");
  await page.locator(".tile-grid").waitFor();
  await page.locator('textarea[aria-label="SNBT input"]').fill(input);
  await waitForFontsAndNetworkIdle(page);
};

const expandRow = async (page: Page, path: string): Promise<void> => {
  const arrow = treeRow(page, path).locator(".nbt-tree-arrow");
  if ((await arrow.count()) > 0) await arrow.click();
};

const select = async (page: Page, path: string): Promise<void> => {
  await treeRow(page, path).click();
  await expect(page.getByTestId("selected-path")).toHaveText(path);
};

const nameSelection = async (page: Page, name: string): Promise<void> => {
  await page.locator('[aria-label="Selection name"]').fill(name);
  await page.getByRole("button", { name: "Add", exact: true }).click();
};

const shot = async (
  page: Page,
  target: string,
  name: string
): Promise<void> => {
  await waitForFontsAndNetworkIdle(page);
  await expandShellForScreenshots(page);
  await expect(page.locator(target)).toHaveScreenshot(`${name}.png`);
};

test.describe("nbtToolsVisual", () => {
  test("testTreeShotsForSelectionsAtThreeDepths", async ({ page }) => {
    await openNbtTools(page, PLAYER_INPUT);

    await select(page, ".Health");
    await shot(page, '[data-tile-id="tree"]', "depth1HealthTree");

    await select(page, ".abilities.flying");
    await shot(page, '[data-tile-id="tree"]', "depth2AbilitiesFlyingTree");

    await expandRow(page, ".Inventory[0]");
    await select(page, ".Inventory[0].Count");
    await shot(page, '[data-tile-id="tree"]', "depth4InventoryCountTree");

    await shot(page, '[data-tile-id="selection"]', "depth4InventoryCountPath");
  });

  test("testMatchFirstShotForListElementSelection", async ({ page }) => {
    await openNbtTools(page, PLAYER_INPUT);

    await expandRow(page, ".Inventory[1]");
    await select(page, ".Inventory[1].Count");
    await nameSelection(page, "a");

    await expect(page.getByTestId("copy-logic")).toBeEnabled();
    await expect(page.getByTestId("copy-path")).toBeEnabled();
    await shot(page, ".tile-grid", "matchFirstListElement");
  });

  test("testMatchAllShotForTwoSiblingSelections", async ({ page }) => {
    await openNbtTools(page, STATS_INPUT);

    await expandRow(page, ".stats.custom");
    await select(page, ".stats.custom.jump");
    await nameSelection(page, "a");

    await select(page, ".stats.custom.walk");
    await nameSelection(page, "b");

    await page.getByRole("radio", { name: "nbtPathMatchAll" }).check();
    await expect(page.getByTestId("path-error")).toHaveCount(0);
    await expect(page.locator(".logic-programmer-sequence")).toBeVisible();
    await shot(page, ".tile-grid", "matchAllSiblings");
  });

  test("testPathTestShotForTemplateWithTwoNames", async ({ page }) => {
    await openNbtTools(page, STATS_INPUT);

    await expandRow(page, ".stats.custom");
    await select(page, ".stats.custom.jump");
    await nameSelection(page, "a");

    await expandRow(page, ".stats.timers");
    await select(page, ".stats.timers.total");
    await nameSelection(page, "b");

    await page.getByRole("radio", { name: "nbtPathTest" }).check();
    await page.locator('textarea[aria-label="Logic template"]').fill("$a > 40");
    await expect(page.getByTestId("path-error")).toHaveCount(0);
    await expect(page.locator(".logic-programmer-sequence")).toBeVisible();
    await shot(page, ".tile-grid", "pathTestComparison");
  });
});
