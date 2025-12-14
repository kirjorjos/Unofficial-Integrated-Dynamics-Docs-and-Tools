OBJECT_ITEMSTACK_ISDATAEQUAL: {
    internalName: "integrateddynamics:itemstack_isnbtequal",
    nicknames: [
      "ItemstackIsdataequal",
      "itemstack_is_dataequal",
      "itemstackIsDataequal",
      "=NBT="
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
    symbol: "=NBT=",
    interactName: "itemstackIsNbtEqual",
    function: (item1: Item): TypeLambda<Item, Boolean> => {
      return (item2: Item): iBoolean => {
        return item1.getNBT().equals(item2.getNBT());
      };
    },
  },