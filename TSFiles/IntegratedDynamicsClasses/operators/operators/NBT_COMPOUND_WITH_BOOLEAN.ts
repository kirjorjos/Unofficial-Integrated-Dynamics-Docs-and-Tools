NBT_COMPOUND_WITH_BOOLEAN: {
    internalName: "integrateddynamics:nbt_compound_with_iBoolean",
    nicknames: ["nbtCompoundWithBoolean", "NBTWithBoolean"],
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
            type: "Boolean",
          },
          to: {
            type: "NBT",
          },
        },
      },
    },
    symbol: "NBT{}.with_iBoolean",
    interactName: "nbtWithBoolean",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<iBoolean, CompoundTag>> => {
      return (key: string): TypeLambda<iBoolean, CompoundTag> => {
        return (value: iBoolean): CompoundTag => {
          return nbt.set(key, new ByteTag(new Integer(+value)));
        };
      };
    },
  },