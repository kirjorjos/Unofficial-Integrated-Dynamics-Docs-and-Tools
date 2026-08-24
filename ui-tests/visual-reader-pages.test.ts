import { test, expect } from "@playwright/test";
import { openReaderAspect } from "./visual-helpers";

const PAGES = [
  { name: "redstoneIntegerValue", pageId: "reader-redstone-integer-value" },
  { name: "redstoneBooleanClock", pageId: "reader-redstone-boolean-clock" },
  {
    name: "inventorySlotItem",
    pageId: "reader-inventory-object-item-stack-slot",
  },
  {
    name: "networkVariableValueById",
    pageId: "reader-network-operator-getvariablebyid",
  },
  { name: "networkAnyValue", pageId: "reader-network-any-value" },
  { name: "fluidIntegerAmount", pageId: "reader-fluid-integer-amount" },
  { name: "machineListGetRecipes", pageId: "reader-machine-list-getrecipes" },
  { name: "audioBanjoNote", pageId: "reader-audio-integer-banjo-note" },
] as const;

test.describe("readerAspectPages", () => {
  for (const pageDef of PAGES) {
    test(`testFullShot${pageDef.name}`, async ({ page }) => {
      await openReaderAspect(page, pageDef.pageId);
      await expect(page).toHaveScreenshot(`${pageDef.name}.png`, {
        fullPage: true,
      });
    });
  }

  test("testPageShowsInfoBoxInputReaderViewAndDisplayPanel", async ({
    page,
  }) => {
    await openReaderAspect(page, "reader-redstone-integer-value");

    await expect(page.locator(".reader-aspect-doc-page h2")).toContainText(
      "Redstone"
    );

    await expect(page.locator(".reader-aspect-info-box")).toContainText(
      "Display name"
    );
    await expect(page.locator(".reader-aspect-info-box")).toContainText(
      "Output type"
    );
    await expect(page.locator(".reader-aspect-info-box")).toContainText(
      "Get the exact redstone level"
    );

    const valueInput = page.locator(".reader-aspect-value-input");
    await expect(valueInput).toHaveValue("0");

    await expect(page.locator(".reader-gui-frame")).toHaveCount(1);
    await expect(page.locator(".reader-title")).toContainText(
      "Redstone Reader"
    );

    await expect(page.locator(".display-panel-view-holder")).toHaveCount(1);
  });

  test("testSettingsSubBoxShowsThreeLineEntries", async ({ page }) => {
    await openReaderAspect(page, "reader-redstone-boolean-clock");

    await expect(page.locator(".reader-aspect-settings-box h3")).toContainText(
      "Settings"
    );
    const settings = page.locator(".reader-aspect-setting");
    await expect(settings).toHaveCount(3);

    await expect(settings.nth(0)).toContainText("Pulse Interval");
    await expect(settings.nth(0)).toContainText("20");
    await expect(settings.nth(1)).toContainText("Pulse Length");
    await expect(settings.nth(2)).toContainText("Pulse Time Offset");
  });

  test("testOperatorAspectShowsSignatureAndUnsupportedBlob", async ({
    page,
  }) => {
    await openReaderAspect(page, "reader-network-operator-getvariablebyid");

    await expect(
      page.locator(".reader-aspect-operator-signature")
    ).toContainText("Integer -> Any");
    await expect(page.locator(".reader-aspect-operator-blob")).toContainText(
      "does not support an overridden simulatedValue"
    );
    await expect(page.locator(".reader-aspect-value-input")).toHaveCount(0);
  });

  test("testTypingInvalidValueShowsXAndErrorOnKeystroke", async ({ page }) => {
    await openReaderAspect(page, "reader-redstone-integer-value");

    const valueInput = page.locator(".reader-aspect-value-input");
    await valueInput.fill("hello");

    await expect(page.locator(".reader-output-error-icon")).toHaveCount(1);
    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(1);

    await page.locator(".reader-output-error-icon").hover();
    await expect(
      page
        .locator(".logic-card-tooltip")
        .filter({ hasText: "Unknown identifier" })
    ).toBeVisible();
  });

  test("testTypingWrongTypeShowsTypeMismatchError", async ({ page }) => {
    await openReaderAspect(page, "reader-redstone-integer-value");

    const valueInput = page.locator(".reader-aspect-value-input");
    await valueInput.fill("true");

    await expect(page.locator(".reader-output-error-icon")).toHaveCount(1);

    await page.locator(".reader-output-error-icon").hover();
    await expect(
      page
        .locator(".logic-card-tooltip")
        .filter({ hasText: "Expected output type Integer" })
    ).toBeVisible();
  });

  test("testClearingInputFallsBackToDefaultAndPlaceholder", async ({
    page,
  }) => {
    await openReaderAspect(page, "reader-redstone-integer-value");

    const valueInput = page.locator(".reader-aspect-value-input");
    await valueInput.fill("");

    await expect(page.locator(".reader-row-value")).toContainText("0");
    await expect(valueInput).toHaveAttribute("placeholder", "0");
    await expect(page.locator(".display-panel-error-overlay")).toHaveCount(0);
  });
});
