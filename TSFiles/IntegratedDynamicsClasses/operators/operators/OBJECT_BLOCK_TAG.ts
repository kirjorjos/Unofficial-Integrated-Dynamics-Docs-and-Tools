OBJECT_BLOCK_TAG: {
    internalName: "integrateddynamics:block_tag",
    nicknames: ["BlockTag", "blockTag"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Block",
      },
      to: { type: "List", listType: { type: "String" } },
    },
    symbol: "block_tag_names",
    interactName: "blockTags",
    function: (block: Block): string[] => {
      return block.getTagNames();
    },
  },