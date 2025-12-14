NBT_COMPOUND_SIZE: {
    internalName: "integrateddynamics:nbt_compound_size",
    nicknames: ["nbtCompoundSize", "NBTSize"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "NBT{}.size",
    interactName: "nbtSize",
    function: (nbt: CompoundTag): Integer => {
      return new Integer(nbt.getAllKeys().length);
    },
  },