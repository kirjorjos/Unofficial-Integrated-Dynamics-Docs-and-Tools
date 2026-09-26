import { test, expect } from "@playwright/test";

const INPUT = "Materialize(numberAdd(InventoryReader.INTEGER_COUNT, 2))";
const MULTI_READER_INPUT =
  "Materialize(numberAdd(RedstoneReader.BOOLEAN_LOW, InventoryReader.INTEGER_COUNT))";
const NESTED_INPUT = "Materialize(numberAdd(Materialize(Dynamic(5)), 2))";
const CODELINE_INPUT =
  "Materialize(numberAdd InventoryReader(0).inventoryCount 2)";
const WRAPPED_LAMBDA_INPUT = "x => add Dynamic(x) 2";
const MATERIALIZED_WRAPPED_LAMBDA_INPUT = "Materialize(x => add Dynamic(x) 2)";

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const runVisualTransform = async (
  page: import("@playwright/test").Page,
  input: string
): Promise<string> => {
  await page.goto("/#transformers");
  await page.locator('textarea[aria-label="Transformer input"]').fill(input);
  await page
    .locator('select[aria-label="Output format"]')
    .selectOption("visual");
  await page.getByRole("button", { name: "Transform", exact: true }).click();
  const code = new URL(page.url()).searchParams.get("code");
  expect(code).toBeTruthy();
  return code!;
};

