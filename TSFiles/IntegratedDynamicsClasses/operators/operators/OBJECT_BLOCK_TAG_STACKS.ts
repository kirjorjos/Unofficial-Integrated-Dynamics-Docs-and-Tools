OBJECT_BLOCK_TAG_STACKS: {
    internalName: "integrateddynamics:string_blocktag",
    nicknames: ["BlockTagStacks", "block_tag_stacks", "blockTagStacks"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: { type: "List", listType: { type: "Block" } },
    },
    symbol: "block_tag_values",
    interactName: "stringBlocksByTag",
    function: (): never => {
      throw new Error(
        "Block tag values is infeasible without a registry. This is a placeholder function."
      );
    },
  },