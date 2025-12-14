ITEMSTACK_ISFECONTAINER: {
    internalName: "integrateddynamics:itemstack_isfecontainer",
    nicknames: [
      "ItemstackIsfecontainer",
      "itemstack_is_fe_container",
      "itemstackIsFecontainer",
      "item_is_fe_container",
      "itemIsFecontainer",
      "isFeContainer"
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
    symbol: "is_fe_container",
    interactName: "itemstackIsFeContainer",
    function: (item: Item): iBoolean => {
      return item.isFeContainer();
    },
  },