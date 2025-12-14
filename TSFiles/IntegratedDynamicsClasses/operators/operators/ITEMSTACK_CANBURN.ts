ITEMSTACK_CANBURN: {
    internalName: "integrateddynamics:itemstack_canburn",
    nicknames: [
      "ItemstackCanburn",
      "item_can_burn",
      "itemCanBurn",
      "item_is_fuel",
      "itemIsFuel",
      "isFuel",
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
    symbol: "can_burn",
    interactName: "itemstackCanBurn",
    function: (item: Item): iBoolean => {
      return item.isFuel();
    },
  },