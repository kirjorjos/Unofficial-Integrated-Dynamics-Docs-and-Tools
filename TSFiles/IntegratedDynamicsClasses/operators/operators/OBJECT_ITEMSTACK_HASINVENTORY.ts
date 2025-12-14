OBJECT_ITEMSTACK_HASINVENTORY: {
    internalName: "integrateddynamics:itemstack_hasinventory",
    nicknames: [
      "ItemstackHasinventory",
      "itemstack_has_inventory",
      "itemstackHasInventory",
      "hasInventory"
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
    symbol: "has_inventory",
    interactName: "itemstackHasInventory",
    function: (item: Item): iBoolean => {
      return new iBoolean(item.getInventory().length != 0);
    },
  },