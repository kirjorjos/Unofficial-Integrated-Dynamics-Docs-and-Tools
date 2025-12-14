OBJECT_ITEMSTACK_BLOCK: {
    internalName: "integrateddynamics:itemstack_block",
    nicknames: ["ItemstackBlock", "itemstack_block", "itemstackBlock", "itemBlock"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Block",
      },
    },
    symbol: "block",
    interactName: "itemstackBlock",
    function: (item: Item): Block => {
      return new Block(new Properties({}), item.getBlock());
    },
  },