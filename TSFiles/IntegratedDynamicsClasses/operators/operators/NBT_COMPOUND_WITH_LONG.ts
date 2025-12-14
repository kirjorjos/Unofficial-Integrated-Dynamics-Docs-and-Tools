NBT_COMPOUND_WITH_LONG: {
    internalName: "integrateddynamics:nbt_compound_with_long",
    nicknames: ["nbtCompoundWithLong", "NBTWithLong"],
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
            type: "Long",
          },
          to: {
            type: "NBT",
          },
        },
      },
    },
    symbol: "NBT{}.with_long",
    interactName: "nbtWithLong",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<Long, CompoundTag>> => {
      return (key: string): TypeLambda<Long, CompoundTag> => {
        return (value: Long): CompoundTag => {
          return nbt.set(key, new LongTag(value));
        };
      };
    },
  },