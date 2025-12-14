NBT_COMPOUND_KEYS: {
    internalName: "integrateddynamics:nbt_compound_keys",
    nicknames: ["nbtCompoundKeys", "NBTKeys"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: { type: "List", listType: { type: "String" } },
    },
    symbol: "NBT{}.keys",
    interactName: "nbtKeys",
    function: (nbt: CompoundTag): Array<iString> => {
      return nbt.getAllKeys();
    },
  },