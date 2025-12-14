OBJECT_ITEMSTACK_ISENCHANTABLE: {
    internalName: "integrateddynamics:itemstack_enchantable",
    nicknames: [
      "ItemstackIsenchantable",
      "itemstack_is_enchantable",
      "itemstackIsEnchantable",
      "enchantable"
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
    symbol: "enchantable",
    interactName: "itemstackIsEnchantable",
    function: (item: Item): iBoolean => {
      return item.isEnchantable();
    },
  },