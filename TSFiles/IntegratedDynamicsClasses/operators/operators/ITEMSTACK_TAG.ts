ITEMSTACK_TAG: {
    internalName: "integrateddynamics:itemstack_tag",
    nicknames: [
      "ItemstackTag",
      "itemstack_tag_names",
      "itemstackTagNames",
      "item_tag_names",
      "itemTagNames",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: { type: "List", listType: { type: "String" } },
    },
    symbol: "item_tag_names",
    interactName: "itemstackTags",
    function: (item: Item): string[] => {
      return item.getTagNames();
    },
  },