NBT_FROM_LONG: {
    internalName: "integrateddynamics:nbt_from_long",
    nicknames: ["nbtFromLong"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Long",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_long",
    interactName: "longAsNbt",
    function: (long: Long): LongTag => {
      return new LongTag(long);
    },
  },