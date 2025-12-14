NBT_AS_INT: {
    internalName: "integrateddynamics:nbt_as_int",
    nicknames: ["nbtAsInt"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "NBT.as_int",
    interactName: "nbtAsInt",
    function: (nbt: IntTag): Integer => {
      if (nbt.getType() === Tag.TAG_INT) {
        return nbt.valueOf();
      } else {
        return new Integer(0);
      }
    },
  },