NBT_COMPOUND_VALUE_INTEGER: {
    internalName: "integrateddynamics:nbt_compound_value_integer",
    nicknames: ["nbtCompoundValueInteger", "compoundValueInteger"],
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
          type: "Integer",
        },
      },
    },
    symbol: "NBT{}.get_integer",
    interactName: "nbtGetInteger",
    function: (nbt: CompoundTag): TypeLambda<iString, Integer> => {
      return (key: iString): Integer => {
        let value = nbt.get(key);
        if (value.getType() != Tag.TAG_INT)
          throw new Error(
            `${key} is not an integer in ${JSON.stringify(nbt.toJSON())}`
          );
        return (value as IntTag).valueOf();
      };
    },
  },