NBT_AS_DOUBLE: {
    internalName: "integrateddynamics:nbt_as_double",
    nicknames: ["nbtAsDouble"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Double",
      },
    },
    symbol: "NBT.as_double",
    interactName: "nbtAsDouble",
    function: (nbt: DoubleTag): Double => {
      if (nbt.getType() === Tag.TAG_DOUBLE) {
        return nbt.valueOf();
      } else {
        return new Double(0);
      }
    },
  },