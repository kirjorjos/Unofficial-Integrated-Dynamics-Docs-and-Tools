OBJECT_ITEMSTACK_STORED_FE: {
    internalName: "integrateddynamics:itemstack_storedfe",
    nicknames: [
      "ItemstackStoredfe",
      "itemstack_stored_fe",
      "itemstackStoredFe",
      "item_stored_fe",
      "itemStoredFe",
      "storedFe"
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
    symbol: "stored_fe",
    interactName: "itemstackFeStored",
    function: (item: Item): Integer => {
      return item.getFeStored();
    },
  },