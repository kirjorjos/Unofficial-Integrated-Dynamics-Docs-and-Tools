NBT_COMPOUND_MINUS: {
    internalName: "integrateddynamics:nbt_compound_minus",
    nicknames: ["nbtCompoundMinus", "NBTMinus"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Function",
        from: {
          type: "NBT",
        },
        to: {
          type: "NBT",
        },
      },
    },
    symbol: "NBT{}.∖",
    interactName: "nbtMinus",
    function: (nbt1: CompoundTag) => {
      return (nbt2: CompoundTag) => {
        return nbt1.compoundMinus(nbt2);
      };
    },
  },