OBJECT_ITEMSTACK_ISDAMAGEABLE: {
    internalName: "integrateddynamics:itemstack_damageable",
    nicknames: [
      "ItemstackIsdamageable",
      "itemstack_is_damageable",
      "itemstackIsDamageable",
      "isDamageable"
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
    symbol: "damageable",
    interactName: "itemstackIsDamageable",
    function: (item: Item): iBoolean => {
      return item.isDamageable();
    },
  },