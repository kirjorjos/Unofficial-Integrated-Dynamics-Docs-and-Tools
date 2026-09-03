import { test, expect } from "@playwright/test";
import {
  compileFixtures,
  decodeStoredInputState,
  openVisual,
} from "./visual-helpers";

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
    const atAfterSpaceShots = page.locator(".logic-programmer-shot");
    for (let index = 0; index < 2; index += 1) {
      await expect(atAfterSpaceShots.nth(index)).toHaveScreenshot(
        `at-after-space-step-${index}.png`
      );
    }
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
    const atAtStartShots = page.locator(".logic-programmer-shot");
    for (let index = 0; index < 2; index += 1) {
      await expect(atAtStartShots.nth(index)).toHaveScreenshot(
        `at-at-start-step-${index}.png`
      );
    }
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
    const spacesOnlyShots = page.locator(".logic-programmer-shot");
    for (let index = 0; index < 2; index += 1) {
      await expect(spacesOnlyShots.nth(index)).toHaveScreenshot(
        `spaces-only-step-${index}.png`
      );
    }
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
    const atVariableWrapperShots = page.locator(".logic-programmer-shot");
    for (let index = 0; index < 2; index += 1) {
      await expect(atVariableWrapperShots.nth(index)).toHaveScreenshot(
        `at-variable-wrapper-step-${index}.png`
      );
    }
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

test.describe("transformersPageInputStateRestore", () => {
  const runTransform = async (
    page: import("@playwright/test").Page,
    input: string,
    format: string
  ): Promise<string> => {
    const inputBox = page.locator('textarea[aria-label="Transformer input"]');
    const outputSelect = page.locator('select[aria-label="Output format"]');
    const transformButton = page.getByRole("button", {
      name: "Transform",
      exact: true,
    });
    await page.goto("/");
    await inputBox.fill(input);
    await outputSelect.selectOption(format);
    await transformButton.click();
    const code = new URL(page.url()).searchParams.get("code");
    const output = new URL(page.url()).searchParams.get("output");
    expect(output).toBe(format);
    expect(code).toBeTruthy();
    return code!;
  };

  const runTransformReload = async (
    page: import("@playwright/test").Page,
    input: string,
    format: string
  ): Promise<void> => {
    await runTransform(page, input, format);
    await page.reload();
  };

  test("testReloadRestoresNonCanonicalCondensedInput", async ({ page }) => {
    const input = "add(1, 2)";
    await runTransformReload(page, input, "condensed");
    await expect(
      page.locator('textarea[aria-label="Transformer input"]')
    ).toHaveValue(input);
    await expect(page.locator('textarea[aria-label="Condensed"]')).toHaveValue(
      "numberAdd(1, 2)"
    );
  });

  test("testReloadRestoresOuterWhitespaceByteForByte", async ({ page }) => {
    const input = "\n\n  add(1, 2) \t\n";
    await runTransformReload(page, input, "condensed");
    await expect(
      page.locator('textarea[aria-label="Transformer input"]')
    ).toHaveValue(input);
  });

  test("testReloadRestoresCodeLineInputWithOuterWhitespace", async ({
    page,
  }) => {
    const input = "\n  add 1 2 \t";
    await runTransformReload(page, input, "codeline");
    await expect(
      page.locator('textarea[aria-label="Transformer input"]')
    ).toHaveValue(input);
    await expect(page.locator('textarea[aria-label="Code Line"]')).toHaveValue(
      "numberAdd 1 2"
    );
  });

  test("testReloadRestoresExpandedInputByteForByte", async ({ page }) => {
    const input = "\n-- note\nx = add(1, 2) -- inline\nfinal = x\n\n";
    await runTransformReload(page, input, "expanded");
    await expect(
      page.locator('textarea[aria-label="Transformer input"]')
    ).toHaveValue(input);
  });

  test("testReloadRestoresExpandedSparseRhs", async ({ page }) => {
    const input =
      'result = stringConcat("a very long first string value", "a very long second string value") -- computed';
    await runTransformReload(page, input, "expanded");
    await expect(
      page.locator('textarea[aria-label="Transformer input"]')
    ).toHaveValue(input);
  });

  test("testStoredExpandedSectionIsSparseRhsOverlay", async ({ page }) => {
    const input =
      'result = stringConcat("a very long first string value", "a very long second string value") -- computed';
    const code = await runTransform(page, input, "expanded");

    const decoded = await decodeStoredInputState(code, "expanded");
    expect(decoded).not.toBeNull();
    if (!decoded) return;
    expect(decoded.format).toBe("expanded");
    expect(decoded.mode).toBe("overlay");
    if (decoded.format !== "expanded" || decoded.mode !== "overlay") return;
    expect(decoded.overlay.items).toHaveLength(1);
    const item = decoded.overlay.items[0]!;
    expect(item).toMatchObject({
      kind: 0,
      nameRef: 0, // ordinal into the canonical def order; resolves to `result`
      tailMode: 0,
      head: null, // has-head=0: canonical default head elided
      suffix: " -- computed",
    });
    if (item.kind !== 0 || item.tailMode !== 0) return;
    expect(item.rhsOverlay.mode).toBe(0);
    expect(item.rhsOverlay.spellingOverrides).toEqual([]);
    expect(item.rhsOverlay.hasTrailingGap).toBe(false);

    await page.reload();
    await expect(
      page.locator('textarea[aria-label="Transformer input"]')
    ).toHaveValue(input);
  });

  test("testReloadCanonicalCurryStoresNoSection", async ({ page }) => {
    const input = "numberAdd(1, 2)";
    await runTransformReload(page, input, "condensed");
    await expect(
      page.locator('textarea[aria-label="Transformer input"]')
    ).toHaveValue("");
    await expect(page.locator('textarea[aria-label="Condensed"]')).toHaveValue(
      "numberAdd(1, 2)"
    );
  });

  test("testReloadRestoresJsonInputWithSpellingAndWhitespace", async ({
    page,
  }) => {
    const input =
      '\n  {"curry":{"values":[{"valueType":"integrateddynamics:integer","value":1.0}],"baseOperator":{"operatorName":"integrateddynamics:arithmetic_addition"}}} \t';
    await runTransformReload(page, input, "json");
    await expect(
      page.locator('textarea[aria-label="Transformer input"]')
    ).toHaveValue(input);
    await expect(page.locator('textarea[aria-label="JSON"]')).toHaveValue(
      [
        "{",
        '  "curry": {',
        '    "values": [',
        "      {",
        '        "valueType": "integrateddynamics:integer",',
        '        "value": 1',
        "      }",
        "    ],",
        '    "baseOperator": {',
        '      "operatorName": "integrateddynamics:arithmetic_addition"',
        "    }",
        "  }",
        "}",
      ].join("\n")
    );
  });
});
