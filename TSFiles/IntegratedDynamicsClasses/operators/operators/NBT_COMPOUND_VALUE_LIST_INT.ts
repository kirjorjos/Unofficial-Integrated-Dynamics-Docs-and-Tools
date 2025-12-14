NBT_COMPOUND_VALUE_LIST_INT: {
    internalName: "integrateddynamics:nbt_compound_value_list_int",
    nicknames: ["nbtCompoundValueListInt", "compoundValueListInteger"],
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
        to: { type: "List", listType: { type: "Integer" } },
      },
    },
    symbol: "NBT{}.get_list_int",
    interactName: "nbtGetListInt",
    function: (nbt: CompoundTag): TypeLambda<iString, Array<Integer>> => {
      return (key: iString): Array<Integer> => {
        let value = nbt.get(key);
        if (value.getType() != Tag.TAG_LIST)
          throw new Error(
            `${key} is not a list of int in ${JSON.stringify(nbt.toJSON())}`
          );
        let list = (value as ListTag).getArray();
        return list.map((e) => {
          if (e.getType() != Tag.TAG_INT)
            throw new Error(
              `${key} is not a list of int in ${JSON.stringify(nbt.toJSON())}`
            );
          return (e as IntTag).valueOf();
        });
      };
    },
  },