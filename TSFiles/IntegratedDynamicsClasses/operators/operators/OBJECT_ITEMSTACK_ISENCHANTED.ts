OBJECT_ITEMSTACK_ISENCHANTED: {
    internalName: "integrateddynamics:itemstack_enchanted",
    nicknames: [
      "ItemstackIsenchanted",
      "itemstack_is_enchanted",
      "itemstackIsEnchanted",
      "isEnchanted",
      "enchanted"
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
    symbol: "enchanted",
    interactName: "itemstackIsEnchanted",
    function: (item: Item): iBoolean => {
      return item.isEnchanted();
    },
  },