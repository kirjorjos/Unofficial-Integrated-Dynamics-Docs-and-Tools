ITEMSTACK_TOOLTIP: {
    internalName: "integrateddynamics:itemstack_tooltip",
    nicknames: [
      "ItemstackTooltip",
      "itemstack_tooltip",
      "itemstackTooltip",
      "item_tooltip",
      "itemTooltip",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: { type: "List", listType: { type: "String" } },
    },
    symbol: "tooltip",
    interactName: "itemstackTooltip",
    function: (item: Item): Array<string> => {
      return item.getTooltip();
    },
  },