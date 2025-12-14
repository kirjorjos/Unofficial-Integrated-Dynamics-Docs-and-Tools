NBT_FROM_INT_LIST: {
    internalName: "integrateddynamics:nbt_from_int_list",
    nicknames: ["nbtFromIntList"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Integer" } },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_int_list",
    interactName: "intListAsNbt",
    function: (intList: Array<Integer>): ListTag => {
      return new ListTag(intList.map((e) => new IntTag(e)));
    },
  },