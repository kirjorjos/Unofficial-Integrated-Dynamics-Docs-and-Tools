NBT_FROM_TAG_LIST: {
    internalName: "integrateddynamics:nbt_from_tag_list",
    nicknames: ["nbtFromTagList"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "NBT" } },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_tag_list",
    interactName: "tagListAsNbt",
    function: (tagList: Array<CompoundTag>): ListTag => {
      return new ListTag(tagList);
    },
  },