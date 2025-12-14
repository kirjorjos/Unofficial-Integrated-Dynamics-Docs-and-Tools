OBJECT_ITEMSTACK_WITHSIZE: {
    internalName: "integrateddynamics:itemstack_withsize",
    nicknames: [
      "ItemstackWithSize",
      "itemstack_with_size",
      "itemstackWithSize",
      "itemWithSize"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Function",
        from: {
          type: "Integer",
        },
        to: {
          type: "Item",
        },
      },
    },
    symbol: "with_size",
    interactName: "itemstackWithSize",
    function: (item: Item): TypeLambda<Integer, Item> => {
      return (size: Integer): Item => {
        return new Item(new Properties({size}), item);
      };
    },
  },