import { test, expect } from "@playwright/test";
import { compileFixtures, openVisual } from "./visual-helpers";

const CLEAN_INPUT = 'apply stringConcat "a" "b"';

const FIXTURES = [
  { name: "clean", input: CLEAN_INPUT },
  { name: "arithmetic", input: "apply add 1 2" },
  { name: "type-mismatch", input: "apply add true 2" },
  { name: "boolval", input: "true" },
  { name: "invalid-flip", input: "flip numberIncrement" },
  { name: "list", input: "[1, 2, 3]" },
  { name: "divzero", input: "apply divide 10 0" },
] as const;

const CODE = compileFixtures(FIXTURES);

const VARIABLE_WRAPPER_FIXTURES = [
  {
    name: "at-after-space",
    format: "expanded",
    input: 'Variable("my @var") = 5\nfinal = Variable("my @var")',
  },
  {
    name: "at-at-start",
    format: "expanded",
    input: 'Variable("@my var") = 5\nfinal = Variable("@my var")',
  },
  {
    name: "spaces-only",
    format: "expanded",
    input: 'Variable("my var") = 5\nfinal = Variable("my var")',
  },
  {
    name: "at-variable-wrapper",
    format: "expanded",
    input: 'Variable("my var") = 5\nfinal = @Variable("my var")',
  },
] as const;

const VARIABLE_WRAPPER_CODE = compileFixtures(VARIABLE_WRAPPER_FIXTURES);

