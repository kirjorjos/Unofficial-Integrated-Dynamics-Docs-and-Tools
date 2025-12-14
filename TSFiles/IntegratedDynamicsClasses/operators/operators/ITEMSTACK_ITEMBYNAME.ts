ITEMSTACK_ITEMBYNAME: {
    internalName: "integrateddynamics:itemstack_itembyname",
    nicknames: [
      "ItemstackByName",
      "itemstack_by_name",
      "itemstackByName",
      "item_by_name",
      "itemByName",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "Item",
      },
    },
    symbol: "item_by_name",
    interactName: "stringItemByName",
    function: (): never => {
      throw new Error(
        "Item by name is infeasible without a registry. This is a placeholder function."
      );
    },
  },