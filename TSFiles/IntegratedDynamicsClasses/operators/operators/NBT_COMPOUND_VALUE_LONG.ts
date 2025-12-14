NBT_COMPOUND_VALUE_LONG: {
    internalName: "integrateddynamics:nbt_compound_value_long",
    nicknames: ["nbtCompoundValueLong", "compoundValueLong"],
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
          type: "Long",
        },
      },
    },
    symbol: "NBT{}.get_long",
    interactName: "nbtGetLong",
    function: (nbt: CompoundTag): TypeLambda<iString, Long> => {
      return (key: iString): Long => {
        let value = nbt.get(key);
        if (value.getType() === Tag.TAG_LONG) {
          return value.valueOf() as Long;
        }
        throw new Error(
          `${key} is not a long in ${JSON.stringify(nbt.toJSON())}`
        );
      };
    },
  },