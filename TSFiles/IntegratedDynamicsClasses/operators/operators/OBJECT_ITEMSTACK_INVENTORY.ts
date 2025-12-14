OBJECT_ITEMSTACK_INVENTORY: {
    internalName: "integrateddynamics:itemstack_inventory",
    nicknames: [
      "ItemstackInventory",
      "itemstack_inventory",
      "itemstackInventory",
      "item_inventory",
      "itemInventory"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: { type: "List", listType: { type: "Item" } },
    },
    symbol: "inventory",
    interactName: "itemstackInventory",
    function: (item: Item): Array<IntegratedValue> => {
      return item.getInventory();
    },
  },