import { test, expect } from "@playwright/test";
import {
  compileAst,
  compileFixtures,
  fixtureLabel,
  openVisual,
} from "./visual-helpers";

const FIXTURES = [
  {
    name: "inventorySlot",
    input: 'InventoryReader(0).slotItem({"slot": 1})',
  },
  {
    name: "redstoneLow",
    input: "readers.redstone.redstoneLow(true)",
  },
  {
    name: "redstoneValueFeedsAdd",
    input: "apply add (readers.redstone.redstoneValue) 1",
  },
] as const;

const CODE = compileFixtures(FIXTURES);

const TYPE_ERROR = compileAst({
  type: "Reader",
  value: {
    reader: "InventoryReader",
    partId: "0",
    aspect: "OBJECT_ITEM_STACK_SLOT",
    simulatedOutput: { type: "String", value: "notanitem" },
  },
});

const EXPECTED_STEPS: Record<(typeof FIXTURES)[number]["name"], number> = {
  inventorySlot: 1,
  redstoneLow: 1,
  redstoneValueFeedsAdd: 3,
};

test.describe("readerVisualOutput", () => {
  test("testReaderStepRendersReaderGuiInPlaceOfLogicProgrammer", async ({
    page,
  }) => {
    await openVisual(page, (await CODE).inventorySlot);

    await expect(page.locator(".logic-programmer-shot")).toHaveCount(1);

    await expect(page.locator(".reader-gui-frame")).toHaveCount(1);
    await expect(page.locator(".logic-programmer-frame")).toHaveCount(0);

    await expect(page.locator(".display-panel-view-holder")).toHaveCount(1);
  });

  test("testReaderGuiShowsTitleAndFocusedAspect", async ({ page }) => {
    await openVisual(page, (await CODE).inventorySlot);

    await expect(page.locator(".reader-title")).toContainText(
      "Inventory Reader"
    );
    await expect(page.locator(".reader-search-field")).toContainText(
      "Slot Item"
    );
    await expect(page.locator(".reader-row-name")).toContainText("Slot Item");
  });

  test("testReaderShowsSimulatedOutputValue", async ({ page }) => {
    await openVisual(page, (await CODE).redstoneLow);

    await expect(page.locator(".reader-row-value")).toContainText("true");
    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(0);
  });

  test("testReaderTypeErrorShowsRedXAndDisplayPanelError", async ({ page }) => {
    await openVisual(page, await TYPE_ERROR);

    await expect(page.locator(".reader-output-error-icon")).toHaveCount(1);
    await expect(page.locator(".reader-slot-output-card")).toHaveCount(0);

    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(2);

    await page.locator(".reader-output-error-icon").hover();
    await expect(
      page.locator(".logic-card-tooltip").filter({
        hasText: "Expected output type Item, got simulatedOutput type String",
      })
    ).toBeVisible();
  });

  test("testReaderWithOperatorShowsReaderGuiThenLogicProgrammerSteps", async ({
    page,
  }) => {
    await openVisual(page, (await CODE).redstoneValueFeedsAdd);

    await expect(page.locator(".logic-programmer-shot")).toHaveCount(3);

    await expect(page.locator(".reader-gui-frame")).toHaveCount(1);
    await expect(page.locator(".logic-programmer-frame")).toHaveCount(2);
  });
});

for (const fixture of FIXTURES) {
  test(`testFullShotEveryStepFor${fixtureLabel(fixture.name)}`, async ({
    page,
  }) => {
    await openVisual(page, (await CODE)[fixture.name]);

    const shots = page.locator(".logic-programmer-shot");
    const count = await shots.count();
    expect(count).toBe(EXPECTED_STEPS[fixture.name]);

    for (let index = 0; index < count; index += 1) {
      await expect(shots.nth(index)).toHaveScreenshot(
        `${fixture.name}-step-${index}.png`
      );
    }
  });
}

test("testFullShotForReaderTypeError", async ({ page }) => {
  await openVisual(page, await TYPE_ERROR);

  const shots = page.locator(".logic-programmer-shot");
  await expect(shots).toHaveCount(1);
  await expect(shots.first()).toHaveScreenshot("reader-type-error-step-0.png");
});
