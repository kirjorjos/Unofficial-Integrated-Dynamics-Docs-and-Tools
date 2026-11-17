import { test, expect, type Locator, type Page } from "@playwright/test";
import {
  expandShellForScreenshots,
  waitForFontsAndNetworkIdle,
} from "./visual-helpers";

const openOperatorSignature = async (page: Page, operatorKey: string) => {
  await page.goto(`/#operator-${operatorKey}`);
  const aligned = page.locator(".operator-signature-aligned");
  await aligned.waitFor();
  await waitForFontsAndNetworkIdle(page);
  await expandShellForScreenshots(page);
  return aligned;
};

const signatureRows = async (aligned: Locator) =>
  aligned.evaluate((el) => ({
    types: el.querySelector(".operator-signature-types")?.textContent ?? "",
    names: el.querySelector(".operator-signature-names")?.textContent ?? "",
  }));

const horizontalOverflow = (aligned: Locator) =>
  aligned.evaluate((el) => el.scrollWidth - el.clientWidth);

test.describe("operatorSignatureNames", () => {
  test("testNamesWithinFiveCharsOfTheirTypesNeedNoExtraPadding", async ({
    page,
  }) => {
    const aligned = await openOperatorSignature(page, "ARITHMETIC_SUBTRACTION");
    const { types, names } = await signatureRows(aligned);

    expect(types).toBe("   Number   →   (Number   →   Number)");
    expect(names).toBe("  Minuend      Subtrahend   Difference");

    expect(await horizontalOverflow(aligned)).toBeLessThanOrEqual(1);

    await expect(aligned).toHaveScreenshot(
      "operator-signature-within-five.png"
    );
  });

  test("testNamesFurtherThanFiveCharsPadBothRows", async ({ page }) => {
    const aligned = await openOperatorSignature(
      page,
      "OBJECT_BLOCK_WITH_PROPERTIES"
    );
    const { types, names } = await signatureRows(aligned);

    expect(types).toBe("   Block   →   (NBT   →   Block)");
    expect(names).toBe("   Block    Properties   Result");

    expect(await horizontalOverflow(aligned)).toBeLessThanOrEqual(1);

    await expect(aligned).toHaveScreenshot("operator-signature-padded.png");
  });

  test("testShortNameIsIndentedUnderItsLongerTypeName", async ({ page }) => {
    const aligned = await openOperatorSignature(page, "LIST_ELEMENT");
    const { types, names } = await signatureRows(aligned);

    expect(types).toBe("   List<Any<A>>   →   (Integer   →   Any<A>)");
    expect(names).toBe("       List             Index       Element");

    expect(await horizontalOverflow(aligned)).toBeLessThanOrEqual(1);

    await expect(aligned).toHaveScreenshot(
      "operator-signature-indented-name.png"
    );
  });
});
