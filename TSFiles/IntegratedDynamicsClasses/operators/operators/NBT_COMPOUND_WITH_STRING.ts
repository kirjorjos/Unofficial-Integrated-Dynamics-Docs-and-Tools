NBT_COMPOUND_WITH_STRING: {
    internalName: "integrateddynamics:nbt_compound_with_string",
    nicknames: ["nbtCompoundWithString", "NBTWithString"],
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
            type: "String",
          },
          to: {
            type: "NBT",
          },
        },
      },
    },
    symbol: "NBT{}.with_string",
    interactName: "nbtWithString",
    function: (
      nbt: CompoundTag
    ): TypeLambda<iString, TypeLambda<iString, CompoundTag>> => {
      return (key: iString): TypeLambda<iString, CompoundTag> => {
        return (value: iString): CompoundTag => {
          return nbt.set(key.valueOf(), new StringTag(value));
        };
      };
    },
  },