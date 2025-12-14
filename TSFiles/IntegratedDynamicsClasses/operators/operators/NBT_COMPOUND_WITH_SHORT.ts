NBT_COMPOUND_WITH_SHORT: {
    internalName: "integrateddynamics:nbt_compound_with_short",
    nicknames: ["nbtCompoundWithShort", "NBTWithShort"],
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
            type: "Integer",
          },
          to: {
            type: "NBT",
          },
        },
      },
    },
    symbol: "NBT{}.with_short",
    interactName: "nbtWithShort",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<Integer, CompoundTag>> => {
      return (key: string): TypeLambda<Integer, CompoundTag> => {
        return (value: Integer): CompoundTag => {
          return nbt.set(key, new ShortTag(value));
        };
      };
    },
  },