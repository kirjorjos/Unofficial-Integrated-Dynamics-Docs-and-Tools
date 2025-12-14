OBJECT_ITEMSTACK_FUELBURNTIME: {
    internalName: "integrateddynamics:itemstack_burntime",
    nicknames: [
      "ItemstackFuelburntime",
      "item_fuel_burn_time",
      "itemFuelBurnTime",
      "fuelBurnTime"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "burn_time",
    interactName: "itemstackBurnTime",
    function: (item: Item): Integer => {
      return item.getFuelBurnTime();
    },
  },