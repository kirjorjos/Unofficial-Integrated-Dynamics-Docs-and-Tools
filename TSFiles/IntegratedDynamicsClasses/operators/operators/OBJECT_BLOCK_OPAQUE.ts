OBJECT_BLOCK_OPAQUE: {
    internalName: "integrateddynamics:block_opaque",
    nicknames: ["BlockOpaque", "opaque"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "opaque",
    interactName: "blockIsOpaque",
    function: (block: Block): iBoolean => {
      return block.isOpaque();
    },
  },