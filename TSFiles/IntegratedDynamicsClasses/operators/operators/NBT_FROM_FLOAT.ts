NBT_FROM_FLOAT: {
    internalName: "integrateddynamics:nbt_from_float",
    nicknames: ["nbtFromFloat"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Double",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_float",
    interactName: "floatAsNbt",
    function: (float: Double): DoubleTag => {
      return new DoubleTag(float);
    },
  },