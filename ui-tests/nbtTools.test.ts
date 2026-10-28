import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const row = (page: Page, path: string) =>
  page.locator(`.nbt-tree-row[data-path="${path}"]`);

const openNbtTools = async (page: Page): Promise<void> => {
  await page.goto("/#nbt-tools");
  await page.locator(".tile-grid").waitFor();
};

const paste = async (page: Page, text: string): Promise<void> => {
  await page.locator('textarea[aria-label="SNBT input"]').fill(text);
};

const readClipboard = (page: Page): Promise<string> =>
  page.evaluate(() => navigator.clipboard.readText());

const nameSelection = async (page: Page, name: string): Promise<void> => {
  await page.locator('[aria-label="Selection name"]').fill(name);
  await page.getByRole("button", { name: "Add", exact: true }).click();
};

test.use({ permissions: ["clipboard-read", "clipboard-write"] });

test.describe("nbtToolsPage", () => {
  test("testClickingAKeyShowsAndCopiesItsPath", async ({ page }) => {
    await openNbtTools(page);
    await paste(page, '{stats:{health:20,name:"Steve"}}');

    await row(page, ".stats.health").click();
    await expect(page.getByTestId("selected-path")).toHaveText(".stats.health");

    await page.getByTestId("copy-path").click();
    expect(await readClipboard(page)).toBe(".stats.health");
  });

  test("testArrowDirectionAndGlobalExpandCollapse", async ({ page }) => {
    await openNbtTools(page);
    await paste(page, "{a:{b:{c:1}}}");

    const rootRow = row(page, "$");
    const arrow = rootRow.locator(".nbt-tree-arrow");
    await expect(arrow).toHaveText("▾");

    await arrow.click();
    await expect(arrow).toHaveText("▸");
    await expect(row(page, ".a")).toHaveCount(0);

    await page.getByRole("button", { name: "Expand all" }).click();
    await expect(arrow).toHaveText("▾");
    await expect(row(page, ".a.b.c")).toBeVisible();

    await page.getByRole("button", { name: "Collapse all" }).click();
    await expect(row(page, ".a")).toBeVisible();
    await expect(row(page, ".a.b")).toHaveCount(0);
  });

  test("testMatchAllMinimisesTwoNamedSiblings", async ({ page }) => {
    await openNbtTools(page);
    await paste(page, '{stats:{health:20,name:"Steve",level:3}}');

    await row(page, ".stats.health").click();
    await nameSelection(page, "a");
    await row(page, ".stats.name").click();
    await nameSelection(page, "b");

    await page.getByRole("radio", { name: "nbtPathMatchAll" }).check();
    await expect(page.getByTestId("path-error")).toHaveCount(0);
    await expect(page.locator(".logic-programmer-sequence")).toBeVisible();

    await page.getByTestId("copy-logic").click();
    expect(await readClipboard(page)).toBe(
      'nbtPathMatchAll(".stats[health,name]")'
    );
  });

  test("testLogicTemplateValidation", async ({ page }) => {
    await openNbtTools(page);
    await paste(page, '{stats:{health:20,name:"Steve"}}');

    await row(page, ".stats.health").click();
    await nameSelection(page, "a");
    await row(page, ".stats.name").click();
    await nameSelection(page, "b");

    await page.getByRole("radio", { name: "nbtPathTest" }).check();
    const template = page.locator('textarea[aria-label="Logic template"]');

    await template.fill("$a > 5");
    await expect(page.getByTestId("path-error")).toHaveCount(0);
    await expect(page.locator(".logic-programmer-sequence")).toBeVisible();

    await template.fill("$a && .b");
    await expect(page.getByTestId("path-error")).toContainText(
      '1.19.2 NBT paths do not support "&&"'
    );
    await expect(page.getByTestId("copy-logic")).toBeDisabled();
  });

  test("testMultipleBlobsSelectAndPruneNames", async ({ page }) => {
    await openNbtTools(page);
    await paste(page, "{a:1}\n\n{b:2}");

    const selector = page.locator('select[aria-label="Blob"]');
    await expect(selector).toBeVisible();

    await row(page, ".a").click();
    await nameSelection(page, "x");
    await expect(row(page, ".b")).toHaveCount(0);

    await selector.selectOption("1");
    await expect(row(page, ".b")).toBeVisible();
    await expect(
      page.getByText("Dropped 1 name that no longer resolves: x")
    ).toBeVisible();
    await expect(page.getByTestId("copy-path")).toBeDisabled();
  });

  test("testRenamesAndRemovesNamedPaths", async ({ page }) => {
    await openNbtTools(page);
    await paste(page, "{a:1}");
    await row(page, ".a").click();
    await nameSelection(page, "x");

    const nameInput = page.locator(
      '.nbt-name-list input[aria-label="Path name"]'
    );
    await nameInput.fill("y");
    await nameInput.blur();
    await expect(nameInput).toHaveValue("y");

    await page
      .locator(".nbt-name-list")
      .getByRole("button", { name: "Remove" })
      .click();
    await expect(page.locator(".nbt-name-list")).toHaveCount(0);
  });

  test("testEmptyContainersArrayNoteAndPrimitiveRoot", async ({ page }) => {
    await openNbtTools(page);
    await paste(page, "{empty:{},list:[],bytes:[B;1b,2b]}");

    await expect(row(page, ".empty")).toContainText("{}");
    await expect(row(page, ".list")).toContainText("[]");

    await row(page, ".bytes").click();
    await expect(page.getByTestId("selected-path")).toHaveText(".bytes");
    await expect(
      page.getByText(/Array elements are not addressable/)
    ).toBeVisible();

    await paste(page, "5");
    await expect(row(page, "$")).toContainText("5");
  });

  test("testPreviewShowsOnlyTheFinalStepWithoutMetaOrDisplayPanels", async ({
    page,
  }) => {
    await openNbtTools(page);
    await paste(page, '{stats:{health:20,name:"Steve"}}');

    await row(page, ".stats.health").click();
    await nameSelection(page, "a");
    await page.getByRole("radio", { name: "nbtPathMatchAll" }).check();

    const preview = page.locator(".nbt-preview");
    await expect(preview.locator(".logic-programmer-shot")).toHaveCount(1);
    await expect(preview.locator(".display-panel-view-holder")).toHaveCount(0);
    await expect(preview.locator(".logic-programmer-meta")).toHaveCount(0);
    await expect(preview.locator(".logic-programmer-step")).toHaveCount(0);
    await expect(preview.locator(".logic-programmer-step-title")).toHaveCount(
      0
    );
  });

  test("testTemplateHelpTableListsSupportedTokens", async ({ page }) => {
    await openNbtTools(page);
    await paste(page, '{stats:{health:20,name:"Steve"}}');

    await expect(page.getByTestId("template-help")).toHaveCount(0);

    await row(page, ".stats.health").click();
    await nameSelection(page, "a");
    await page.getByRole("radio", { name: "nbtPathTest" }).check();

    const help = page.getByTestId("template-help");
    await expect(help.getByRole("columnheader")).toHaveText([
      "Token",
      "Meaning",
    ]);

    const rows = help.locator("tbody tr");
    await expect(rows).toHaveCount(6);
    await expect(rows.nth(0)).toContainText("$name");
    await expect(rows.nth(0)).toContainText("selection's path");
    await expect(rows.nth(1)).toContainText(">= 5");
    await expect(rows.nth(1)).toContainText("1b when it holds");
    await expect(rows.nth(2)).toContainText('== "Steve"');
    await expect(rows.nth(3)).toContainText(".length");
    await expect(rows.nth(4)).toContainText("[?(…)]");
    await expect(rows.nth(5)).toContainText("@");

    await expect(help).not.toContainText("Cyclops Core");

    const styles = await help.evaluate((element) => {
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

  test("testValueTokensAreClassifiedForSyntaxColoring", async ({ page }) => {
    await openNbtTools(page);
    await paste(page, '{name:"Steve",health:20,bytes:[B;1b,2b]}');
    await expect(row(page, ".name").locator(".nbt-tree-key")).toHaveText(
      "name"
    );
    await expect(row(page, ".name").locator(".nbt-tree-value")).toHaveClass(
      /is-string/
    );
    await expect(row(page, ".health").locator(".nbt-tree-value")).toHaveClass(
      /is-number/
    );
    await expect(row(page, ".bytes").locator(".nbt-tree-value")).toHaveClass(
      /is-array-literal/
    );
  });

  test("testUndecodableUrlParamFallsBackToAnEmptyInput", async ({ page }) => {
    await page.goto("/?nbt=%25%25not-base64%25%25#nbt-tools");
    await expect(page.locator('textarea[aria-label="SNBT input"]')).toHaveValue(
      ""
    );
    await expect(
      page.getByText("Paste SNBT to see the formatted tree.")
    ).toBeVisible();
  });

  test("testPasteIsStoredInTheUrlAndRestoredOnReload", async ({ page }) => {
    await openNbtTools(page);
    const param = () => new URL(page.url()).searchParams.get("nbt");
    expect(param()).toBeNull();

    const snbt = `/give @p minecraft:stone{display:{Name:'{"text":"Stève"}'},bytes:[B;1b,2b],lvl:5s}`;
    await paste(page, snbt);
    await expect.poll(param).not.toBeNull();
    expect(param()).toMatch(/^[A-Za-z0-9_-]+$/);

    await page.reload();
    await expect(page.locator('textarea[aria-label="SNBT input"]')).toHaveValue(
      snbt
    );
    await expect(row(page, ".display.Name")).toBeVisible();
    await expect(row(page, ".bytes").locator(".nbt-tree-value")).toHaveClass(
      /is-array-literal/
    );
    await expect(row(page, ".lvl").locator(".nbt-tree-value")).toHaveText("5s");
  });

  test("testClearingThePasteRemovesTheUrlParam", async ({ page }) => {
    await openNbtTools(page);
    const param = () => new URL(page.url()).searchParams.get("nbt");

    await paste(page, '{stats:{health:20,name:"Steve",bytes:[B;1b,2b]}}');
    await expect.poll(param).not.toBeNull();

    await paste(page, "");
    await expect.poll(param).toBeNull();

    await page.reload();
    await expect(page.locator('textarea[aria-label="SNBT input"]')).toHaveValue(
      ""
    );
    await expect(row(page, "$")).toHaveCount(0);
  });

  test("testKeepsThePasteWhenLeavingThePageBeforeTheDebounce", async ({
    page,
  }) => {
    await openNbtTools(page);
    const param = () => new URL(page.url()).searchParams.get("nbt");

    await paste(page, "{a:1}");
    await page
      .getByRole("button", { name: "Transformers", exact: true })
      .click();
    await page.waitForURL(/#transformers/);
    await expect.poll(param).not.toBeNull();

    await page.getByRole("button", { name: "NBT tools", exact: true }).click();
    await expect(page.locator('textarea[aria-label="SNBT input"]')).toHaveValue(
      "{a:1}"
    );
    await expect(row(page, ".a")).toBeVisible();
  });

  test("testJumpOpensTheTransformerWithExpandedVisual", async ({ page }) => {
    await openNbtTools(page);
    await paste(page, "{a:1}");
    await row(page, ".a").click();
    await nameSelection(page, "a");

    await page.getByTestId("open-transformer").click();
    await page.waitForURL(/#transformers/);

    await expect(
      page.locator('textarea[aria-label="Transformer input"]')
    ).toHaveValue('path = nbtPathMatchFirst ".a"');
    await expect(
      page.locator('select[aria-label="Output format"]')
    ).toHaveValue("visual");
    await expect(
      page.locator(".logic-programmer-sequence").first()
    ).toBeVisible();
  });
});
