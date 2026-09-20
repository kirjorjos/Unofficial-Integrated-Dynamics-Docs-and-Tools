import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

const inputBox = (page: Page): Locator =>
  page.locator('textarea[aria-label="Transformer input"]');

const openDocs = async (page: Page, tabLabel?: string): Promise<void> => {
  await page.goto("/#transformers");
  await page.locator(".input-docs-summary").click();
  if (tabLabel) {
    await page.locator(".input-docs-tab", { hasText: tabLabel }).click();
  }
};

test.describe("transformersPageInputDocs", () => {
  test("testSectionIsCollapsedByDefaultAndExpandsOnClick", async ({ page }) => {
    await page.goto("/#transformers");
    const body = page.locator(".input-docs-body");
    await expect(body).toBeHidden();

    await page.locator(".input-docs-summary").click();
    await expect(body).toBeVisible();
  });

  test("testSectionSitsAboveTheInput", async ({ page }) => {
    await page.goto("/#transformers");
    const docsBox = await page.locator(".input-docs").boundingBox();
    const inputBoxRect = await page
      .locator(".editor-shell.input-editor-shell")
      .boundingBox();
    expect(docsBox!.y).toBeLessThan(inputBoxRect!.y);
  });

  test("testFiveTabsWithOverviewSelectedAndArrowKeyNavigation", async ({
    page,
  }) => {
    await openDocs(page);

    const tabs = page.locator(".input-docs-tab");
    await expect(tabs).toHaveCount(5);
    await expect(tabs).toHaveText([
      "Overview",
      "Expanded",
      "Code Line",
      "Condensed",
      "Visual",
    ]);
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");

    await tabs.nth(0).focus();
    await page.keyboard.press("ArrowRight");
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(tabs.nth(1)).toBeFocused();

    await page.keyboard.press("End");
    await expect(tabs.nth(4)).toHaveAttribute("aria-selected", "true");
    await expect(page.locator(".input-docs-panel")).toContainText(
      "in-game card"
    );
  });

  test("testOverviewExplainsTheRequiredOptionalLegend", async ({ page }) => {
    await openDocs(page);
    const panel = page.locator(".input-docs-panel");
    await expect(panel).toContainText("required");
    await expect(panel).toContainText("optional");
    await expect(panel.locator(".input-doc-span-required")).toHaveCount(1);
    await expect(panel.locator(".input-doc-span-optional")).toHaveCount(1);
  });

  test("testConcreteExampleLoadsIntoAnEmptyInputWithoutPrompting", async ({
    page,
  }) => {
    let dialogSeen = false;
    page.on("dialog", (dialog) => {
      dialogSeen = true;
      void dialog.dismiss();
    });

    await openDocs(page, "Code Line");
    await page.getByText("add 2 3", { exact: true }).click();

    await expect(inputBox(page)).toHaveValue("add 2 3");
    expect(dialogSeen).toBe(false);
  });

  test("testDifferingInputIsOnlyReplacedAfterConfirming", async ({ page }) => {
    await openDocs(page, "Code Line");
    await inputBox(page).fill("x = 1");

    page.once("dialog", (dialog) => {
      expect(dialog.type()).toBe("confirm");
      void dialog.dismiss();
    });
    await page.getByText("add 2 3", { exact: true }).click();
    await expect(inputBox(page)).toHaveValue("x = 1");

    page.once("dialog", (dialog) => {
      void dialog.accept();
    });
    await page.getByText("add 2 3", { exact: true }).click();
    await expect(inputBox(page)).toHaveValue("add 2 3");
  });

  test("testCancellingAnOverwriteKeepsTheInputUnsafeUntilAccepted", async ({
    page,
  }) => {
    await openDocs(page, "Code Line");
    await inputBox(page).fill("x = 1");

    for (let attempt = 0; attempt < 2; attempt += 1) {
      page.once("dialog", (dialog) => void dialog.dismiss());
      await page.getByText("add 2 3", { exact: true }).click();
      await expect(inputBox(page)).toHaveValue("x = 1");
    }

    page.once("dialog", (dialog) => void dialog.accept());
    await page.getByText("add 2 3", { exact: true }).click();
    await expect(inputBox(page)).toHaveValue("add 2 3");

    let dialogSeen = false;
    page.on("dialog", (dialog) => {
      dialogSeen = true;
      void dialog.dismiss();
    });
    await page.getByText("add 2 (multiply 3 4)", { exact: true }).click();
    expect(dialogSeen).toBe(false);
    await expect(inputBox(page)).toHaveValue("add 2 (multiply 3 4)");
  });

  test("testLoadingExamplesBackToBackNeverPrompts", async ({ page }) => {
    let dialogSeen = false;
    page.on("dialog", (dialog) => {
      dialogSeen = true;
      void dialog.dismiss();
    });

    await openDocs(page, "Code Line");
    await page.getByText("add 2 3", { exact: true }).click();
    await expect(inputBox(page)).toHaveValue("add 2 3");

    await page.getByText("add 2 (multiply 3 4)", { exact: true }).click();

    expect(dialogSeen).toBe(false);
    await expect(inputBox(page)).toHaveValue("add 2 (multiply 3 4)");
  });

  test("testLoadedExampleCarriesItsDescriptionAsAComment", async ({ page }) => {
    await openDocs(page, "Expanded");
    await page.getByText("x = 5 :: Integer", { exact: true }).click();

    await expect(inputBox(page)).toHaveValue(
      "-- signature after the expression\nx = 5 :: Integer"
    );
  });

  test("testLoadingTheVisualExampleSwitchesTheOutputFormat", async ({
    page,
  }) => {
    await openDocs(page, "Visual");
    await page
      .locator("button.input-docs-example-concrete", {
        hasText: "apply add 1 2",
      })
      .click();

    await expect(
      page.locator('select[aria-label="Output format"]')
    ).toHaveValue("visual");
    await expect(inputBox(page)).toHaveValue(
      "-- a small Code Line program\napply add 1 2"
    );
  });

  test("testCollapsingASectionStoresAShortSparseStateInTheUrl", async ({
    page,
  }) => {
    await openDocs(page, "Condensed");
    const lastSection = page.locator(".input-docs-section").last();
    await lastSection.locator("summary").click();

    await expect(lastSection).not.toHaveAttribute("open", "");
    const docs = new URL(page.url()).searchParams.get("docs");
    expect(docs).not.toBeNull();
    expect(docs!.length).toBeLessThanOrEqual(4);
  });

  test("testManyCollapsedSectionsUseThePackedStateAndStillRestore", async ({
    page,
  }) => {
    await openDocs(page, "Condensed");
    const sections = page.locator(".input-docs-section");
    for (let index = 0; index < 4; index += 1) {
      await sections.nth(index).locator("summary").click();
    }

    const docs = new URL(page.url()).searchParams.get("docs");
    expect(docs).not.toBeNull();
    expect(docs!.startsWith("-")).toBe(true);
    expect(docs!.length).toBeLessThanOrEqual(10);

    await page.goto(page.url());
    await expect(page.locator(".input-docs-body")).toBeVisible();
    for (let index = 0; index < 4; index += 1) {
      await expect(sections.nth(index)).not.toHaveAttribute("open", "");
    }
  });

  test("testUrlRestoresTheActiveTabAndCollapsedSections", async ({ page }) => {
    await openDocs(page, "Condensed");
    await page
      .locator(".input-docs-section")
      .first()
      .locator("summary")
      .click();
    const savedUrl = page.url();

    await page.goto(savedUrl);

    await expect(page.locator(".input-docs-body")).toBeVisible();
    await expect(
      page.locator(".input-docs-tab", { hasText: "Condensed" })
    ).toHaveAttribute("aria-selected", "true");
    await expect(
      page.locator(".input-docs-section").first()
    ).not.toHaveAttribute("open", "");
  });

  test("testOuterPanelOpenStatePersistsInTheUrl", async ({ page }) => {
    await page.goto("/#transformers");
    await expect(page.locator(".input-docs-body")).toBeHidden();
    expect(new URL(page.url()).searchParams.get("docs")).toBeNull();

    await page.locator(".input-docs-summary").click();
    await expect(page.locator(".input-docs-body")).toBeVisible();
    expect(new URL(page.url()).searchParams.get("docs")).not.toBeNull();

    await page.goto(page.url());
    await expect(page.locator(".input-docs-body")).toBeVisible();

    await page.locator(".input-docs-summary").click();
    await expect(page.locator(".input-docs-body")).toBeHidden();
    expect(new URL(page.url()).searchParams.get("docs")).toBeNull();
  });

  test("testMalformedDocsParamFallsBackToTheDefaultState", async ({ page }) => {
    for (const malformed of ["", "!", "-", "a", "z"]) {
      await page.goto(`/?docs=${encodeURIComponent(malformed)}#transformers`);

      await expect(page.locator(".input-docs-body")).toBeHidden();
      const tabs = page.locator(".input-docs-tab");
      await expect(tabs).toHaveCount(5);
      await expect(tabs.first()).toHaveText("Overview");
      await expect(tabs.first()).toHaveAttribute("aria-selected", "true");

      await page.locator(".input-docs-summary").click();
      await expect(page.locator(".input-docs-body")).toBeVisible();
      await expect(page.locator(".input-docs-section").first()).toHaveAttribute(
        "open",
        ""
      );
      expect(new URL(page.url()).searchParams.get("docs")).toBe("5");
    }
  });

  test("testStructuralTemplatesHaveNoLoadAffordance", async ({ page }) => {
    await openDocs(page, "Expanded");

    await expect(
      page.locator("button.input-docs-example-concrete").first()
    ).toBeVisible();
    await expect(
      page.locator("div.input-docs-example-structural").first()
    ).toBeVisible();
    await expect(
      page.locator("button.input-docs-example-structural")
    ).toHaveCount(0);
  });
});

