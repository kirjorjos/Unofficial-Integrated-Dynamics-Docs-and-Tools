NBT_FROM_DOUBLE: {
    internalName: "integrateddynamics:nbt_from_double",
    nicknames: ["nbtFromDouble"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Double",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_double",
    interactName: "doubleAsNbt",
    function: (double: Double): DoubleTag => {
      return new DoubleTag(double);
    },
  },