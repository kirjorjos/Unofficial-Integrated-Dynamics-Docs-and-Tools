OBJECT_ITEMSTACK_INVENTORYSIZE: {
    internalName: "integrateddynamics:itemstack_inventorysize",
    nicknames: [
      "ItemstackInventorysize",
      "itemstack_inventory_size",
      "itemstackInventorySize",
      "item_inventory_size",
      "itemInventorySize",
      "inventorySize"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "inventory_size",
    interactName: "itemstackInventorySize",
    function: (item: Item): Integer => {
      return new Integer(item.getInventory()?.length || 0);
    },
  },