NBT_AS_LONG_LIST: {
    internalName: "integrateddynamics:nbt_as_long_list",
    nicknames: ["nbtAsLongList"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: { type: "List", listType: { type: "Long" } },
    },
    symbol: "NBT.as_long_list",
    interactName: "nbtAsLongList",
    function: (nbt: ListTag): Array<Long> => {
      if (nbt.getType() === Tag.TAG_LIST) {
        const list = nbt.valueOf();
        if (!list.every((e) => e.getType() == Tag.TAG_LONG))
          return new Array<Long>();
        return list.map((e) => e.valueOf() as Long);
      } else {
        return new Array<Long>();
      }
    },
  },