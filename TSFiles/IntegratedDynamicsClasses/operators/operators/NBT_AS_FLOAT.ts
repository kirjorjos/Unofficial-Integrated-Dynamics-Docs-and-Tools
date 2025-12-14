NBT_AS_FLOAT: {
    internalName: "integrateddynamics:nbt_as_float",
    nicknames: ["nbtAsFloat"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Double",
      },
    },
    symbol: "NBT.as_float",
    interactName: "nbtAsFloat",
    function: (nbt: DoubleTag): Double => {
      if (nbt.getType() === Tag.TAG_DOUBLE) {
        return nbt.valueOf();
      } else {
        return new Double(0);
      }
    },
  },