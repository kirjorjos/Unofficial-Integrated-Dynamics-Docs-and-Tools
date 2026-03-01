import { operatorRegistry } from "IntegratedDynamicsClasses/registries/operatorRegistry";
import { itemRegistry } from "IntegratedDynamicsClasses/registries/itemRegistry";
import { fluidRegistry } from "IntegratedDynamicsClasses/registries/fluidRegistry";
import { blockRegistry } from "IntegratedDynamicsClasses/registries/blockRegistry";
import { Ingredients } from "../../IntegratedDynamicsClasses/Ingredients";
import { Recipe } from "../../IntegratedDynamicsClasses/Recipe";
import { Long } from "../../JavaNumberClasses/Long";
import { Integer } from "../../JavaNumberClasses/Integer";
import { iArrayEager } from "../../IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { iNull } from "../../IntegratedDynamicsClasses/typeWrappers/iNull";

/**
 * Test the different recipe operators.
 * Transpiled from github.com/CyclopsMC/IntegratedDynamics with minimal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

// Mock the CyclopsCoreInstance
const CyclopsCoreInstance = { MOD: {} };
class ModBaseMocked {}
CyclopsCoreInstance.MOD = new ModBaseMocked();
itemRegistry.load();
fluidRegistry.load();
blockRegistry.load();

describe("TestRecipeOperators", () => {
  let rMain: Recipe;
  let iMainOut: Ingredients;
  let iItems: Ingredients;
  let DUMMY_VARIABLE: iNull;

  beforeEach(() => {
    const iAir = new itemRegistry.items["minecraft:air"]();
    const iBoat = new itemRegistry.items["minecraft:oak_boat"]();
    const iStone = new itemRegistry.items["minecraft:stone"]();

    const iMainIn = new Ingredients(
      new iArrayEager([iAir, iBoat, iStone, iAir])
    );

    const fWater = new fluidRegistry.items["minecraft:water"]({
      amount: new Integer(123),
    });
    iMainOut = new Ingredients(
      new iArrayEager([iBoat, iStone]),
      new iArrayEager([fWater]),
      new iArrayEager([new Long(777)])
    );

    rMain = new Recipe(iMainIn, iMainOut);

    const iPickaxe = new itemRegistry.items["minecraft:diamond_pickaxe"]();
    const iDoor = new itemRegistry.items["minecraft:oak_door"]();
    iItems = new Ingredients(new iArrayEager([iPickaxe, iDoor, iAir]));

    DUMMY_VARIABLE = new iNull();
  });

  /**
   * ----------------------------------- INPUT -----------------------------------
   */

  it("testInput", () => {
    const res1 = new operatorRegistry.RECIPE_INPUT().evaluate(rMain);
    expect(res1).toBeInstanceOf(Ingredients);
    expect(res1.equals(rMain.getInput()).valueOf()).toBe(true);
  });

  it("testInputSizeLarge", () => {
    expect(() => {
      new operatorRegistry.RECIPE_INPUT().evaluate(rMain, rMain);
    }).toThrow();
  });

  it("testInputSizeSmall", () => {
    expect(() => {
      new operatorRegistry.RECIPE_INPUT().evaluate();
    }).toThrow();
  });

  it("testInputSize", () => {
    expect(() => {
      new operatorRegistry.RECIPE_INPUT().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- OUTPUT -----------------------------------
   */

  it("testOutput", () => {
    const res1 = new operatorRegistry.RECIPE_OUTPUT().evaluate(rMain);
    expect(res1).toBeInstanceOf(Ingredients);
    expect(res1.equals(iMainOut).valueOf()).toBe(true);
  });

  it("testOutputSizeLarge", () => {
    expect(() => {
      new operatorRegistry.RECIPE_OUTPUT().evaluate(rMain, rMain);
    }).toThrow();
  });

  it("testOutputSizeSmall", () => {
    expect(() => {
      new operatorRegistry.RECIPE_OUTPUT().evaluate();
    }).toThrow();
  });

  it("testOutputSize", () => {
    expect(() => {
      new operatorRegistry.RECIPE_OUTPUT().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_INPUT -----------------------------------
   */

  it("testWithInput", () => {
    const res1 = new operatorRegistry.RECIPE_WITH_INPUT().evaluate(
      rMain,
      iItems
    );
    expect(res1).toBeInstanceOf(Recipe);
    const expected = new Recipe(iItems, iMainOut);
    expect(res1.equals(expected).valueOf()).toBe(true);
  });

  it("testWithInputSizeLarge", () => {
    expect(() => {
      new operatorRegistry.RECIPE_WITH_INPUT().evaluate(rMain, iItems, rMain);
    }).toThrow();
  });

  it("testWithInputSizeSmall", () => {
    expect(() => {
      new operatorRegistry.RECIPE_WITH_INPUT().evaluate(rMain);
    }).toThrow();
  });

  it("testWithInputSize", () => {
    expect(() => {
      new operatorRegistry.RECIPE_WITH_INPUT().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_OUTPUT -----------------------------------
   */

  it("testWithOutput", () => {
    const res1 = new operatorRegistry.RECIPE_WITH_OUTPUT().evaluate(
      rMain,
      iItems
    );
    expect(res1).toBeInstanceOf(Recipe);
    const expected = new Recipe(rMain.getInput(), iItems);
    expect(res1.equals(expected).valueOf()).toBe(true);
  });

  it("testWithOutputSizeLarge", () => {
    expect(() => {
      new operatorRegistry.RECIPE_WITH_OUTPUT().evaluate(rMain, iItems, rMain);
    }).toThrow();
  });

  it("testWithOutputSizeSmall", () => {
    expect(() => {
      new operatorRegistry.RECIPE_WITH_OUTPUT().evaluate(rMain);
    }).toThrow();
  });

  it("testWithOutputSize", () => {
    expect(() => {
      new operatorRegistry.RECIPE_WITH_OUTPUT().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_INPUT_OUTPUT -----------------------------------
   */

  it("testWithInputOutput", () => {
    const res1 = new operatorRegistry.RECIPE_WITH_INPUT_OUTPUT().evaluate(
      iItems,
      iMainOut
    );
    expect(res1).toBeInstanceOf(Recipe);
    const expected = new Recipe(iItems, iMainOut);
    expect(res1.equals(expected).valueOf()).toBe(true);
  });

  it("testWithInputOutputSizeLarge", () => {
    expect(() => {
      new operatorRegistry.RECIPE_WITH_INPUT_OUTPUT().evaluate(
        iItems,
        iMainOut,
        rMain
      );
    }).toThrow();
  });

  it("testWithInputOutputSizeSmall", () => {
    expect(() => {
      new operatorRegistry.RECIPE_WITH_INPUT_OUTPUT().evaluate(iItems);
    }).toThrow();
  });

  it("testWithInputOutputSize", () => {
    expect(() => {
      new operatorRegistry.RECIPE_WITH_INPUT_OUTPUT().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });
});
