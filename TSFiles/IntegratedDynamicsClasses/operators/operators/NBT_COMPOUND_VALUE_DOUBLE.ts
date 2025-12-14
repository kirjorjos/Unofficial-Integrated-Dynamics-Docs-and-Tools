NBT_COMPOUND_VALUE_DOUBLE: {
    internalName: "integrateddynamics:nbt_compound_value_double",
    nicknames: ["nbtCompoundValueDouble", "compoundValueDouble"],
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
          type: "Double",
        },
      },
    },
    symbol: "NBT{}.get_double",
    interactName: "nbtGetDouble",
    function: (nbt: CompoundTag): TypeLambda<iString, Double> => {
      return (key: iString): Double => {
        let value = nbt.get(key);
        if (value.getType() === Tag.TAG_DOUBLE) {
          return value.valueOf() as Double;
        }
        throw new Error(
          `${key} is not a double in ${JSON.stringify(nbt.toJSON())}`
        );
      };
    },
  },