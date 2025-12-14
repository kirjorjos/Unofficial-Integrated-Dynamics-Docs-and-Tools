OBJECT_BLOCK_STEPSOUND: {
    internalName: "integrateddynamics:block_stepsound",
    nicknames: ["BlockStepsound", "blockStepSound", "block_step_sound", "stepSound"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "String",
      },
    },
    symbol: "step_sound",
    interactName: "blockStepSound",
    function: (block: Block): string => {
      return block.getStepSound();
    },
  },