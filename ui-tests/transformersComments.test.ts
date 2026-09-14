import { test, expect } from "@playwright/test";

test.describe("transformersPageVisualComments", () => {
  const runVisual = async (
    page: import("@playwright/test").Page,
    input: string
  ): Promise<void> => {
    await page.goto("/#transformers");
    await page.locator('textarea[aria-label="Transformer input"]').fill(input);
    await page
      .locator('select[aria-label="Output format"]')
      .selectOption("visual");
    await page.getByRole("button", { name: "Transform", exact: true }).click();
  };

  test("testCodeLineCommentRendersOnTheStepItFollows", async ({ page }) => {
    await runVisual(page, 'add -- test"\nid');
    const comments = page.locator(".logic-programmer-step-comment");
    await expect(comments).toHaveCount(1);
    await expect(comments.first()).toHaveText('test"');
  });
});
