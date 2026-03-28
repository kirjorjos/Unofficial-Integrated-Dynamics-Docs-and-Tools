import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { itemRegistry } from "lib/IntegratedDynamicsClasses/registries/itemRegistry";
import { fluidRegistry } from "lib/IntegratedDynamicsClasses/registries/fluidRegistry";
import { blockRegistry } from "lib/IntegratedDynamicsClasses/registries/blockRegistry";
import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";
import { Long } from "lib/JavaNumberClasses/Long";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { iNull } from "lib/IntegratedDynamicsClasses/typeWrappers/iNull";

/**
 * Test the different ingredients operators.
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

describe("TestIngredientsOperators", () => {
  let i0: Integer;
  let i1: Integer;
  let i2: Integer;
  let i3: Integer;

  let lItems: iArrayEager<Item>;
  let iEmpty: Ingredients;
  let iItems: Ingredients;
  let iFluids: Ingredients;
  let lFluids: iArrayEager<Fluid>;
  let iEnergies: Ingredients;
  let lEnergies: iArrayEager<Long>;
  let iMix: Ingredients;

  let iItem: Item;
  let iFluid: Fluid;
  let iEnergy: Long;

  let DUMMY_VARIABLE: iNull;

  beforeEach(() => {
    i0 = new Integer(0);
    i1 = new Integer(1);
    i2 = new Integer(2);
    i3 = new Integer(3);

    const iAir = new itemRegistry.items["minecraft:air"]();
    const iBoat = new itemRegistry.items["minecraft:oak_boat"]();
    const iStone = new itemRegistry.items["minecraft:stone"]();

    iEmpty = new Ingredients();
    iItems = new Ingredients(new iArrayEager([iAir, iBoat, iStone, iAir]));

    lItems = new iArrayEager([iAir, iBoat, iStone, iAir]);

    const fLava = new fluidRegistry.items["minecraft:lava"]({
      amount: new Integer(1000),
    });
    const fWater = new fluidRegistry.items["minecraft:water"]({
      amount: new Integer(125),
    });

    iFluids = new Ingredients(
      new iArrayEager([]),
      new iArrayEager([fLava, fWater])
    );
    lFluids = new iArrayEager([fLava, fWater]);

    iEnergies = new Ingredients(
      new iArrayEager([]),
      new iArrayEager([]),
      new iArrayEager([new Long(666), new Long(777), new Long(0)])
    );
    lEnergies = new iArrayEager([new Long(666), new Long(777), new Long(0)]);

    iMix = new Ingredients(
      new iArrayEager([iBoat, iStone]),
      new iArrayEager([fWater]),
      new iArrayEager([new Long(777)])
    );

    iItem = new itemRegistry.items["minecraft:apple"]();
    iFluid = new fluidRegistry.items["minecraft:water"]({
      amount: new Integer(123),
    });
    iEnergy = new Long(123);

    DUMMY_VARIABLE = new iNull();
  });

  it("testConsistencyData", () => {
    expect(iEmpty).toBeDefined();
    expect(iItems).toBeDefined();
  });

  /**
   * ----------------------------------- ITEMS -----------------------------------
   */

  it("testItems", () => {
    const res1 = new operatorRegistry.INGREDIENTS_ITEMS().evaluate(iMix);
    expect(res1).toBeInstanceOf(iArrayEager);
    expect((res1 as iArrayEager<Item>).size().toJSNumber()).toBe(2);
    expect(
      ((res1 as iArrayEager<Item>).get(i0) as Item).getName().valueOf()
    ).toBe("Oak Boat");
    expect(
      ((res1 as iArrayEager<Item>).get(i1) as Item).getName().valueOf()
    ).toBe("Stone");
  });

  it("testItemsSizeLarge", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_ITEMS().evaluate(iMix, i0);
    }).toThrow();
  });

  it("testItemsSizeSmall", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_ITEMS().evaluate();
    }).toThrow();
  });

  it("testItemsSize", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_ITEMS().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- FLUIDS -----------------------------------
   */

  it("testFluids", () => {
    const res1 = new operatorRegistry.INGREDIENTS_FLUIDS().evaluate(iFluids);
    expect(res1).toBeInstanceOf(iArrayEager);
    expect((res1 as iArrayEager<Fluid>).size().toJSNumber()).toBe(2);

    const fLava = new fluidRegistry.items["minecraft:lava"]({
      amount: new Integer(1000),
    });
    const fWater = new fluidRegistry.items["minecraft:water"]({
      amount: new Integer(125),
    });
    const expected = new iArrayEager([fLava, fWater]);

    expect((res1 as iArrayEager<Fluid>).equals(expected).valueOf()).toBe(true);
  });

  it("testFluidsSizeLarge", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_FLUIDS().evaluate(iMix, i0);
    }).toThrow();
  });

  it("testFluidsSizeSmall", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_FLUIDS().evaluate();
    }).toThrow();
  });

  it("testFluidsSize", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_FLUIDS().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- ENERGIES -----------------------------------
   */

  it("testEnergies", () => {
    const res1 = new operatorRegistry.INGREDIENTS_ENERGIES().evaluate(
      iEnergies
    );
    expect(res1).toBeInstanceOf(iArrayEager);
    expect((res1 as iArrayEager<Long>).size().toJSNumber()).toBe(3);
    expect(((res1 as iArrayEager<Long>).get(i0) as Long).toJSNumber()).toBe(
      666
    );
    expect(((res1 as iArrayEager<Long>).get(i1) as Long).toJSNumber()).toBe(
      777
    );
    expect(((res1 as iArrayEager<Long>).get(i2) as Long).toJSNumber()).toBe(0);
  });

  it("testEnergiesSizeLarge", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_ENERGIES().evaluate(iMix, i0);
    }).toThrow();
  });

  it("testEnergiesSizeSmall", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_ENERGIES().evaluate();
    }).toThrow();
  });

  it("testEnergiesSize", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_ENERGIES().evaluate(DUMMY_VARIABLE);
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_ITEM -----------------------------------
   */

  it("testWithItem", () => {
    const res1 = new operatorRegistry.INGREDIENTS_WITH_ITEM().evaluate(
      iMix,
      i0,
      iItem
    );
    expect(res1).toBeInstanceOf(Ingredients);
    const outputIngredients1 = res1 as Ingredients;
    const outputList1 = outputIngredients1.getItems();
    expect(outputList1.size().toJSNumber()).toBe(2);
    expect((outputList1.get(i0) as Item).getName().valueOf()).toBe("Apple");
    expect((outputList1.get(i1) as Item).getName().valueOf()).toBe("Stone");

    expect(outputIngredients1.getItems().size().toJSNumber()).toBe(
      iMix.getItems().size().toJSNumber()
    );
    expect(
      outputIngredients1
        .getItems()
        .get(i0)
        .equals(iMix.getItems().get(i0))
        .valueOf()
    ).toBe(false);
    expect(
      outputIngredients1
        .getItems()
        .get(i1)
        .equals(iMix.getItems().get(i1))
        .valueOf()
    ).toBe(true);
    expect(
      outputIngredients1.getFluids().equals(iMix.getFluids()).valueOf()
    ).toBe(true);
    expect(
      outputIngredients1.getEnergies().equals(iMix.getEnergies()).valueOf()
    ).toBe(true);

    const res2 = new operatorRegistry.INGREDIENTS_WITH_ITEM().evaluate(
      iMix,
      i2,
      iItem
    );
    expect(res2).toBeInstanceOf(Ingredients);
    const outputIngredients2 = res2 as Ingredients;
    const outputList2 = outputIngredients2.getItems();
    expect(outputList2.size().toJSNumber()).toBe(3);
    expect((outputList2.get(i0) as Item).getName().valueOf()).toBe("Oak Boat");
    expect((outputList2.get(i1) as Item).getName().valueOf()).toBe("Stone");
    expect((outputList2.get(i2) as Item).getName().valueOf()).toBe("Apple");

    expect(outputIngredients2.getItems().size().toJSNumber()).not.toBe(
      iMix.getItems().size().toJSNumber()
    );
    expect(
      outputIngredients2
        .getItems()
        .get(i0)
        .equals(iMix.getItems().get(i0))
        .valueOf()
    ).toBe(true);
    expect(
      outputIngredients2
        .getItems()
        .get(i1)
        .equals(iMix.getItems().get(i1))
        .valueOf()
    ).toBe(true);
    expect(
      outputIngredients2.getFluids().equals(iMix.getFluids()).valueOf()
    ).toBe(true);
    expect(
      outputIngredients2.getEnergies().equals(iMix.getEnergies()).valueOf()
    ).toBe(true);
  });

  it("testWithItemSizeLarge", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_ITEM().evaluate(
        iMix,
        i0,
        iItem,
        iItem
      );
    }).toThrow();
  });

  it("testWithItemSizeSmall", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_ITEM().evaluate(iMix, i0);
    }).toThrow();
  });

  it("testWithItemSize", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_ITEM().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_FLUID -----------------------------------
   */

  it("testWithFluid", () => {
    const res1 = new operatorRegistry.INGREDIENTS_WITH_FLUID().evaluate(
      iMix,
      i0,
      iFluid
    );
    expect(res1).toBeInstanceOf(Ingredients);
    const outputIngredients1 = res1 as Ingredients;
    const outputList1 = outputIngredients1.getFluids();
    expect(outputList1.size().toJSNumber()).toBe(1);
    expect((outputList1.get(i0) as Fluid).getUniqueName().valueOf()).toBe(
      "minecraft:water (123)"
    );

    expect(outputIngredients1.getFluids().size().toJSNumber()).toBe(
      iMix.getFluids().size().toJSNumber()
    );
    expect(
      outputIngredients1
        .getFluids()
        .get(i0)
        .equals(iMix.getFluids().get(i0))
        .valueOf()
    ).toBe(false);
    expect(
      outputIngredients1.getItems().equals(iMix.getItems()).valueOf()
    ).toBe(true);
    expect(
      outputIngredients1.getEnergies().equals(iMix.getEnergies()).valueOf()
    ).toBe(true);

    const res2 = new operatorRegistry.INGREDIENTS_WITH_FLUID().evaluate(
      iMix,
      i2,
      iFluid
    );
    expect(res2).toBeInstanceOf(Ingredients);
    const outputIngredients2 = res2 as Ingredients;
    const outputList2 = outputIngredients2.getFluids();
    expect(outputList2.size().toJSNumber()).toBe(3);
    expect((outputList2.get(i0) as Fluid).getUniqueName().valueOf()).toBe(
      "minecraft:water (125)"
    );
    expect((outputList2.get(i1) as Fluid).getUniqueName().valueOf()).toBe("");
    expect((outputList2.get(i2) as Fluid).getUniqueName().valueOf()).toBe(
      "minecraft:water (123)"
    );

    expect(outputIngredients2.getFluids().size().toJSNumber()).not.toBe(
      iMix.getFluids().size().toJSNumber()
    );
    expect(
      outputIngredients2.getItems().equals(iMix.getItems()).valueOf()
    ).toBe(true);
    expect(
      outputIngredients2.getEnergies().equals(iMix.getEnergies()).valueOf()
    ).toBe(true);
  });

  it("testWithFluidSizeLarge", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_FLUID().evaluate(
        iMix,
        i0,
        iFluid,
        iFluid
      );
    }).toThrow();
  });

  it("testWithFluidSizeSmall", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_FLUID().evaluate(iMix, i0);
    }).toThrow();
  });

  it("testWithFluidSize", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_FLUID().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_ENERGY -----------------------------------
   */

  it("testWithEnergy", () => {
    const res1 = new operatorRegistry.INGREDIENTS_WITH_ENERGY().evaluate(
      iMix,
      i0,
      iEnergy
    );
    expect(res1).toBeInstanceOf(Ingredients);
    const outputIngredients1 = res1 as Ingredients;
    const outputList1 = outputIngredients1.getEnergies();
    expect(outputList1.size().toJSNumber()).toBe(1);
    expect((outputList1.get(i0) as Long).toJSNumber()).toBe(123);

    expect(outputIngredients1.getEnergies().size().toJSNumber()).toBe(
      iMix.getEnergies().size().toJSNumber()
    );
    expect(
      outputIngredients1
        .getEnergies()
        .get(i0)
        .equals(iMix.getEnergies().get(i0))
        .valueOf()
    ).toBe(false);
    expect(
      outputIngredients1.getItems().equals(iMix.getItems()).valueOf()
    ).toBe(true);
    expect(
      outputIngredients1.getFluids().equals(iMix.getFluids()).valueOf()
    ).toBe(true);

    const res2 = new operatorRegistry.INGREDIENTS_WITH_ENERGY().evaluate(
      iMix,
      i2,
      iEnergy
    );
    expect(res2).toBeInstanceOf(Ingredients);
    const outputIngredients2 = res2 as Ingredients;
    const outputList2 = outputIngredients2.getEnergies();
    expect(outputList2.size().toJSNumber()).toBe(3);
    expect((outputList2.get(i0) as Long).toJSNumber()).toBe(777);
    expect((outputList2.get(i1) as Long).toJSNumber()).toBe(0);
    expect((outputList2.get(i2) as Long).toJSNumber()).toBe(123);

    expect(outputIngredients2.getEnergies().size().toJSNumber()).not.toBe(
      iMix.getEnergies().size().toJSNumber()
    );
    expect(
      outputIngredients2.getItems().equals(iMix.getItems()).valueOf()
    ).toBe(true);
    expect(
      outputIngredients2.getFluids().equals(iMix.getFluids()).valueOf()
    ).toBe(true);
  });

  it("testWithEnergySizeLarge", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_ENERGY().evaluate(
        iMix,
        i0,
        iEnergy,
        iEnergy
      );
    }).toThrow();
  });

  it("testWithEnergySizeSmall", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_ENERGY().evaluate(iMix, i0);
    }).toThrow();
  });

  it("testWithEnergySize", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_ENERGY().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_ITEMS -----------------------------------
   */

  it("testWithItems", () => {
    const res1 = new operatorRegistry.INGREDIENTS_WITH_ITEMS().evaluate(
      iMix,
      lItems
    );
    expect(res1).toBeInstanceOf(Ingredients);
    const outputIngredients1 = res1 as Ingredients;
    const outputList1 = outputIngredients1.getItems();
    expect(outputList1.size().toJSNumber()).toBe(4);
    expect((outputList1.get(i0) as Item).getName().valueOf()).toBe("Air");
    expect((outputList1.get(i1) as Item).getName().valueOf()).toBe("Oak Boat");
    expect((outputList1.get(i2) as Item).getName().valueOf()).toBe("Stone");
    expect((outputList1.get(i3) as Item).getName().valueOf()).toBe("Air");

    expect(
      outputIngredients1.getFluids().equals(iMix.getFluids()).valueOf()
    ).toBe(true);
    expect(
      outputIngredients1.getEnergies().equals(iMix.getEnergies()).valueOf()
    ).toBe(true);
  });

  it("testWithItemsSizeLarge", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_ITEMS().evaluate(
        iMix,
        lItems,
        lItems
      );
    }).toThrow();
  });

  it("testWithItemsSizeSmall", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_ITEMS().evaluate(iMix);
    }).toThrow();
  });

  it("testWithItemsSize", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_ITEMS().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_FLUIDS -----------------------------------
   */

  it("testWithFluids", () => {
    const res1 = new operatorRegistry.INGREDIENTS_WITH_FLUIDS().evaluate(
      iMix,
      lFluids
    );
    expect(res1).toBeInstanceOf(Ingredients);
    const outputIngredients1 = res1 as Ingredients;
    const outputList1 = outputIngredients1.getFluids();
    expect(outputList1.size().toJSNumber()).toBe(2);

    const fLava = new fluidRegistry.items["minecraft:lava"]({
      amount: new Integer(1000),
    });
    const fWater = new fluidRegistry.items["minecraft:water"]({
      amount: new Integer(125),
    });
    const expected = new iArrayEager([fLava, fWater]);

    expect(outputList1.equals(expected).valueOf()).toBe(true);

    expect(
      outputIngredients1.getItems().equals(iMix.getItems()).valueOf()
    ).toBe(true);
    expect(
      outputIngredients1.getEnergies().equals(iMix.getEnergies()).valueOf()
    ).toBe(true);
  });

  it("testWithFluidsSizeLarge", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_FLUIDS().evaluate(
        iMix,
        lFluids,
        lFluids
      );
    }).toThrow();
  });

  it("testWithFluidsSizeSmall", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_FLUIDS().evaluate(iMix);
    }).toThrow();
  });

  it("testWithFluidsSize", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_FLUIDS().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });

  /**
   * ----------------------------------- WITH_ENERGIES -----------------------------------
   */

  it("testWithEnergies", () => {
    const res1 = new operatorRegistry.INGREDIENTS_WITH_ENERGIES().evaluate(
      iMix,
      lEnergies
    );
    expect(res1).toBeInstanceOf(Ingredients);
    const outputIngredients1 = res1 as Ingredients;
    const outputList1 = outputIngredients1.getEnergies();
    expect(outputList1.size().toJSNumber()).toBe(3);
    expect((outputList1.get(i0) as Long).toJSNumber()).toBe(666);
    expect((outputList1.get(i1) as Long).toJSNumber()).toBe(777);
    expect((outputList1.get(i2) as Long).toJSNumber()).toBe(0);

    expect(
      outputIngredients1.getItems().equals(iMix.getItems()).valueOf()
    ).toBe(true);
    expect(
      outputIngredients1.getFluids().equals(iMix.getFluids()).valueOf()
    ).toBe(true);
  });

  it("testWithEnergiesSizeLarge", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_ENERGIES().evaluate(
        iMix,
        lEnergies,
        lEnergies
      );
    }).toThrow();
  });

  it("testWithEnergiesSizeSmall", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_ENERGIES().evaluate(iMix);
    }).toThrow();
  });

  it("testWithEnergiesSize", () => {
    expect(() => {
      new operatorRegistry.INGREDIENTS_WITH_ENERGIES().evaluate(
        DUMMY_VARIABLE,
        DUMMY_VARIABLE
      );
    }).toThrow();
  });
});
