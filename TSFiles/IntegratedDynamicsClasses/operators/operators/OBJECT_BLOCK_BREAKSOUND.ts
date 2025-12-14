OBJECT_BLOCK_BREAKSOUND: {
    internalName: "integrateddynamics:block_breaksound",
    nicknames: ["BlockBreaksound", "block_break_sound", "blockBreakSound", "breakSound"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: {
        type: "String",
      },
    },
    symbol: "break_sound",
    interactName: "blockBreakSound",
    function: (block: Block): string => {
      return block.getBreakSound();
    },
  },