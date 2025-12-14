NBT_COMPOUND_WITH_COMPOUND: {
    internalName: "integrateddynamics:nbt_compound_with_tag",
    nicknames: ["nbtCompoundWithCompound", "NBTWithNBT"],
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
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "NBT",
          },
        },
      },
    },
    symbol: "NBT{}.with_tag",
    interactName: "nbtWithTag",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<CompoundTag, CompoundTag>> => {
      return (key: string): TypeLambda<CompoundTag, CompoundTag> => {
        return (value: CompoundTag): CompoundTag => {
          return nbt.set(key, value);
        };
      };
    },
  },