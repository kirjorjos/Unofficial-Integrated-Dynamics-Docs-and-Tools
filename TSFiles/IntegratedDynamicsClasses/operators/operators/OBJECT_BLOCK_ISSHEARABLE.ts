OBJECT_BLOCK_ISSHEARABLE: {
    internalName: "integrateddynamics:block_isshearable",
    nicknames: ["BlockIsshearable", "block_is_shearable", "blockIsShearable", "blockIsShearable"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_shearable",
    interactName: "blockIsShearable",
    function: (block: Block): iBoolean => {
      return block.isShearable();
    },
  },