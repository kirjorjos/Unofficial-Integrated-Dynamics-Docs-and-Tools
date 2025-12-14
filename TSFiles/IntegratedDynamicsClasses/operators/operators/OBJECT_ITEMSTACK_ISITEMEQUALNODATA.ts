OBJECT_ITEMSTACK_ISITEMEQUALNODATA: {
    internalName: "integrateddynamics:itemstack_isitemequalnonbt",
    nicknames: [
      "ItemstackIsitemequalnodata",
      "itemstack_is_itemequalnodata",
      "itemstackIsItemequalnodata",
      "=NoNBT="
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Function",
        from: {
          type: "Item",
        },
        to: {
          type: "Boolean",
        },
      },
    },
    symbol: "=NoNBT=",
    interactName: "itemstackIsNbtEqual",
    function: (item1: Item): TypeLambda<Item, iBoolean> => {
      return (item2: Item): iBoolean => {
        return new iBoolean(
          item1.getUniqueName() === item2.getUniqueName() &&
          item1.getSize() === item2.getSize()
        );
      };
    },
  },