test.describe("transformersPageVisualOutputDom", () => {
  test("testRendersOneShotPerStep", async ({ page }) => {
    await openVisual(page, (await CODE).clean);
    await expect(page.locator(".logic-programmer-shot")).toHaveCount(3);
  });

  test("testStepTitlesFollowValueApplicationStructure", async ({ page }) => {
    await openVisual(page, (await CODE).arithmetic);
    const titles = page.locator(".logic-programmer-step-title");
    await expect(titles).toHaveCount(3);
    await expect(titles.nth(0)).toHaveText("1");
    await expect(titles.nth(1)).toHaveText("2");
    await expect(titles.nth(2)).not.toBeEmpty();
  });

  test("testIntegerLiteralsAreAcceptedByNumberInputs", async ({ page }) => {
    await openVisual(page, (await CODE).arithmetic);
    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(0);
    await expect(
      page.locator(".display-panel .fit-text-inner").filter({ hasText: "3" })
    ).toHaveCount(2);
  });

  test("testCleanApplicationShowsNoErrorOverlay", async ({ page }) => {
    await openVisual(page, (await CODE).clean);
    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(0);
  });

  test("testTypeMismatchShowsRedXTooltipNamingMismatch", async ({ page }) => {
    await openVisual(page, (await CODE)["type-mismatch"]);
    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(2);
    await page.locator(".logic-type-error-icon").first().hover();
    await expect(
      page
        .locator(".logic-card-tooltip")
        .filter({ hasText: "Type mismatch: expected Number, got Boolean" })
    ).toBeVisible();
  });

  test("testTypeMismatchResultShowsErrorIconAndBlankOutputCard", async ({
    page,
  }) => {
    await openVisual(page, (await CODE)["type-mismatch"]);
    const resultShot = page.locator(".logic-programmer-shot").last();

    await expect(resultShot.locator(".logic-label-error-icon")).toHaveCount(1);
    await expect(resultShot.locator(".logic-label-ok-icon")).toHaveCount(0);

    const backgroundImage = await resultShot
      .locator(".logic-write-card-composite")
      .evaluate((el) => getComputedStyle(el).backgroundImage);
    expect(backgroundImage).not.toContain("valuetype/");
    expect(backgroundImage).toContain("item/variable.png");
  });

  test("testOutputCardIconMatchesStepValueType", async ({ page }) => {
    await openVisual(page, (await CODE).boolval);
    const card = page
      .locator(".logic-programmer-shot")
      .first()
      .locator(".logic-write-card-composite");
    await expect(card).toHaveCount(1);
    const backgroundImage = await card.evaluate(
      (el) => getComputedStyle(el).backgroundImage
    );
    expect(backgroundImage).toContain("valuetype/boolean.png");
    expect(backgroundImage).toContain("item/variable.png");
  });

  test("testFullyAppliedCurryOutputCardShowsConcreteValueType", async ({
    page,
  }) => {
    await openVisual(page, (await CODE).arithmetic);
    const card = page
      .locator(".logic-programmer-shot")
      .last()
      .locator(".logic-write-card-composite");
    const backgroundImage = await card.evaluate(
      (el) => getComputedStyle(el).backgroundImage
    );
    expect(backgroundImage).toContain("valuetype/integer.png");
  });

  test("testFailedEvaluationDirectCallShowsBaseOperatorTexture", async ({
    page,
  }) => {
    await openVisual(page, (await CODE).divzero);
    const card = page
      .locator(".logic-programmer-shot")
      .last()
      .locator(".logic-write-card-composite");
    const backgroundImage = await card.evaluate(
      (el) => getComputedStyle(el).backgroundImage
    );
    expect(backgroundImage).toContain("valuetype/number.png");
  });

  test("testVarIdParamShiftsVariableIdsShownInTooltips", async ({ page }) => {
    await openVisual(page, (await CODE).clean, 0);
    const card = page
      .locator(".logic-programmer-shot")
      .first()
      .locator(".logic-write-card-composite");
    await card.hover();
    await expect(
      page.locator(".logic-card-tooltip").filter({ hasText: /Variable ID/ })
    ).toBeVisible();
    await expect(
      page
        .locator(".logic-card-tooltip")
        .filter({ hasText: /Variable ID: .*0/ })
    ).toBeVisible();

    await openVisual(page, (await CODE).clean, 5);
    await card.hover();
    await expect(
      page
        .locator(".logic-card-tooltip")
        .filter({ hasText: /Variable ID: .*5/ })
    ).toBeVisible();
  });

  test("testTypingReadableInputMatchesUrlParamRendering", async ({ page }) => {
    await page.goto("/");
    await page
      .locator('textarea[aria-label="Transformer input"]')
      .fill(CLEAN_INPUT);
    await page
      .locator('select[aria-label="Output format"]')
      .selectOption("visual");
    await page.getByRole("button", { name: "Transform", exact: true }).click();

    await expect(page.locator(".logic-programmer-shot")).toHaveCount(3);
    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(0);
  });

  test("testInvalidFlipRendersGracefully", async ({ page }) => {
    await openVisual(page, (await CODE)["invalid-flip"]);
    await expect(page.locator(".logic-programmer-shot")).toHaveCount(2);
  });

  test("testListValueRendersElementStepsPlusListStep", async ({ page }) => {
    await openVisual(page, (await CODE).list);
    await expect(page.locator(".logic-programmer-shot")).toHaveCount(4);
  });

  test("testAtAfterSpaceInsideVarNameUsingVariableWrapper", async ({
    page,
  }) => {
    await openVisual(page, (await VARIABLE_WRAPPER_CODE)["at-after-space"]);
    await expect(page.locator(".logic-programmer-shot")).toHaveCount(2);
    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(0);
    await expect(
      page
        .locator(".logic-programmer-shot")
        .first()
        .locator(".display-panel .fit-text-inner")
        .first()
    ).toContainText("5");
  });

  test("testAtAtStartOfVarNameUsingVariableWrapper", async ({ page }) => {
    await openVisual(page, (await VARIABLE_WRAPPER_CODE)["at-at-start"]);
    await expect(page.locator(".logic-programmer-shot")).toHaveCount(2);
    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(0);
    await expect(
      page
        .locator(".logic-programmer-shot")
        .first()
        .locator(".display-panel .fit-text-inner")
        .first()
    ).toContainText("5");
  });

  test("testVariableWrapperWithSpacesOnly", async ({ page }) => {
    await openVisual(page, (await VARIABLE_WRAPPER_CODE)["spaces-only"]);
    await expect(page.locator(".logic-programmer-shot")).toHaveCount(2);
    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(0);
    await expect(
      page
        .locator(".logic-programmer-shot")
        .first()
        .locator(".display-panel .fit-text-inner")
        .first()
    ).toContainText("5");
  });

  test("testAtVariableWrapperResolvesToCardId", async ({ page }) => {
    await openVisual(
      page,
      (await VARIABLE_WRAPPER_CODE)["at-variable-wrapper"]
    );
    await expect(page.locator(".logic-programmer-shot")).toHaveCount(2);
    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(0);
    // @Variable("my var") resolves to the card id of the "my var" definition (0)
    await expect(
      page
        .locator(".logic-programmer-shot")
        .nth(1)
        .locator(".display-panel .fit-text-inner")
        .first()
    ).toContainText("0");
  });

  test("testFitTextRendersAtIntegerPixelSizes", async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(String(error)));

    await openVisual(page, (await CODE).list);
    const fractional = await page.evaluate(
      () =>
        Array.from(document.querySelectorAll(".fit-text-inner")).filter(
          (el) => {
            const px = parseFloat(getComputedStyle(el).fontSize);
            return Math.abs(px - Math.round(px)) > 0.01;
          }
        ).length
    );
    expect(fractional).toBe(0);

    const scaledCount = await page.evaluate(
      () =>
        Array.from(document.querySelectorAll(".fit-text")).filter((el) => {
          const inner = el.querySelector(".fit-text-inner");
          return (
            inner &&
            getComputedStyle(inner).fontSize !== getComputedStyle(el).fontSize
          );
        }).length
    );
    expect(scaledCount).toBeGreaterThan(0);

    expect(pageErrors).toEqual([]);
  });
});
