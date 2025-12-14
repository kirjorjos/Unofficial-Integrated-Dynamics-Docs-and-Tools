OBJECT_ITEMSTACK_TAG_STACKS: {
    internalName: "integrateddynamics:itemstack_tags",
    nicknames: [
      "ItemstackTags",
      "itemstack_tag_values",
      "itemstackTagValues",
      "item_tag_names",
      "itemTagNames"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "List",
        listType: {
          type: "String",
        },
      },
    },
    symbol: "item_tag_val",
    interactName: "itemstackTagVal",
    function: (item: Item): Array<string> => {
      return item.getTagNames();
    },
  },