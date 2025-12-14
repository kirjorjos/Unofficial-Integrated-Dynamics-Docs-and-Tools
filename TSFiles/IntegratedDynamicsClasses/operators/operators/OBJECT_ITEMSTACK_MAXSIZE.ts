OBJECT_ITEMSTACK_MAXSIZE: {
    internalName: "integrateddynamics:itemstack_maxsize",
    nicknames: ["ItemstackMaxsize", "itemstack_max_size", "itemstackMaxSize", "maxSize"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "maxsize",
    interactName: "itemstackMaxSize",
    function: (item: Item): Integer => {
      return item.getMaxSize();
    },
  },