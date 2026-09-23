import { test, expect } from "@playwright/test";

test.describe("transformersPageSettingsPanel", () => {
  const runTransform = async (
    page: import("@playwright/test").Page,
    input: string,
    format: string
  ): Promise<void> => {
    await page.goto("/#transformers");
    await page.locator('textarea[aria-label="Transformer input"]').fill(input);
    await page
      .locator('select[aria-label="Output format"]')
      .selectOption(format);
    await page.getByRole("button", { name: "Transform", exact: true }).click();
  };

  test("testPanelIsCollapsedByDefaultAndExpandsOnClick", async ({ page }) => {
    await page.goto("/#transformers");
    const body = page.locator(".settings-body");
    await expect(body).toBeHidden();
    await page.locator(".settings-summary").click();
    await expect(body).toBeVisible();
  });

  test("testNewlineStatementLayoutJoinsCodeLineStatementsOnePerLine", async ({
    page,
  }) => {
    await runTransform(page, "a = 5\nfinal = a", "codeline");
    await expect(page.locator('textarea[aria-label="Code Line"]')).toHaveValue(
      "5; 5"
    );

    await page.locator(".settings-summary").click();
    await page.locator("#setting-statement-layout").selectOption("newline");
    await expect(page.locator('textarea[aria-label="Code Line"]')).toHaveValue(
      "5\n5"
    );
  });

  test("testStatementLayoutSurvivesUrlReloadViaOptsParam", async ({ page }) => {
    await runTransform(page, "a = 5\nfinal = a", "codeline");
    await page.locator(".settings-summary").click();
    await page.locator("#setting-statement-layout").selectOption("newline");
    await expect(page.locator('textarea[aria-label="Code Line"]')).toHaveValue(
      "5\n5"
    );
    const opts = new URL(page.url()).searchParams.get("opts");
    expect(opts).toBeTruthy();

    await page.reload();
    await expect(page.locator('textarea[aria-label="Code Line"]')).toHaveValue(
      "5\n5"
    );
  });

  test("testDeclarationOnlyOperatorsKnobDecidesWhetherACardIsAdded", async ({
    page,
  }) => {
    await runTransform(page, "pipe\nx = 1", "codeline");
    await expect(page.locator('textarea[aria-label="Code Line"]')).toHaveValue(
      "1"
    );

    await page.locator(".settings-summary").click();
    await page.locator("#setting-declaration-cards").selectOption("add");
    await expect(page.locator('textarea[aria-label="Code Line"]')).toHaveValue(
      /operatorPipe/
    );
  });

  test("testWrapDropdownOffersScrollAndWrapLabels", async ({ page }) => {
    await page.goto("/#transformers");
    await page.locator(".settings-summary").click();

    const options = page.locator("#setting-wrap option");
    await expect(options).toHaveText(["Scroll", "Wrap"]);
  });

  test("testWrapDropdownSwitchesEveryTextareaBetweenScrollAndWrap", async ({
    page,
  }) => {
    await page.goto("/#transformers");
    const input = page.locator('textarea[aria-label="Transformer input"]');
    const output = page.locator('textarea[aria-label="Condensed"]');
    await expect(input).toHaveAttribute("wrap", "off");
    await expect(output).toHaveAttribute("wrap", "off");

    await page.locator(".settings-summary").click();
    await page.locator("#setting-wrap").selectOption({ label: "Wrap" });
    await expect(input).toHaveAttribute("wrap", "soft");
    await expect(output).toHaveAttribute("wrap", "soft");
  });

  test("testWrapDropdownControlsExpandedViewerScrollMode", async ({ page }) => {
    await runTransform(page, "a = 5\nfinal = a", "expanded");
    const viewer = page.locator(".expanded-output-viewer");
    await expect(viewer).toHaveClass(/scroll-mode/);

    await page.locator(".settings-summary").click();
    await page.locator("#setting-wrap").selectOption({ label: "Wrap" });
    await expect(viewer).not.toHaveClass(/scroll-mode/);
  });
});
