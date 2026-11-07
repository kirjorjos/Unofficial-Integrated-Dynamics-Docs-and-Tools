import { test, expect, type Page } from "@playwright/test";
import {
  expandShellForScreenshots,
  waitForFontsAndNetworkIdle,
} from "./visual-helpers";

const INPUT = "Proxy(5, 3)";

const runVisualTransform = async (
  page: Page,
  input = INPUT,
  labeller = false
): Promise<void> => {
  await page.goto("/#transformers");
  await page.locator('textarea[aria-label="Transformer input"]').fill(input);
  await page
    .locator('select[aria-label="Output format"]')
    .selectOption("visual");
  if (labeller) {
    await page.locator(".settings-summary").click();
    await page.locator("#setting-labeller").check();
  }
  await page.getByRole("button", { name: "Transform", exact: true }).click();
  await page.locator(".logic-programmer-shot").first().waitFor();
  await waitForFontsAndNetworkIdle(page);
  await expandShellForScreenshots(page);
};

const proxyStep = (page: Page) =>
  page
    .locator(".logic-programmer-shot", {
      has: page.locator(".materializer-gui-frame"),
    })
    .first();

const labellerStep = (page: Page) =>
  page
    .locator(".logic-programmer-shot", {
      has: page.locator(".labeller-gui-frame"),
    })
    .first();

const tooltip = (page: Page) => page.locator(".logic-card-tooltip");

const addOpaqueBackdrop = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    const backdrop = document.createElement("div");
    backdrop.style.cssText =
      "position:fixed;inset:0;background:#ffffff;z-index:9998;pointer-events:none;";
    document.body.appendChild(backdrop);
  });
};

const pinTooltipPosition = async (page: Page): Promise<void> => {
  await tooltip(page).evaluate((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.left = "100px";
    htmlElement.style.top = "100px";
  });
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve(null)))
      )
  );
};

test.describe("proxyGui", () => {
  test("testProxyRendersTheMaterializerFrameWithBothCards", async ({
    page,
  }) => {
    await runVisualTransform(page);

    const frame = page.locator(".materializer-gui-frame");
    await expect(frame).toHaveCount(1);
    await expect(frame).toBeVisible();
    await expect(frame).toHaveCSS("background-image", /materializer\.png/);
    await expect(
      page.locator(".materializer-title .fit-text-inner")
    ).toHaveText("Proxy");

    await expect(
      frame.locator(".materializer-slot-top .materializer-card")
    ).toHaveCount(1);
    await expect(
      frame.locator(".materializer-slot-left .materializer-empty-diamond")
    ).toHaveCount(1);
    await expect(
      frame.locator(".materializer-slot-right .materializer-card")
    ).toHaveCount(1);

    await expect(
      proxyStep(page).locator(".display-panel-view-holder")
    ).toHaveCount(0);
  });

  test("testProxyOneAndNamedProxyChainsRenderWithoutErrors", async ({
    page,
  }) => {
    for (const input of [
      "Proxy(1)",
      "test = Proxy(1)\ntest1 = identity(test)",
    ]) {
      await runVisualTransform(page, input);
      await expect(page.locator(".materializer-gui-frame")).toHaveCount(1);
      await expect(page.locator(".output-error")).toHaveCount(0);
    }
  });

  test("testProxyCardTooltipShowsItsProxyAndVariableIds", async ({ page }) => {
    await runVisualTransform(page);

    await page.locator(".materializer-slot-right .materializer-card").hover();

    const lines = tooltip(page).locator(
      ".mc-tooltip-line:not(.mc-tooltip-title)"
    );
    await expect(lines).toHaveCount(3);
    await expect(lines.nth(0)).toHaveText("Proxy ID: 3");
    await expect(lines.nth(1)).toHaveText(/Variable ID: \d+/);
    await expect(lines.nth(2)).toHaveText("Clear or copy in a crafting grid");
  });

  test("testLabellerMakesTheProxyCardUnnamed", async ({ page }) => {
    await runVisualTransform(page, INPUT, true);

    await page.locator(".materializer-slot-right .materializer-card").hover();
    await expect(tooltip(page).locator(".mc-tooltip-title")).toHaveText(
      "Variable Card"
    );

    await page.mouse.move(0, 0);
    await expect(page.locator(".labeller-gui-frame")).toHaveCount(1);
    await page.locator(".labeller-slot .labeller-card").first().hover();
    const title = tooltip(page).locator(".mc-tooltip-title");
    await expect(title).toBeVisible();
    await expect(title).not.toHaveText("Variable Card");
  });

  test("testProxyStepWithExplicitIdScreenshot", async ({ page }) => {
    await runVisualTransform(page, "Proxy(5, 3)");

    await expect(proxyStep(page)).toHaveScreenshot(
      "proxy-step-explicit-id.png"
    );
  });

  test("testProxyStepWithAutoAllocatedIdScreenshot", async ({ page }) => {
    await runVisualTransform(page, "Proxy(1)");

    await expect(proxyStep(page)).toHaveScreenshot("proxy-step-auto-id.png");
  });

  test("testProxyStepWithReaderSourceScreenshot", async ({ page }) => {
    await runVisualTransform(page, "Proxy(InventoryReader.INTEGER_COUNT, 2)");

    await expect(page.locator(".reader-gui-frame")).toHaveCount(1);
    await expect(proxyStep(page)).toHaveScreenshot(
      "proxy-step-reader-source.png"
    );
  });

  test("testBareProxyStepScreenshot", async ({ page }) => {
    await runVisualTransform(page, "Proxy()");

    await expect(proxyStep(page)).toHaveScreenshot("proxy-step-bare.png");
  });

  test("testLabellerOnProxyScreenshots", async ({ page }) => {
    await runVisualTransform(page, INPUT, true);

    await expect(page.locator(".labeller-gui-frame")).toHaveCount(1);
    await expect(proxyStep(page)).toHaveScreenshot("proxy-step-labeller.png");
    await expect(labellerStep(page)).toHaveScreenshot(
      "proxy-labeller-step.png"
    );
  });

  test("testAutoAllocatedProxyTooltipScreenshot", async ({ page }) => {
    await runVisualTransform(page, "Proxy(1)");
    await addOpaqueBackdrop(page);

    await page.locator(".materializer-slot-right .materializer-card").hover();
    await expect(tooltip(page)).toBeVisible();
    await expect(
      tooltip(page).locator(".mc-tooltip-line:not(.mc-tooltip-title)").nth(0)
    ).toHaveText(/Proxy ID: \d+/);
    await pinTooltipPosition(page);
    await expect(tooltip(page)).toHaveScreenshot("proxy-auto-id-tooltip.png");
  });
});
