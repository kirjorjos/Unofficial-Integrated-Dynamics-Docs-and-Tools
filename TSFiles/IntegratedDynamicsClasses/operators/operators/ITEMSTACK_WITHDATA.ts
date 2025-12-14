ITEMSTACK_WITHDATA: {
    internalName: "integrateddynamics:itemstack_withdata",
    nicknames: [
      "ItemstackWithData",
      "itemstack_with_data",
      "itemstackWithData",
      "item_with_data",
      "itemWithData",
      "itemWithNBT",
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
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Item",
          },
        },
      },
    },
    symbol: "with_data",
    interactName: "itemstackWithData",
    function: (
      item: Item
    ): TypeLambda<string, TypeLambda<CompoundTag, Item>> => {
      return (key: string): TypeLambda<CompoundTag, Item> => {
        return (value: CompoundTag): Item => {
          let nbt = item.getNBT() || {};
          nbt = nbt.set(key, value);
          return new Item(new Properties({ nbt }), item);
        };
      };
    },
  },