NBT_COMPOUND_WITH_DOUBLE: {
    internalName: "integrateddynamics:nbt_compound_with_double",
    nicknames: ["nbtCompoundWithDouble", "NBTWithDouble"],
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
    symbol: "NBT{}.with_double",
    interactName: "nbtWithDouble",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<Double, CompoundTag>> => {
      return (key: string): TypeLambda<Double, CompoundTag> => {
        return (value: Double): CompoundTag => {
          return nbt.set(key, new DoubleTag(value));
        };
      };
    },
  },