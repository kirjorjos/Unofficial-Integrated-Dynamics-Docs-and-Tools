OBJECT_ITEMSTACK_REPAIRCOST: {
    internalName: "integrateddynamics:itemstack_repaircost",
    nicknames: [
      "ItemstackRepaircost",
      "itemstack_repair_cost",
      "itemstackRepairCost",
      "repairCost"
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
    symbol: "repair_cost",
    interactName: "itemstackRepairCost",
    function: (item: Item): Integer => {
      return item.getRepairCost();
    },
  },