ITEMSTACK_DATAVALUE: {
    internalName: "integrateddynamics:itemstack_datavalue",
    nicknames: [
      "ItemstackDataValue",
      "itemstack_data_value",
      "itemstackDataValue",
      "item_data_value",
      "itemDataValue",
      "itemNBTValue"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "NBT",
        },
      },
    },
    symbol: "data_value",
    interactName: "itemstackDataValue",
    function: (item: Item): TypeLambda<iString, Tag<IntegratedValue>> => {
      return (key: iString): Tag<IntegratedValue> => {
        const nbt = item.getNBT();
        if (!nbt || !nbt.has(key)) {
          return new NullTag();
        }
        return nbt.get(key);
      };
    },
  },