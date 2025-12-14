NBT_COMPOUND_WITH_FLOAT: {
    internalName: "integrateddynamics:nbt_compound_with_float",
    nicknames: ["nbtCompoundWithFloat", "NBTWithFloat"],
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
            type: "Double",
          },
          to: {
            type: "NBT",
          },
        },
      },
    },
    symbol: "NBT{}.with_float",
    interactName: "nbtWithFloat",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<Double, CompoundTag>> => {
      return (key: string): TypeLambda<Double, CompoundTag> => {
        return (value: Double): CompoundTag => {
          return nbt.set(key, new FloatTag(value));
        };
      };
    },
  },