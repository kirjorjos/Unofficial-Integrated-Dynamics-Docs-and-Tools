OBJECT_ITEMSTACK_SIZE: {
    internalName: "integrateddynamics:itemstack_size",
    nicknames: ["ItemstackSize", "itemstack_size", "itemstackSize", "size"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "size",
    interactName: "itemstackSize",
    function: (item: Item): Integer => {
      return item.getSize();
    },
  },