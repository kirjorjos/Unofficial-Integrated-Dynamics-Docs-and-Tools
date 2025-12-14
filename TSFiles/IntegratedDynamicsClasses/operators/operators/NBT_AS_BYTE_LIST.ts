NBT_AS_BYTE_LIST: {
    internalName: "integrateddynamics:nbt_as_byte_list",
    nicknames: ["nbtAsByteList"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: { type: "List", listType: { type: "Integer" } },
    },
    symbol: "NBT.as_byte_list",
    interactName: "nbtAsByteList",
    function: (nbt: ListTag): Array<Integer> => {
      if (nbt.getType() === Tag.TAG_LIST) {
        const list = nbt.valueOf();
        if (!list.every((e) => e.getType() == Tag.TAG_INT))
          return new Array<Integer>();
        return list.map((e) => e.valueOf() as Integer);
      } else {
        return new Array<Integer>();
      }
    },
  },