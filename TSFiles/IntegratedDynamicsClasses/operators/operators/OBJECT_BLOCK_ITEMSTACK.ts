OBJECT_BLOCK_ITEMSTACK: {
    internalName: "integrateddynamics:block_itemstack",
    nicknames: [
      "BlockItemstack",
      "block_item",
      "blockItemstack",
      "block_itemstack",
      "blockItem"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "Item",
      },
    },
    symbol: "itemstack",
    interactName: "blockItemStack",
    function: (block: Block): Item => {
      return block.getItem();
    },
  },