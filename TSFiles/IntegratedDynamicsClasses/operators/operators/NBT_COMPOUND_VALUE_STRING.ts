NBT_COMPOUND_VALUE_STRING: {
    internalName: "integrateddynamics:nbt_compound_value_string",
    nicknames: ["nbtCompoundValueString", "compoundValueString"],
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
          type: "String",
        },
      },
    },
    symbol: "NBT{}.get_string",
    interactName: "nbtGetString",
    function: (nbt: CompoundTag): TypeLambda<iString, iString> => {
      return (key: iString): iString => {
        let value = nbt.get(key);
        if (value.getType() === Tag.TAG_STRING) {
          return (value as StringTag).valueOf() as iString;
        }
        throw new Error(
          `${key} is not a string in ${JSON.stringify(nbt.toJSON())}`
        );
      };
    },
  },