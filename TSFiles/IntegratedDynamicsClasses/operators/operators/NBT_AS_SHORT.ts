NBT_AS_SHORT: {
    internalName: "integrateddynamics:nbt_as_short",
    nicknames: ["nbtAsShort"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "NBT.as_short",
    interactName: "nbtAsShort",
    function: (nbt: IntTag): Integer => {
      if (nbt.getType() === Tag.TAG_INT) {
        return nbt.valueOf();
      } else {
        return new Integer(0);
      }
    },
  },