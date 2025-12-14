OBJECT_ITEMSTACK_FLUIDSTACK: {
    internalName: "integrateddynamics:itemstack_fluidstack",
    nicknames: [
      "ItemstackFluidstack",
      "itemstack_fluidstack",
      "itemstackFluidstack",
      "itemFluidstack",
      "item_fluidstack",
      "itemFluid",
      "item_fluid",
      "itemstack_fluid",
      "itemstackFluid",
      "itemFluid"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Fluid",
      },
    },
    symbol: "fluidstack",
    interactName: "itemstackFluidStack",
    function: (item: Item): Fluid => {
      return item.getFluid();
    },
  },