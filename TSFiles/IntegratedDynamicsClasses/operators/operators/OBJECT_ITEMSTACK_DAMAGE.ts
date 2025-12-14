OBJECT_ITEMSTACK_DAMAGE: {
    internalName: "integrateddynamics:itemstack_damage",
    nicknames: ["ItemstackDamage", "itemstack_damage", "itemstackDamage", "damage"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "damage",
    interactName: "itemstackDamage",
    function: (item: Item): Integer => {
      return item.getDamage();
    },
  },