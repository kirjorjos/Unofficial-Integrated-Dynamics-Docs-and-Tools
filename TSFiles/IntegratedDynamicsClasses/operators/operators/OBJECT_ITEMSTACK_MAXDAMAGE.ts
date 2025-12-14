OBJECT_ITEMSTACK_MAXDAMAGE: {
    internalName: "integrateddynamics:itemstack_maxdamage",
    nicknames: [
      "ItemstackMaxdamage",
      "itemstack_max_damage",
      "itemstackMaxDamage",
      "maxDamage"
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
    symbol: "max_damage",
    interactName: "itemstackMaxDamage",
    function: (item: Item): Integer => {
      return item.getMaxDamage();
    },
  },