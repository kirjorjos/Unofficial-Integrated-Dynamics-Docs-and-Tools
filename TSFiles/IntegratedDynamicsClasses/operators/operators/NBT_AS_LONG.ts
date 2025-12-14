NBT_AS_LONG: {
    internalName: "integrateddynamics:nbt_as_long",
    nicknames: ["nbtAsLong"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Long",
      },
    },
    symbol: "NBT.as_long",
    interactName: "nbtAsLong",
    function: (nbt: LongTag): Long => {
      if (nbt.getType() === Tag.TAG_LONG) {
        return nbt.valueOf();
      } else {
        return new Long(0);
      }
    },
  },