OBJECT_ITEMSTACK_NBT: {
    internalName: "integrateddynamics:itemstack_nbt",
    nicknames: [
      "ItemstackNbt",
      "itemstack_nbt",
      "itemstackNBT",
      "itemNBT"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "nbt",
    interactName: "itemStackNBT",
    function: (item: Item): Tag<IntegratedValue> => {
      return item.getNBT();
    },
  },