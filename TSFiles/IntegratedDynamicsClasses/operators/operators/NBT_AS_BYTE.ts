NBT_AS_BYTE: {
    internalName: "integrateddynamics:nbt_as_byte",
    nicknames: ["nbtAsByte"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "NBT.as_byte",
    interactName: "nbtAsByte",
    function: (nbt: IntTag): Integer => {
      if (nbt.getType() === Tag.TAG_INT) {
        return nbt.valueOf();
      } else {
        return new Integer(0);
      }
    },
  },