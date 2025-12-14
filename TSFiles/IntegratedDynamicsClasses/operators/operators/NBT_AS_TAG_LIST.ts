NBT_AS_TAG_LIST: {
    internalName: "integrateddynamics:nbt_as_tag_list",
    nicknames: ["nbtAsTagList"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: { type: "List", listType: { type: "NBT" } },
    },
    symbol: "NBT.as_tag_list",
    interactName: "nbtAsTagList",
    function: (nbt: ListTag): Array<Tag<IntegratedValue>> => {
      if (nbt.getType() === Tag.TAG_LIST) {
        return nbt.valueOf();
      } else {
        return new Array<Tag<any>>();
      }
    },
  },