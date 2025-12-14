OBJECT_ITEMSTACK_FLUIDSTACKCAPACITY: {
    internalName: "integrateddynamics:itemstack_fluidstackcapacity",
    nicknames: [
      "ItemstackFluidstackcapacity",
      "itemstack_fluidstack_capacity",
      "itemstackFluidstackCapacity",
      "item_fluid_capacity",
      "itemFluidCapacity",
      "item_fluidstack_capacity",
      "itemFluidstackCapacity",
      "fluidCapatity"
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
    symbol: "fluidstack_capacity",
    interactName: "itemstackFluidCapacity",
    function: (item: Item): Integer => {
      return item.getFluidCapacity();
    },
  },