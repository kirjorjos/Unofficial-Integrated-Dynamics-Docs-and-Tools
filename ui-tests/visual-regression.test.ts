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
] as const;

const CODE = compileFixtures(FIXTURES);

for (const fixture of FIXTURES) {
  test(`testCardCompositesFor${fixtureLabel(fixture.name)}`, async ({
    page,
  }) => {
    await openVisual(page, (await CODE)[fixture.name]);

    const shots = page.locator(".logic-programmer-shot");
    const count = await shots.count();

    for (let index = 0; index < count; index += 1) {
      const shot = shots.nth(index);

      const outputCard = shot.locator(".logic-write-card-composite");
      await expect(outputCard).toHaveCount(1);
      await expect(outputCard.first()).toHaveScreenshot(
        `${fixture.name}-step-${index}-output-card.png`
      );

      const slotCards = shot.locator(".logic-slot-card-composite");
      const slotCount = await slotCards.count();
      for (let slot = 0; slot < slotCount; slot += 1) {
        await expect(slotCards.nth(slot)).toHaveScreenshot(
          `${fixture.name}-step-${index}-input-slot-${slot}.png`
        );
      }
    }
  });
}
