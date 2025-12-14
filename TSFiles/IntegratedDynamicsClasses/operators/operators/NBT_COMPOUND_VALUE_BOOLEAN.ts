NBT_COMPOUND_VALUE_BOOLEAN: {
    internalName: "integrateddynamics:nbt_compound_value_iBoolean",
    nicknames: ["nbtCompoundValueBoolean", "compoundValueBoolean"],
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
          type: "Boolean",
        },
      },
    },
    symbol: "NBT{}.get_iBoolean",
    interactName: "nbtGetBoolean",
    function: (nbt: CompoundTag): TypeLambda<iString, iBoolean> => {
      return (key: iString): iBoolean => {
        const result = nbt.get(key).valueOf();
        if (!(result instanceof iBoolean)) return new iBoolean(false);
        return result;
      };
    },
  },