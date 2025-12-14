NBT_COMPOUND_WITHOUT: {
    internalName: "integrateddynamics:nbt_compound_without",
    nicknames: ["nbtCompoundWithout", "NBTWithout"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "NBT",
        },
      },
    },
    symbol: "NBT{}.without",
    interactName: "nbtWithout",
    function: (nbt: CompoundTag): TypeLambda<string, CompoundTag> => {
      return (key: string): CompoundTag => {
        return nbt.without(key);
      };
    },
  },