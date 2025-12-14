OBJECT_ITEMSTACK_ISFLUIDSTACK: {
    internalName: "integrateddynamics:itemstack_isfluidstack",
    nicknames: [
      "ItemstackIsfluidstack",
      "itemstack_is_fluidstack",
      "itemstackIsFluidstack",
      "itemHasFluid",
      "isFluidstack"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_fluidstack",
    interactName: "itemstackIsFluidStack",
    function: (item: Item): iBoolean => {
      return new iBoolean(item.getFluid() !== null);
    },
  },