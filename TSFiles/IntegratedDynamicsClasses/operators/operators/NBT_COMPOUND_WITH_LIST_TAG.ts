NBT_COMPOUND_WITH_LIST_TAG: {
    internalName: "integrateddynamics:nbt_compound_with_list_tag",
    nicknames: ["nbtCompoundWithListTag", "NBTWithNBTList"],
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
          from: { type: "List", listType: { type: "NBT" } },
          to: {
            type: "NBT",
          },
        },
      },
    },
    symbol: "NBT{}.with_tag_list",
    interactName: "nbtWithTagList",
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