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
  {
    name: "varById",
    input: "readers.network.variableValueById",
  },
  {
    name: "varByIdMapReduce",
    format: "expanded",
    input: `step0 = 319
step1 = 236
final = apply apply reduce1 add (apply apply map readers.network.variableValueById [0, 1])`,
  },
  {
    name: "varByIdAtRefs",
    input: "319; 236; map readers.network.variableValueById [@0, @1]",
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

const VAR_BY_ID_TYPE_ERROR = compileAst({
  type: "Reader",
  value: {
    reader: "NetworkReader",
    partId: "0",
    aspect: "OPERATOR_GETVARIABLEBYID",
    settings: {},
    simulatedOutput: { type: "Integer", value: "5" },
  },
});

const EXPECTED_STEPS: Record<(typeof FIXTURES)[number]["name"], number> = {
  inventorySlot: 1,
  redstoneLow: 1,
  redstoneValueFeedsAdd: 3,
  varById: 1,
  varByIdMapReduce: 9,
  varByIdAtRefs: 7,
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

  test("testVarByIdShowsOperatorSignatureInValueBoxAndDisplayPanel", async ({
    page,
  }) => {
    await openVisual(page, (await CODE).varById);

    await expect(page.locator(".reader-title")).toContainText("Network Reader");
    await expect(page.locator(".reader-row-name")).toContainText(
      "Variable Value By ID"
    );
    await expect(page.locator(".reader-row-value")).toContainText(
      "Virtual operator.integrateddynamics.virtual.variablebyid"
    );
    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(0);
  });

  test("testVarByIdTypeErrorShowsXAndDisplayPanelError", async ({ page }) => {
    await openVisual(page, await VAR_BY_ID_TYPE_ERROR);

    await expect(page.locator(".reader-output-error-icon")).toHaveCount(1);
    await expect(page.locator(".reader-slot-output-card")).toHaveCount(0);

    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(2);

    await page.locator(".reader-output-error-icon").hover();
    await expect(
      page.locator(".logic-card-tooltip").filter({
        hasText:
          "Variable Value By ID does not support an overridden simulatedValue.",
      })
    ).toBeVisible();
  });

  test("testVarByIdMapReduceResolvesValuesInDisplayPanels", async ({
    page,
  }) => {
    await openVisual(page, (await CODE).varByIdMapReduce);

    const shots = page.locator(".logic-programmer-shot");
    await expect(shots).toHaveCount(9);

    // The two integer cards 319 and 236 (steps 0 and 1)
    await expect(
      shots.nth(0).locator(".display-panel .fit-text-inner").first()
    ).toContainText("319");
    await expect(
      shots.nth(1).locator(".display-panel .fit-text-inner").first()
    ).toContainText("236");

    // Step 3 is the Variable Value By ID reader GUI
    await expect(shots.nth(3).locator(".reader-title")).toContainText(
      "Network Reader"
    );

    // Step 7 (map result) resolves [0, 1] against steps 0/1 -> [319, 236]
    await expect(
      shots.nth(7).locator(".display-panel .fit-text-inner").first()
    ).toContainText("319");
    await expect(
      shots.nth(7).locator(".display-panel .fit-text-inner").first()
    ).toContainText("236");

    // Step 8 (reduce1 over addition) -> 555
    await expect(
      shots.nth(8).locator(".display-panel .fit-text-inner").first()
    ).toContainText("555");

    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(0);
  });

  test("testAtRefSyntaxResolvesVarIdsInDisplayPanels", async ({ page }) => {
    await openVisual(page, (await CODE).varByIdAtRefs);

    const shots = page.locator(".logic-programmer-shot");
    await expect(shots).toHaveCount(7);

    // The two integer cards 319 and 236 (steps 0 and 1)
    await expect(
      shots.nth(0).locator(".display-panel .fit-text-inner").first()
    ).toContainText("319");
    await expect(
      shots.nth(1).locator(".display-panel .fit-text-inner").first()
    ).toContainText("236");

    // Step 2 is the Variable Value By ID reader GUI
    await expect(shots.nth(2).locator(".reader-title")).toContainText(
      "Network Reader"
    );

    // Step 6 (map over the @0/@1-resolved ids) -> [319, 236]
    await expect(
      shots.nth(6).locator(".display-panel .fit-text-inner").first()
    ).toContainText("319");
    await expect(
      shots.nth(6).locator(".display-panel .fit-text-inner").first()
    ).toContainText("236");

    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(0);
  });

  test("testAtRefSyntaxHoversShowDifferentVarIds", async ({ page }) => {
    await openVisual(page, (await CODE).varByIdAtRefs);

    const shots = page.locator(".logic-programmer-shot");
    await expect(shots).toHaveCount(7);

    // Hover the 319 card's output card: Variable ID 0
    const firstCard = shots.nth(0).locator(".logic-write-card-composite");
    await firstCard.hover();
    await expect(
      page
        .locator(".logic-card-tooltip")
        .filter({ hasText: /Variable ID: .*0/ })
    ).toBeVisible();
    await expect(page).toHaveScreenshot("varByIdAtRefs-step-0-hover.png");

    // Hover the map result card: a different Variable ID (6)
    const mapCard = shots.nth(6).locator(".logic-write-card-composite");
    await mapCard.hover();
    await expect(
      page
        .locator(".logic-card-tooltip")
        .filter({ hasText: /Variable ID: .*6/ })
    ).toBeVisible();
    await expect(page).toHaveScreenshot("varByIdAtRefs-step-6-hover.png");
  });

  test("testVarByIdMapReduceHoversShowDifferentVarIds", async ({ page }) => {
    await openVisual(page, (await CODE).varByIdMapReduce);

    const shots = page.locator(".logic-programmer-shot");
    await expect(shots).toHaveCount(9);

    // Hover the initial 319 card's output card: Variable ID 0. The tooltip
    // floats via position:fixed, so capture the viewport (element screenshots
    // clip fixed-position children).
    const firstCard = shots.nth(0).locator(".logic-write-card-composite");
    await firstCard.hover();
    await expect(
      page
        .locator(".logic-card-tooltip")
        .filter({ hasText: /Variable ID: .*0/ })
    ).toBeVisible();
    await expect(page).toHaveScreenshot("varByIdMapReduce-step-0-hover.png");

    // Hover the initial 236 card's output card: Variable ID 1
    const secondCard = shots.nth(1).locator(".logic-write-card-composite");
    await secondCard.hover();
    await expect(
      page
        .locator(".logic-card-tooltip")
        .filter({ hasText: /Variable ID: .*1/ })
    ).toBeVisible();
    await expect(page).toHaveScreenshot("varByIdMapReduce-step-1-hover.png");

    // Hover the map result's output card: a different Variable ID (7)
    const mapCard = shots.nth(7).locator(".logic-write-card-composite");
    await mapCard.hover();
    await expect(
      page
        .locator(".logic-card-tooltip")
        .filter({ hasText: /Variable ID: .*7/ })
    ).toBeVisible();
    await expect(page).toHaveScreenshot("varByIdMapReduce-step-7-hover.png");
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
