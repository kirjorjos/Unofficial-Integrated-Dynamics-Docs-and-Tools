OBJECT_BLOCK_WITH_PROPERTIES: {
    internalName: "integrateddynamics:block_blockfromproperties",
    nicknames: ["BlockWithProperties", "block_with_properties", "blockWithProperties"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "Function",
        from: {
          type: "NBT",
        },
        to: {
          type: "Block",
        },
      },
    },
    symbol: "block_with_props",
    interactName: "blockWithProperties",
    function: (block: Block) => {
      return (properties: Properties): Block => {
        return new Block(properties, block);
      };
    },
  },