test.describe("materializerGui", () => {
  test("testMaterializeExpressionRendersTheMaterializerGui", async ({
    page,
  }) => {
    await runVisualTransform(page, INPUT);

    const frame = page.locator(".materializer-gui-frame");
    await expect(frame).toHaveCount(1);
    await expect(frame).toBeVisible();

    await expect(
      frame.locator(".materializer-slot-top .materializer-card")
    ).toHaveCount(1);

    await expect(
      frame.locator(".materializer-slot-left .materializer-empty-diamond")
    ).toHaveCount(1);

    await expect(
      frame.locator(".materializer-slot-right .materializer-card")
    ).toHaveCount(1);
  });

  test("testMaterializerUsesTheModTextureAndShowsTheValueText", async ({
    page,
  }) => {
    await runVisualTransform(page, INPUT);

    await expect(page.locator(".materializer-gui-frame")).toHaveCSS(
      "background-image",
      /materializer\.png/
    );

    const readValue = page.locator(".materializer-read-value");
    await expect(readValue).toBeVisible();
    await expect(readValue).toContainText("::");
  });

  test("testMaterializerIsCenteredWithTheTitleOnTheTexturesTopLeft", async ({
    page,
  }) => {
    await runVisualTransform(page, INPUT);

    const shell = page.locator(".materializer-gui-frame-shell");
    const frame = page.locator(".materializer-gui-frame");
    const step = page.locator(".logic-programmer-shot").filter({
      has: page.locator(".materializer-gui-frame"),
    });
    const titleInner = page.locator(".materializer-title .fit-text-inner");

    const [shellBox, stepBox, frameBox, titleBox] = await Promise.all([
      shell.boundingBox(),
      step.boundingBox(),
      frame.boundingBox(),
      titleInner.boundingBox(),
    ]);

    expect(
      Math.abs(
        shellBox!.x + shellBox!.width / 2 - (stepBox!.x + stepBox!.width / 2)
      )
    ).toBeLessThan(2);

    expect(Math.abs(titleBox!.x - (frameBox!.x + 16))).toBeLessThan(3);
    expect(titleBox!.y).toBeLessThan(frameBox!.y + 40);
  });

  test("testResultCardTooltipDescribesTheMaterializedValue", async ({
    page,
  }) => {
    await runVisualTransform(page, INPUT);

    await page.locator(".materializer-slot-right .materializer-card").hover();

    const tooltip = page.locator(".logic-card-tooltip .mc-tooltip");
    await expect(tooltip).toHaveCount(1);
    await expect(tooltip.locator(".mc-tooltip-title")).toHaveText(/.+/);

    const lines = tooltip.locator(".mc-tooltip-line:not(.mc-tooltip-title)");
    await expect(lines).toHaveCount(6);
    await expect(lines.nth(0)).toHaveText("Type: Operator");
    await expect(lines.nth(1)).toHaveText("Signature: Number -> Number");
    await expect(lines.nth(2)).toHaveText("Value: Applied numberAdd [Integer]");
    await expect(lines.nth(3)).toHaveText(/Variable ID: \d+/);

    await expect(lines.nth(4)).toHaveText("Clear or copy in a crafting");
    await expect(lines.nth(5)).toHaveText("grid");

    const resultIdText = await lines.nth(3).innerText();

    await page.locator(".materializer-slot-top .materializer-card").hover();
    const topTooltip = page.locator(".logic-card-tooltip .mc-tooltip");
    await expect(topTooltip).toHaveCount(1);
    const topIdText = await topTooltip
      .locator(".mc-tooltip-line:not(.mc-tooltip-title)")
      .filter({ hasText: /Variable ID: \d+$/ })
      .innerText();
    expect(Number(resultIdText.replace(/\D/g, ""))).toBe(
      Number(topIdText.replace(/\D/g, "")) + 1
    );
  });

  test("testMaterializerStepPanelsMatchTheCardBeingMaterialized", async ({
    page,
  }) => {
    await runVisualTransform(page, INPUT);

    const shots = page.locator(".logic-programmer-shot");

    await page.locator(".materializer-slot-top .materializer-card").hover();
    const topTitle = (
      await page.locator(".logic-card-tooltip .mc-tooltip-title").innerText()
    ).trim();
    const topStep = shots.filter({
      has: page.locator(".logic-programmer-step-title", {
        hasText: new RegExp(`^${escapeRegExp(topTitle)}$`),
      }),
    });
    await expect(topStep).toHaveCount(1);

    const materializerStep = shots.filter({
      has: page.locator(".materializer-gui-frame"),
    });
    await expect(materializerStep).toHaveCount(1);

    const panels = (scope: typeof shots) =>
      scope.locator(".display-panel-screen .fit-text-inner").allInnerTexts();

    const cardPanels = await panels(topStep);
    expect(cardPanels).toHaveLength(2);
    expect(cardPanels[0]).toContain("::");

    expect(await panels(materializerStep)).toEqual(cardPanels);
  });

  test("testMaterializeExpressionSurvivesUrlReload", async ({ page }) => {
    await runVisualTransform(page, INPUT);
    await expect(page.locator(".materializer-gui-frame")).toHaveCount(1);

    await page.reload();

    await expect(
      page.locator('textarea[aria-label="Transformer input"]')
    ).toHaveValue(INPUT);
    await expect(page.locator(".materializer-gui-frame")).toHaveCount(1);
  });

  test("testEachReaderGetsItsOwnStepAndApplyStep", async ({ page }) => {
    await runVisualTransform(page, MULTI_READER_INPUT);

    await expect(page.locator(".materializer-gui-frame")).toHaveCount(1);
    await expect(page.locator(".reader-gui-frame")).toHaveCount(2);
  });

  test("testNestedMaterializeRendersBothMaterializers", async ({ page }) => {
    await runVisualTransform(page, NESTED_INPUT);

    await expect(page.locator(".materializer-gui-frame")).toHaveCount(2);
  });

  test("testWrappedLambdaParametersRenderWithoutInternalErrors", async ({
    page,
  }) => {
    for (const input of [
      WRAPPED_LAMBDA_INPUT,
      MATERIALIZED_WRAPPED_LAMBDA_INPUT,
    ]) {
      await runVisualTransform(page, input);
      await expect(page.locator(".display-panel-error-overlay")).toHaveCount(0);
    }

    await runVisualTransform(page, MATERIALIZED_WRAPPED_LAMBDA_INPUT);
    await expect(page.locator(".materializer-gui-frame")).toHaveCount(1);
  });

  test("testMisspelledWrapperReportsTheCallName", async ({ page }) => {
    await page.goto("/#transformers");
    await page
      .locator('textarea[aria-label="Transformer input"]')
      .fill("Materalize(x => add Dynamic(x) 2)");
    await page.getByRole("button", { name: "Transform", exact: true }).click();

    await expect(page.locator(".output-error")).toContainText(
      "Unknown identifier: Materalize"
    );
  });

  test("testCodeLineWrapperIsDetectedAsCodeLineAndRenders", async ({
    page,
  }) => {
    await runVisualTransform(page, CODELINE_INPUT);

    await expect(page.locator(".status")).toContainText("Detected Code Line");
    await expect(
      page.locator('textarea[aria-label="Transformer input"]')
    ).toHaveValue(CODELINE_INPUT);
    await expect(page.locator(".materializer-gui-frame")).toHaveCount(1);
    await expect(page.locator(".reader-gui-frame")).toHaveCount(1);

    await page.reload();

    await expect(
      page.locator('textarea[aria-label="Transformer input"]')
    ).toHaveValue(CODELINE_INPUT);
    await expect(page.locator(".materializer-gui-frame")).toHaveCount(1);
  });
});
