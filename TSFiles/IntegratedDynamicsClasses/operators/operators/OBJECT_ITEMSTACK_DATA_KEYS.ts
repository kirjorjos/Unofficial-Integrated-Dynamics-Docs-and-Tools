OBJECT_ITEMSTACK_DATA_KEYS: {
    internalName: "integrateddynamics:itemstack_datakeys",
    nicknames: [
      "ItemstackDatakeys",
      "itemstack_data_keys",
      "itemstackDataKeys",
      "itemNBTKeys"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: { type: "List", listType: { type: "String" } },
    },
    symbol: "data_keys",
    interactName: "itemStackDataKeys",
    function: (item: Item): Array<iString> => {
      return item.getNBT().getAllKeys();
    },
  },