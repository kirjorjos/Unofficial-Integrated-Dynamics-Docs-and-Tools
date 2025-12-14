OBJECT_ITEMSTACK_RARITY: {
    internalName: "integrateddynamics:itemstack_rarity",
    nicknames: ["ItemstackRarity", "itemstack_rarity", "itemstackRarity", "rarity"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "String",
      },
    },
    symbol: "rarity",
    interactName: "itemstackRarity",
    function: (item: Item): string => {
      return item.getRarity();
    },
  },