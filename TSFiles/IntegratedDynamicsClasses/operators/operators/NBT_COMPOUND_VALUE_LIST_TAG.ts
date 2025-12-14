NBT_COMPOUND_VALUE_LIST_TAG: {
    internalName: "integrateddynamics:nbt_compound_value_list_tag",
    nicknames: ["nbtCompoundValueListTag", "nbtCompoundValueList", "compoundValueListNBT"],
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
        to: { type: "List", listType: { type: "NBT" } },
      },
    },
    symbol: "NBT{}.get_list_tag",
    interactName: "nbtGetListTag",
    function: (
      nbt: CompoundTag
    ): TypeLambda<iString, Tag<IntegratedValue>[]> => {
      return (key: iString): Tag<IntegratedValue>[] => {
        if (!nbt.has(key))
          throw new Error(
            `${key} is not a list of NBT in ${JSON.stringify(nbt.toJSON())}`
          );
        let listTag = nbt.get(key);
        if (listTag.getType() != Tag.TAG_LIST)
          throw new Error(
            `${key} is not a list of NBT in ${JSON.stringify(nbt.toJSON())}`
          );
        return (listTag as ListTag).getArray();
      };
    },
  },