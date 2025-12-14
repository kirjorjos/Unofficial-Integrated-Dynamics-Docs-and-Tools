OBJECT_BLOCK_PROPERTIES: {
    internalName: "integrateddynamics:block_blockproperties",
    nicknames: ["BlockProperties", "block_properties", "blockProperties"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "block_props",
    interactName: "blockProperties",
    function: (block: Block): Properties => {
      return block.getProperties();
    },
  },