test.describe("transformersPageSettingsHelp", () => {
  test("testEverySettingsLabelHasHelpTextAndQuestionMark", async ({ page }) => {
    await page.goto("/#transformers");
    await page.locator(".settings-summary").click();

    const labels = page.locator(".settings-body .settings-label");
    await expect(labels).toHaveCount(19);

    const count = await labels.count();
    for (let index = 0; index < count; index += 1) {
      await expect(labels.nth(index)).toHaveAttribute("data-help", /.+/);
      await expect(labels.nth(index).locator(".settings-help-mark")).toHaveText(
        "?"
      );
    }

    await expect(page.locator(".settings-help-mark")).toHaveCount(19);
  });

  test("testHoveringTheQuestionMarkRevealsTheHelpText", async ({ page }) => {
    await page.goto("/#transformers");
    await page.locator(".settings-summary").click();

    const label = page.locator('label[for="setting-depth"]');
    const tooltip = () =>
      label.evaluate((element) => {
        const style = getComputedStyle(element, "::after");
        return { display: style.display, content: style.content };
      });

    const row = page.locator('.settings-row:has(label[for="setting-depth"])');
    await expect(row).toHaveClass(/disabled/);
    expect(
      await row.evaluate((element) => getComputedStyle(element).opacity)
    ).toBe("1");
    expect(
      await label.evaluate((element) => getComputedStyle(element).color)
    ).toBe("rgba(39, 71, 80, 0.45)");

    expect((await tooltip()).display).toBe("none");

    await label.locator(".settings-help-mark").hover();

    const hovered = await tooltip();
    expect(hovered.display).toBe("block");
    expect(hovered.content).toContain("Caps how many nested");
    expect(hovered.content).toContain("Only applies to Expanded output.");
  });

  test("testHelpTextAppendsTheEnablingOutputFormat", async ({ page }) => {
    await page.goto("/#transformers");
    await page.locator(".settings-summary").click();

    await expect(page.locator('label[for="setting-depth"]')).toHaveAttribute(
      "data-help",
      /Only applies to Expanded output\./
    );
    await expect(
      page.locator('label[for="setting-statement-layout"]')
    ).toHaveAttribute(
      "data-help",
      /Only applies to Code Line and Condensed output\./
    );
    await expect(page.locator('label[for="setting-wrap"]')).not.toHaveAttribute(
      "data-help",
      /Only applies/
    );
    await expect(page.locator('label[for="setting-varid"]')).toHaveAttribute(
      "data-help",
      /ID given to the first card/
    );
  });
});
