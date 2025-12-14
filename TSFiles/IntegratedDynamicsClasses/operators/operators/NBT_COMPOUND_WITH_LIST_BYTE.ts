NBT_COMPOUND_WITH_LIST_BYTE: {
    internalName: "integrateddynamics:nbt_compound_with_list_byte",
    nicknames: ["nbtCompoundWithListByte", "NBTWithByteList"],
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
    symbol: "NBT{}.with_byte_list",
    interactName: "nbtWithByteList",
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