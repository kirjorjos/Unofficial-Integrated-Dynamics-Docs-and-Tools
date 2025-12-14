NBT_FROM_SHORT: {
    internalName: "integrateddynamics:nbt_from_short",
    nicknames: ["nbtFromShort"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Integer",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_short",
    interactName: "shortAsNbt",
    function: (short: Integer): IntTag => {
      return new IntTag(short);
    },
  },