NBT_FROM_BYTE_LIST: {
    internalName: "integrateddynamics:nbt_from_byte_list",
    nicknames: ["nbtFromByteList"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Integer" } },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_byte_list",
    interactName: "byteListAsNbt",
    function: (byteList: Array<Integer>): ListTag => {
      return new ListTag(byteList.map((e) => new IntTag(e)));
    },
  },