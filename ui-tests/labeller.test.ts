import { test, expect, type Page } from "@playwright/test";
import { waitForFontsAndNetworkIdle } from "./visual-helpers";

const INPUT = "Materialize(numberAdd(InventoryReader.INTEGER_COUNT, 2))";

const runVisualTransform = async (
  page: Page,
  input: string,
  labeller: boolean
): Promise<void> => {
  await page.goto("/#transformers");
  await page.locator('textarea[aria-label="Transformer input"]').fill(input);
  await page
    .locator('select[aria-label="Output format"]')
    .selectOption("visual");
  if (labeller) {
    await page.locator(".settings-summary").click();
    await page.locator("#setting-labeller").check();
  }
  await page.getByRole("button", { name: "Transform", exact: true }).click();
  await page.locator(".logic-programmer-shot").first().waitFor();
  await waitForFontsAndNetworkIdle(page);
};

const tooltip = (page: Page) => page.locator(".logic-card-tooltip");

const addOpaqueBackdrop = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    const backdrop = document.createElement("div");
    backdrop.style.cssText =
      "position:fixed;inset:0;background:#ffffff;z-index:9998;pointer-events:none;";
    document.body.appendChild(backdrop);
  });
};

const pinTooltipPosition = async (page: Page): Promise<void> => {
  await tooltip(page).evaluate((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.left = "100px";
    htmlElement.style.top = "100px";
  });
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve(null)))
      )
  );
};

test.describe("labellerGui", () => {
  test("testRendersALabellerStepAfterTheReaderAndMaterializer", async ({
    page,
  }) => {
    await runVisualTransform(page, INPUT, true);

    const frames = page.locator(".labeller-gui-frame");
    await expect(frames).toHaveCount(2);
    await expect(
      page.locator(".logic-programmer-step-title", { hasText: /^Labeller$/ })
    ).toHaveCount(2);
    await expect(page.locator(".labeller-slot .labeller-card")).toHaveCount(2);
    await expect(frames.first()).toHaveCSS("background-image", /labeller\.png/);

    const names = await page
      .locator(".labeller-name-field .fit-text-inner")
      .allInnerTexts();
    expect(names).toHaveLength(2);
    expect(names.every((name) => name.trim().length > 0)).toBe(true);
    expect(names[0]!.trim()).toBe("inventoryCount");
  });

  test("testMaterializerCardIsUnnamedWhileTheLabellerCardCarriesTheName", async ({
    page,
  }) => {
    await runVisualTransform(page, INPUT, true);

    await page.locator(".materializer-slot-right .materializer-card").hover();
    await expect(tooltip(page).locator(".mc-tooltip-title")).toHaveText(
      "Variable Card"
    );

    await page.mouse.move(0, 0);
    await page.locator(".labeller-slot .labeller-card").nth(1).hover();
    const title = tooltip(page).locator(".mc-tooltip-title");
    await expect(title).toBeVisible();
    await expect(title).not.toHaveText("Variable Card");
  });

  test("testLabellerCardTooltipMatchesTheUnlabelledReaderCard", async ({
    page,
  }) => {
    await runVisualTransform(page, INPUT, false);
    await addOpaqueBackdrop(page);
    const readerCard = page.locator(".reader-slot-output-card");
    await readerCard.hover();
    await expect(tooltip(page)).toBeVisible();
    await pinTooltipPosition(page);
    const flagOffShot = await tooltip(page).screenshot();

    await runVisualTransform(page, INPUT, true);
    await addOpaqueBackdrop(page);
    await page.locator(".labeller-slot .labeller-card").first().hover();
    await expect(tooltip(page)).toBeVisible();
    await pinTooltipPosition(page);
    const flagOnShot = await tooltip(page).screenshot();

    expect(flagOnShot).toEqual(flagOffShot);
    await expect(tooltip(page).locator(".mc-tooltip-title")).toHaveText(
      "Variable Card"
    );
    await expect(tooltip(page)).toHaveScreenshot("labeller-card-tooltip.png");
  });

  test("testEachLabellerStepSitsDirectlyAfterItsProducer", async ({ page }) => {
    await runVisualTransform(page, INPUT, true);

    const tiles = page.locator('.tile[data-tile-id^="step"]');
    await expect(tiles).toHaveCount(6);

    const stepNumbers = await tiles
      .locator(".logic-programmer-step")
      .allInnerTexts();
    expect(stepNumbers.map((text) => text.trim())).toEqual([
      "STEP 1",
      "STEP 2",
      "STEP 3",
      "STEP 4",
      "STEP 5",
      "STEP 6",
    ]);

    await expect(tiles.nth(0).locator(".reader-gui-frame")).toHaveCount(1);
    await expect(tiles.nth(1).locator(".labeller-gui-frame")).toHaveCount(1);
    await expect(tiles.nth(4).locator(".materializer-gui-frame")).toHaveCount(
      1
    );
    await expect(tiles.nth(5).locator(".labeller-gui-frame")).toHaveCount(1);
  });

  test("testTurningTheLabellerOnKeepsTheStepsInOrder", async ({ page }) => {
    await runVisualTransform(page, INPUT, false);
    await page.locator(".settings-summary").click();
    await page.locator("#setting-labeller").check();
    await page.getByRole("button", { name: "Transform", exact: true }).click();
    await expect(page.locator(".labeller-gui-frame")).toHaveCount(2);
    await waitForFontsAndNetworkIdle(page);

    const stepNumbers = await page
      .locator('.tile[data-tile-id^="step"] .logic-programmer-step')
      .allInnerTexts();
    expect(stepNumbers.map((text) => text.trim())).toEqual([
      "STEP 1",
      "STEP 2",
      "STEP 3",
      "STEP 4",
      "STEP 5",
      "STEP 6",
    ]);
  });

  test("testLabellerStepsHaveNoDisplayPanelsAndDoNotShrinkTheName", async ({
    page,
  }) => {
    await runVisualTransform(page, INPUT, true);

    const tiles = page.locator('.tile[data-tile-id^="step"]');
    await expect(
      tiles.nth(1).locator(".display-panel-view-holder")
    ).toHaveCount(0);
    await expect(
      tiles.nth(5).locator(".display-panel-view-holder")
    ).toHaveCount(0);
    for (const index of [0, 2, 3, 4]) {
      await expect(
        tiles.nth(index).locator(".display-panel-view-holder")
      ).toHaveCount(1);
    }

    const frameBox = await page
      .locator(".labeller-gui-frame")
      .first()
      .boundingBox();
    const cardBox = await page
      .locator(".labeller-slot .labeller-card")
      .first()
      .boundingBox();
    expect(cardBox!.x - frameBox!.x).toBe(16);
    expect(cardBox!.y - frameBox!.y).toBe(16);

    const names = page.locator(".labeller-name-field .fit-text-inner");
    await expect(names.first()).toHaveCSS("font-size", "9px");
    await expect(names.nth(1)).toHaveCSS("font-size", "9px");
    expect(
      await names
        .nth(1)
        .evaluate((element) => (element as HTMLElement).style.right)
    ).toBe("0px");
  });

  test("testLabellerSettingSurvivesUrlReload", async ({ page }) => {
    await runVisualTransform(page, INPUT, true);
    await expect(page.locator(".labeller-gui-frame")).toHaveCount(2);
    const opts = new URL(page.url()).searchParams.get("opts");
    expect(opts).toBeTruthy();

    await page.reload();
    await expect(page.locator(".labeller-gui-frame")).toHaveCount(2);
    await page.locator(".settings-summary").click();
    await expect(page.locator("#setting-labeller")).toBeChecked();
  });
});
