OBJECT_ITEMSTACK_ISRAWITEMEQUAL: {
    internalName: "integrateddynamics:itemstack_israwitemequal",
    nicknames: [
      "ItemstackIsrawitemequal",
      "itemstack_is_rawitemequal",
      "itemstackIsRawitemequal",
      "rawItemEquals"
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
    symbol: "=Raw=",
    interactName: "itemstackIsEqualRaw",
    function: (item1: Item): TypeLambda<Item, iBoolean> => {
      return (item2: Item): iBoolean => {
        return new iBoolean(item1.getUniqueName() === item2.getUniqueName());
      };
    },
  },