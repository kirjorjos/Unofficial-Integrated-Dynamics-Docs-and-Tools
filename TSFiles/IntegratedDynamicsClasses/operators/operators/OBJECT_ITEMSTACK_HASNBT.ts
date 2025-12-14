OBJECT_ITEMSTACK_HASNBT: {
    internalName: "integrateddynamics:itemstack_hasnbt",
    nicknames: [
      "ItemstackHasnbt",
      "itemstack_has_nbt",
      "itemstackHasNBT",
      "hasNBT"
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
    symbol: "has_nbt",
    interactName: "itemStackHasNBT",
    function: (item: Item): iBoolean => {
      return new iBoolean(item.getNBT().getType() != Tag.TAG_NULL);
    },
  },