OBJECT_ITEMSTACK_ISSTACKABLE: {
    internalName: "integrateddynamics:itemstack_stackable",
    nicknames: [
      "ItemstackIsstackable",
      "itemstack_is_stackable",
      "itemstackIsStackable",
      "isStackable"
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
    symbol: "stackable",
    interactName: "itemstackIsStackable",
    function: (item: Item): iBoolean => {
      return item.isStackable();
    },
  },