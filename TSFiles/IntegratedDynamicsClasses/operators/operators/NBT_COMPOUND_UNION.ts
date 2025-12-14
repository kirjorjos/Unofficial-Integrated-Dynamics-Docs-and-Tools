NBT_COMPOUND_UNION: {
    internalName: "integrateddynamics:nbt_compound_union",
    nicknames: ["nbtCompoundUnion", "NBTUnion"],
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
    symbol: "NBT{}.∪",
    interactName: "nbtUnion",
    function: (nbt1: CompoundTag): TypeLambda<CompoundTag, CompoundTag> => {
      return (nbt2: CompoundTag): CompoundTag => {
        return nbt1.compoundUnion(nbt2);
      };
    },
  },