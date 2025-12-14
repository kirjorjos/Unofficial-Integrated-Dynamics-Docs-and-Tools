OBJECT_ITEMSTACK_MODNAME: {
    internalName: "integrateddynamics:itemstack_mod",
    nicknames: ["ItemstackModname", "item_mod", "itemModname", "itemMod"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "String",
      },
    },
    symbol: "mod",
    interactName: "itemstackMod",
    function: (item: Item): string => {
      return item.getModName();
    },
  },