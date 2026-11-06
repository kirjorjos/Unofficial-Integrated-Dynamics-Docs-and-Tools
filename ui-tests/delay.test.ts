import { test, expect, type Page } from "@playwright/test";
import {
  expandShellForScreenshots,
  waitForFontsAndNetworkIdle,
} from "./visual-helpers";

const runVisual = async (
  page: Page,
  input: string,
  options: { tick?: number; labeller?: boolean } = {}
): Promise<void> => {
  await page.goto("/#transformers");
  await page.locator('textarea[aria-label="Transformer input"]').fill(input);
  await page
    .locator('select[aria-label="Output format"]')
    .selectOption("visual");
  if (options.labeller || options.tick !== undefined) {
    await page.locator(".settings-summary").click();
  }
  if (options.labeller) {
    await page.locator("#setting-labeller").check();
  }
  if (options.tick !== undefined) {
    await page.locator("#setting-target-tick").fill(String(options.tick));
    await page.locator("#setting-target-tick").press("Tab");
  }
  await page.getByRole("button", { name: "Transform", exact: true }).click();
  await page.locator(".logic-programmer-shot").first().waitFor();
  await waitForFontsAndNetworkIdle(page);
  await expandShellForScreenshots(page);
};

const delayStep = (page: Page) =>
  page
    .locator(".logic-programmer-shot", {
      has: page.locator(".delay-gui-frame"),
    })
    .first();

const labellerStep = (page: Page) =>
  page
    .locator(".logic-programmer-shot", {
      has: page.locator(".labeller-gui-frame"),
    })
    .first();

test.describe("delayerGui", () => {
  test("testShowsTheHistoryListAndStateAtTheTargetTick", async ({ page }) => {
    await runVisual(page, "Delay(5, 1, 3)", { tick: 3 });

    const step = delayStep(page);
    await expect(step.locator(".delay-gui-frame")).toHaveCount(1);
    await expect(step.locator(".delay-title .fit-text-inner")).toHaveText(
      "Delayer"
    );
    await expect(step.locator(".delay-status .fit-text-inner")).toHaveText(
      "tick 3"
    );
    await expect(step.locator(".delay-read-value .fit-text-inner")).toHaveText(
      "[5, 5, 5]"
    );
    await expect(step.locator(".delay-slot-input .delay-card")).toHaveCount(1);
    await expect(
      step.locator(".delay-slot-write-in .delay-empty-diamond")
    ).toHaveCount(1);
    await expect(step.locator(".delay-slot-write-out .delay-card")).toHaveCount(
      1
    );
    await expect(
      step.locator(".delay-field-interval .fit-text-inner")
    ).toHaveText("1");
    await expect(
      step.locator(".delay-field-capacity .fit-text-inner")
    ).toHaveText("3");
    await expect(
      step.locator(".display-panel .fit-text-inner").first()
    ).toHaveText("[5, 5, 5]");

    await expect(step).toHaveScreenshot("delayer-tick-3.png");
  });

  test("testTargetTickGrowthUpdatesTheHistory", async ({ page }) => {
    await runVisual(page, "Delay(5, 1, 3)", { tick: 2 });

    const readValue = page.locator(".delay-read-value .fit-text-inner").first();
    await expect(readValue).toHaveText("[5, 5]");
    await expect(
      page.locator(".delay-status .fit-text-inner").first()
    ).toHaveText("tick 2");

    await page.locator("#setting-target-tick").fill("5");
    await page.locator("#setting-target-tick").press("Tab");

    await expect(
      page.locator(".delay-status .fit-text-inner").first()
    ).toHaveText("tick 5");
    await expect(readValue).toHaveText("[5, 5, 5]");
  });

  test("testLabellerFollowsTheDelayerAndNamesItsCard", async ({ page }) => {
    await runVisual(page, "Delay(5, 1, 3)", { tick: 3, labeller: true });

    await expect(page.locator(".labeller-gui-frame")).toHaveCount(1);
    const labeller = labellerStep(page);
    await expect(
      labeller.locator(".labeller-name-field .fit-text-inner")
    ).toHaveText("Delayed{5}");
    await expect(labeller).toHaveScreenshot("delayer-labeller.png");

    await labeller.locator(".labeller-slot .labeller-card").hover();
    await expect(
      page.locator(".logic-card-tooltip .mc-tooltip-title")
    ).toHaveText("Delayed{5}");

    await delayStep(page).locator(".delay-slot-write-out .delay-card").hover();
    await expect(
      page.locator(".logic-card-tooltip .mc-tooltip-title")
    ).toHaveText("Variable Card");
  });
});
