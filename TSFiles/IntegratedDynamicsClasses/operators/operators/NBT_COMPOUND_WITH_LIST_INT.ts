NBT_COMPOUND_WITH_LIST_INT: {
    internalName: "integrateddynamics:nbt_compound_with_list_int",
    nicknames: ["nbtCompoundWithListInt", "NBTWithIntegerList"],
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
          from: { type: "List", listType: { type: "Integer" } },
          to: {
            type: "NBT",
          },
        },
      },
    },
    symbol: "NBT{}.with_int_list",
    interactName: "nbtWithIntList",
    function: (
      nbt: CompoundTag
    ): TypeLambda<string, TypeLambda<ListTag, CompoundTag>> => {
      return (key: string): TypeLambda<ListTag, CompoundTag> => {
        return (value: ListTag): CompoundTag => {
          return nbt.set(key, value);
        };
      };
    },
  },