OBJECT_BLOCK_POSSIBLE_PROPERTIES: {
    internalName: "integrateddynamics:block_blockpossibleproperties",
    nicknames: ["BlockPossibleProperties", "block_possible_properties", "blockPossibleProperties"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "block_all_props",
    interactName: "blockPossibleProperties",
    function: (): never => {
      throw new Error(
        "Block possible properties is infeasible without a registry. This is a placeholder function."
      );
    },
  },