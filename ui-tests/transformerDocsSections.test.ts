import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import {
  expandShellForScreenshots,
  waitForFontsAndNetworkIdle,
} from "./visual-helpers";

const openCondensedDocs = async (page: Page): Promise<void> => {
  await page.goto("/#transformers");
  await page.locator(".input-docs-summary").click();
  await page.locator(".input-docs-tab", { hasText: "Condensed" }).click();
  await waitForFontsAndNetworkIdle(page);
  await expandShellForScreenshots(page);
  await page.mouse.move(0, 0);
};

const panel = (page: Page) => page.locator(".input-docs-panel");

test.describe("transformersPageInputDocsSections", () => {
  test("testExpandedSectionsScreenshot", async ({ page }) => {
    await openCondensedDocs(page);
    await expect(panel(page)).toHaveScreenshot("condensed-expanded.png");
  });

  test("testCollapsedSectionsScreenshot", async ({ page }) => {
    await openCondensedDocs(page);

    const summaries = page.locator(".input-docs-section > summary");
    const count = await summaries.count();
    expect(count).toBeGreaterThan(0);
    for (let index = 0; index < count; index += 1) {
      await summaries.nth(index).click();
    }

    await page.mouse.move(0, 0);
    await expect(panel(page)).toHaveScreenshot("condensed-collapsed.png");
  });

  test("testPartiallyCollapsedSectionsScreenshot", async ({ page }) => {
    await openCondensedDocs(page);

    const summaries = page.locator(".input-docs-section > summary");
    const count = await summaries.count();
    for (let index = 1; index < count; index += 1) {
      await summaries.nth(index).click();
    }

    await page.mouse.move(0, 0);
    await expect(panel(page)).toHaveScreenshot("condensed-partial.png");
  });
});
