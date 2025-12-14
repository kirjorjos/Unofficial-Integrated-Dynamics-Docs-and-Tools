NBT_COMPOUND_WITH_INTEGER: {
    internalName: "integrateddynamics:nbt_compound_with_integer",
    nicknames: ["nbtCompoundWithInteger", "NBTWithInteger"],
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
    symbol: "NBT{}.with_integer",
    interactName: "nbtWithInteger",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<Integer, CompoundTag>> => {
      return (key: string): TypeLambda<Integer, CompoundTag> => {
        return (value: Integer): CompoundTag => {
          return nbt.set(key, new IntTag(value));
        };
      };
    },
  },