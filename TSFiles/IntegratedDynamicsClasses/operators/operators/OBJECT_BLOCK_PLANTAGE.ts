OBJECT_BLOCK_PLANTAGE: {
    internalName: "integrateddynamics:block_plantage",
    nicknames: ["BlockPlantage", "block_plant_age", "blockPlantAge", "plantAge"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "plant_age",
    interactName: "blockPlantAge",
    function: (block: Block): Integer => {
      return block.getPlantAge();
    },
  },