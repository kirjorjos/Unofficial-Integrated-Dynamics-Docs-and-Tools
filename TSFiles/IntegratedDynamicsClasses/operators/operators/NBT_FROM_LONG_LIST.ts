NBT_FROM_LONG_LIST: {
    internalName: "integrateddynamics:nbt_from_long_list",
    nicknames: ["nbtFromLongList"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Long" } },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_long_list",
    interactName: "longListAsNbt",
    function: (longList: Array<Long>): ListTag => {
      return new ListTag(longList.map((e) => new LongTag(e)));
    },
  },