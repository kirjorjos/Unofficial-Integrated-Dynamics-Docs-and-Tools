OBJECT_BLOCK_MODNAME: {
    internalName: "integrateddynamics:block_mod",
    nicknames: ["BlockItemstack", "block_item", "blockItemstack", "block_itemstack", "blockItem"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "String",
      },
    },
    symbol: "mod",
    interactName: "blockMod",
    function: (block: Block): string => {
      return block.getModName();
    },
  },