import { test, expect } from "@playwright/test";
import { compileFixtures, fixtureLabel, openVisual } from "./visual-helpers";

const FIXTURES = [
  { name: "addOneTwo", input: "apply add 1 2" },
  { name: "concatAB", input: 'apply stringConcat "a" "b"' },
  { name: "addTrueTwo", input: "apply add true 2" },
  { name: "divideTenByZero", input: "apply divide 10 0" },
  {
    name: "multiplyAddOneTwoByThree",
    input: "apply multiply (apply add 1 2) 3",
  },
  { name: "partialAddOne", input: "apply add 1" },
  { name: "flipNumberAdd", input: "flip numberAdd" },
  { name: "invalidFlipNumberIncrement", input: "flip numberIncrement" },
  {
    name: "pipeIncrementMultiply",
    input: "pipe numberIncrement numberMultiply",
  },
  {
    name: "pipe2IncrementIncrementAdd",
    input: "pipe2 numberIncrement numberIncrement numberAdd",
  },
  { name: "listOneTwoThree", input: "[1, 2, 3]" },
  { name: "stringHello", input: '"hello"' },
  { name: "booleanTrue", input: "true" },
  {
    name: "pipeOverApplyBasedCurry",
    input:
      'isLiteral = operatorPipe(apply(apply(operatorFlip, nbtGetString), "t"), apply(anyEquals, "l"))',
    format: "expanded",
  },
] as const;

const CODE = compileFixtures(FIXTURES);

const EXPECTED_STEPS: Record<(typeof FIXTURES)[number]["name"], number> = {
  addOneTwo: 3,
  concatAB: 3,
  addTrueTwo: 3,
  divideTenByZero: 3,
  multiplyAddOneTwoByThree: 5,
  partialAddOne: 3,
  flipNumberAdd: 2,
  invalidFlipNumberIncrement: 2,
  pipeIncrementMultiply: 3,
  pipe2IncrementIncrementAdd: 3,
  listOneTwoThree: 4,
  stringHello: 1,
  booleanTrue: 1,
  pipeOverApplyBasedCurry: 8,
};

for (const fixture of FIXTURES) {
  test(`testFullShotEveryStepFor${fixtureLabel(fixture.name)}`, async ({
    page,
  }) => {
    await openVisual(page, (await CODE)[fixture.name]);

    const shots = page.locator(".logic-programmer-shot");
    const count = await shots.count();
    expect(count).toBe(EXPECTED_STEPS[fixture.name]);

    for (let index = 0; index < count; index += 1) {
      await expect(shots.nth(index)).toHaveScreenshot(
        `${fixture.name}-step-${index}.png`
      );
    }
  });
}
