NBT_COMPOUND_VALUE_LIST_LONG: {
    internalName: "integrateddynamics:nbt_compound_value_list_long",
    nicknames: ["nbtCompoundValueListLong", "compoundValueListLong"],
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
        to: { type: "List", listType: { type: "Long" } },
      },
    },
    symbol: "NBT{}.get_list_long",
    interactName: "nbtGetListLong",
    function: (nbt: CompoundTag): TypeLambda<iString, Long[]> => {
      return (key: iString): Long[] => {
        let value = nbt.get(key);
        if (value.getType() != Tag.TAG_LIST)
          throw new Error(
            `${key} is not a list of long in ${JSON.stringify(nbt.toJSON())}`
          );
        let list = (value as ListTag).getArray();
        return list.map((e) => {
          if (e.getType() != Tag.TAG_LONG)
            throw new Error(
              `${key} is not a list of long in ${JSON.stringify(nbt.toJSON())}`
            );
          return (e as LongTag).valueOf();
        });
      };
    },
  },