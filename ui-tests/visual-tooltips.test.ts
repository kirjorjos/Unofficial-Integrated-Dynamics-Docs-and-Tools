import { test, expect, type Locator, type Page } from "@playwright/test";
import { compileFixtures, openVisual } from "./visual-helpers";

const FIXTURES = [
  { name: "arithmetic", input: "apply add 1 2" },
  { name: "type-mismatch", input: "apply add true 2" },
] as const;

const CODE = compileFixtures(FIXTURES);

const hoverAndFrame = async (page: Page, target: Locator) => {
  await target.evaluate((el) =>
    el.scrollIntoView({ block: "center", inline: "nearest" })
  );
  await target.hover();
  const tooltip = page.locator(".logic-card-tooltip");
  await expect(tooltip).toBeVisible();
  const wrapperTop = await target.evaluate((el) => {
    const wrapper = el.closest(".logic-tooltip-anchor");
    if (!wrapper) {
      throw new Error("hover target is not inside a .logic-tooltip-anchor");
    }
    return wrapper.getBoundingClientRect().top;
  });
  const viewport = page.viewportSize() ?? { width: 1280, height: 900 };
  await expect
    .poll(
      async () => {
        const box = await tooltip.boundingBox();
        if (!box) return false;
        const inViewport =
          box.x >= 0 &&
          box.y >= 0 &&
          box.x + box.width <= viewport.width &&
          box.y + box.height <= viewport.height;
        const nearAnchor = Math.abs(box.y + box.height - (wrapperTop - 4)) <= 3;
        return inViewport && nearAnchor;
      },
      {
        timeout: 5000,
        message:
          "tooltip should be positioned above its anchor and fully in-viewport",
      }
    )
    .toBe(true);
  return tooltip;
};

test.describe("tooltipScreenshotsPinnedMcFont", () => {
  test("testValueCardTooltip", async ({ page }) => {
    await openVisual(page, (await CODE).arithmetic);
    const card = page
      .locator(".logic-programmer-shot")
      .nth(0)
      .locator(".logic-write-card-composite");
    const tooltip = await hoverAndFrame(page, card);
    await expect(tooltip).toContainText(/Variable ID/);
    await expect(tooltip).toHaveScreenshot("value-card-tooltip.png");
  });

  test("testOperatorCardTooltip", async ({ page }) => {
    await openVisual(page, (await CODE).arithmetic);
    const card = page
      .locator(".logic-programmer-shot")
      .nth(2)
      .locator(".logic-write-card-composite");
    const tooltip = await hoverAndFrame(page, card);
    await expect(tooltip).toContainText(/Input Type 1/);
    await expect(tooltip).toHaveScreenshot("operator-card-tooltip.png");
  });

  test("testErrorRedXTooltip", async ({ page }) => {
    await openVisual(page, (await CODE)["type-mismatch"]);
    const icon = page.locator(".logic-type-error-icon").first();
    const tooltip = await hoverAndFrame(page, icon);
    await expect(tooltip).toContainText(/Type mismatch/);
    await expect(tooltip).toHaveScreenshot("error-tooltip.png");
  });
});
