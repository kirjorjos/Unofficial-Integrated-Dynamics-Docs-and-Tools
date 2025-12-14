STRING_TAG: {
    internalName: "integrateddynamics:string_tag",
    nicknames: [
      "ItemstackTagStacks",
      "itemstack_tag_values",
      "itemstackTagValues",
      "item_tag_names",
      "itemTagNames",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: { type: "List", listType: { type: "Item" } },
    },
    symbol: "item_tag_values",
    interactName: "stringItemsByTag",
    function: (): never => {
      throw new Error(
        "Item tag values is infeasible without a registry. This is a placeholder function."
      );
    },
  },