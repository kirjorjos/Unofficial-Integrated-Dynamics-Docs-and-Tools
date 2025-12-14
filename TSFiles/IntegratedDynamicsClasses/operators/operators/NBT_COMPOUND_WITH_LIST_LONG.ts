NBT_COMPOUND_WITH_LIST_LONG: {
    internalName: "integrateddynamics:nbt_compound_with_list_long",
    nicknames: ["nbtCompoundWithListLong", "NBTWithLongList"],
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
          from: { type: "List", listType: { type: "Long" } },
          to: {
            type: "NBT",
          },
        },
      },
    },
    symbol: "NBT{}.with_list_long",
    interactName: "nbtWithListLong",
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