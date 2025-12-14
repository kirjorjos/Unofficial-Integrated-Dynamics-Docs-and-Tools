OBJECT_ITEMSTACK_FE_CAPACITY: {
    internalName: "integrateddynamics:itemstack_fecapacity",
    nicknames: [
      "ItemstackFecapacity",
      "itemstack_fe_capacity",
      "itemstackFECapacity",
      "feCapacity"
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
    symbol: "fe_capacity",
    interactName: "itemstackFECapacity",
    function: (item: Item): Integer => {
      return item.getFeCapacity();
    },
  },