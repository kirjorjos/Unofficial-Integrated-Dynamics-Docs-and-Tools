import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const GUIDE_NBT =
  '{stats:{health:20,name:"Steve"},Inventory:[{Count:3,id:"minecraft:stone"},{Count:64,id:"minecraft:dirt"}],"my key":"value"}';

const openNbtTools = async (page: Page): Promise<void> => {
  await page.goto("/#nbt-tools");
  await page.locator(".tile-grid").waitFor();
};

const paste = async (page: Page, text: string): Promise<void> => {
  await page.locator('textarea[aria-label="SNBT input"]').fill(text);
};

const guide = (page: Page) => page.locator(".nbt-guide");
const body = (page: Page) => page.getByTestId("nbt-guide-body");
const section = (page: Page, id: string) =>
  page.locator(`[data-guide-section="${id}"]`);
const docsParam = (page: Page) => new URL(page.url()).searchParams.get("docs");

const openGuide = async (page: Page): Promise<void> => {
  if ((await guide(page).count()) === 0) await openNbtTools(page);
  await guide(page).locator(".input-docs-summary").click();
  await expect(body(page)).toBeVisible();
};

test.describe("nbtToolsGuide", () => {
  test("testGuideIsCollapsedByDefaultAndExpands", async ({ page }) => {
    await openNbtTools(page);
    await expect(body(page)).toBeHidden();
    expect(docsParam(page)).toBeNull();

    await guide(page).locator(".input-docs-summary").click();
    await expect(body(page)).toBeVisible();
    expect(docsParam(page)).toBe("1");
  });

  test("testGuideUrlRestoresOpenStateAndCollapsedSections", async ({
    page,
  }) => {
    await openGuide(page);
    await section(page, "path-syntax").locator("summary").click();
    await section(page, "logic-templates").locator("summary").click();
    expect(docsParam(page)).not.toBeNull();

    await page.reload();
    await expect(body(page)).toBeVisible();
    await expect
      .poll(() =>
        section(page, "path-syntax").evaluate(
          (el) => (el as HTMLDetailsElement).open
        )
      )
      .toBe(false);
    await expect
      .poll(() =>
        section(page, "logic-templates").evaluate(
          (el) => (el as HTMLDetailsElement).open
        )
      )
      .toBe(false);
    await expect
      .poll(() =>
        section(page, "operators").evaluate(
          (el) => (el as HTMLDetailsElement).open
        )
      )
      .toBe(true);
  });

  test("testMalformedGuideParamFallsBackToTheDefault", async ({ page }) => {
    for (const raw of ["", "!", "zz", "9999", "-zz"]) {
      await page.goto(`/?docs=${encodeURIComponent(raw)}#nbt-tools`);
      await expect(body(page)).toBeHidden();
      await expect(page.locator(".nbt-guide .input-docs-section")).toHaveCount(
        0
      );

      await guide(page).locator(".input-docs-summary").click();
      await expect(
        page.locator(".nbt-guide .input-docs-section[open]")
      ).toHaveCount(7);
    }
  });

  test("testGuideCoversTheReferenceSections", async ({ page }) => {
    await openGuide(page);

    await expect(page.locator(".nbt-guide .input-docs-heading")).toHaveText([
      "What this tool does",
      "SNBT input",
      "The tree and selection",
      "Path syntax",
      "The three operators",
      "Logic templates",
      "Outputs and sharing",
    ]);

    const syntax = section(page, "path-syntax");
    for (const text of ["$", ".length", "[?(…)]", ".."]) {
      await expect(syntax).toContainText(text);
    }

    const operators = section(page, "operators");
    await expect(operators).toContainText("nbtPathTest");
    await expect(operators).toContainText("nbtPathMatchFirst");
    await expect(operators).toContainText("nbtPathMatchAll");
    await expect(operators).toContainText("String → NBT → Boolean");
  });

  test("testTokenTableLivesInTheGuide", async ({ page }) => {
    await openNbtTools(page);
    await paste(page, '{stats:{health:20,name:"Steve"}}');
    await page.getByRole("radio", { name: "nbtPathTest" }).check();
    await expect(page.getByTestId("template-guide-hint")).toBeVisible();
    await expect(page.getByTestId("template-help")).toHaveCount(0);

    await guide(page).locator(".input-docs-summary").click();
    const panel = page.locator(".nbt-token-panel");
    const rows = panel.locator("tbody tr");
    await expect(rows).toHaveCount(6);
    await expect(rows.nth(0)).toContainText("$name");
    await expect(rows.nth(0)).toContainText("selection's path");
    await expect(rows.nth(1)).toContainText(">= 5");
    await expect(rows.nth(1)).toContainText("1b when it holds");
    await expect(rows.nth(2)).toContainText('== "Steve"');
    await expect(rows.nth(3)).toContainText(".length");
    await expect(rows.nth(4)).toContainText("[?(…)]");
    await expect(rows.nth(5)).toContainText("@");

    await expect(guide(page)).not.toContainText("Cyclops Core");
    await expect(guide(page)).not.toContainText("1.19.2");
  });

  test("testTokenTableKeepsItsContrastContract", async ({ page }) => {
    await openGuide(page);
    const panel = page.locator(".nbt-token-panel");

    const styles = await panel.evaluate((element) => {
      const cell = element.querySelector("tbody code")!;
      return {
        background: getComputedStyle(element).backgroundColor,
        color: getComputedStyle(element).color,
        chipBackground: getComputedStyle(cell).backgroundColor,
        chipColor: getComputedStyle(cell).color,
      };
    });
    expect(styles.color).toBe("rgb(0, 0, 0)");
    expect(styles.chipColor).not.toBe(styles.color);
    expect(styles.chipBackground).not.toBe(styles.background);
    const channels = styles.background.match(/\d+/g)!.map(Number);
    expect(channels).toHaveLength(3);
    const spread = Math.max(...channels) - Math.min(...channels);
    expect(spread).toBeLessThanOrEqual(8);
    expect(channels[0]).toBeLessThan(255);
    expect(channels[0]).toBeGreaterThan(180);
  });

  test("testClickingATemplateExampleLoadsIt", async ({ page }) => {
    await openNbtTools(page);
    await paste(page, "{stats:{health:20}}");
    await openGuide(page);

    await section(page, "logic-templates")
      .getByRole("button", { name: "Load example .stats.health > 5" })
      .click();

    await expect(
      page.getByRole("radio", { name: "nbtPathTest" })
    ).toBeChecked();
    const template = page.locator('textarea[aria-label="Logic template"]');
    await expect(template).toHaveValue(".stats.health > 5");
    await expect(page.getByTestId("path-error")).toHaveCount(0);
    await expect(page.locator(".logic-programmer-sequence")).toBeVisible();
    expect(await template.evaluate((el) => el === document.activeElement)).toBe(
      true
    );
    await expect(template).toBeInViewport();
  });

  test("testClickingAMatchFirstExampleSelectsThePath", async ({ page }) => {
    await openNbtTools(page);
    await paste(page, "{stats:{health:20}}");
    await page.locator('.nbt-tree-row[data-path="$"]').click();
    await page.locator('[aria-label="Selection name"]').fill("root");
    await page.getByRole("button", { name: "Add", exact: true }).click();
    await openGuide(page);

    await section(page, "operators")
      .getByRole("button", {
        name: "Load example .stats.health",
        exact: true,
      })
      .click();

    await expect(
      page.getByRole("radio", { name: "nbtPathMatchFirst" })
    ).toBeChecked();
    await expect(
      page.locator('.nbt-name-list input[aria-label="Path name"]')
    ).toHaveCount(1);
    await expect(
      page.locator('.nbt-name-list input[aria-label="Path name"]')
    ).toHaveValue("selection1");
    await expect(page.getByTestId("named-path")).toHaveText(".stats.health");
    await expect(page.getByTestId("selected-path")).toHaveText(".stats.health");
    await expect(
      page.locator('.nbt-tree-row[data-path=".stats.health"]')
    ).toHaveClass(/is-selected/);
    await expect(page.getByTestId("path-error")).toHaveCount(0);
    await expect(page.locator('[data-tile-id="output"]')).toBeInViewport();
    await expect(
      page.locator('textarea[aria-label="Logic template"]')
    ).toHaveCount(0);
  });

  test("testEveryExampleLoads", async ({ page }) => {
    await openNbtTools(page);
    await paste(page, "{stats:{health:20}}");
    await openGuide(page);

    const operatorFor: Record<string, string> = {
      test: "nbtPathTest",
      matchFirst: "nbtPathMatchFirst",
      matchAll: "nbtPathMatchAll",
    };
    const buttons = guide(page).locator("button.input-docs-example");
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);

    for (let index = 0; index < count; index += 1) {
      const button = buttons.nth(index);
      const operator = await button.getAttribute("data-operator");
      await button.click();
      await expect(
        page.getByRole("radio", { name: operatorFor[operator!]! })
      ).toBeChecked();
      await expect(page.getByTestId("path-error")).toHaveCount(0);
      await expect(page.locator(".logic-programmer-sequence")).toBeVisible();
      await expect(body(page)).toBeVisible();
      await expect(
        page.locator('textarea[aria-label="SNBT input"]')
      ).not.toHaveValue("");
      await expect(page.locator(".nbt-tree-row").first()).toBeVisible();
    }
  });

  test("testTemplateHintOpensTheGuideAtLogicTemplates", async ({ page }) => {
    await openNbtTools(page);
    await paste(page, '{stats:{health:20,name:"Steve"}}');
    await page.getByRole("radio", { name: "nbtPathTest" }).check();
    await page
      .locator('textarea[aria-label="Logic template"]')
      .fill("$a && .b");
    await expect(page.getByTestId("path-error")).toBeVisible();
    await expect(body(page)).toBeHidden();

    await page
      .getByTestId("template-guide-hint")
      .getByRole("button", { name: "see Logic templates" })
      .click();

    await expect(body(page)).toBeVisible();
    await expect
      .poll(() =>
        section(page, "logic-templates").evaluate(
          (el) => (el as HTMLDetailsElement).open
        )
      )
      .toBe(true);
    expect(docsParam(page)).not.toBeNull();
  });

  test("testLoadingFillsThePasteAndKeepsResolvableNames", async ({ page }) => {
    await openNbtTools(page);
    await paste(page, "{stats:{health:20}}");
    await page.locator('.nbt-tree-row[data-path=".stats.health"]').click();
    await page.locator('[aria-label="Selection name"]').fill("a");
    await page.getByRole("button", { name: "Add", exact: true }).click();
    await openGuide(page);

    await section(page, "logic-templates")
      .getByRole("button", { name: "Load example .stats.health > 5" })
      .click();

    await expect(page.locator('textarea[aria-label="SNBT input"]')).toHaveValue(
      GUIDE_NBT
    );
    await expect(
      page.locator('.nbt-name-list input[aria-label="Path name"]')
    ).toHaveCount(1);
    await expect(
      page.locator('.nbt-name-list input[aria-label="Path name"]')
    ).toHaveValue("a");
    await expect(page.getByTestId("named-path")).toHaveText(".stats.health");
  });

  test("testSampleExamplesLoadTheirOwnNbt", async ({ page }) => {
    await openGuide(page);
    const snbt = page.locator('textarea[aria-label="SNBT input"]');
    const samples = section(page, "snbt-input");

    await samples
      .getByRole("button", { name: "Load example .stats.name", exact: true })
      .click();
    await expect(snbt).toHaveValue('{stats:{health:20,name:"Steve"}}');
    await expect(
      page.getByRole("radio", { name: "nbtPathTest" })
    ).toBeChecked();

    await samples
      .getByRole("button", { name: "Load example .display.Name", exact: true })
      .click();
    await expect(snbt).toHaveValue(
      "/give @p minecraft:stone{display:{Name:'\"Stone\"'}}"
    );
  });
});
