NBT_COMPOUND_VALUE_TAG: {
    internalName: "integrateddynamics:nbt_compound_value_tag",
    nicknames: ["nbtCompoundValueTag", "compoundValueAny"],
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
          type: "NBT",
        },
      },
    },
    symbol: "NBT{}.get_tag",
    interactName: "nbtGetTag",
    function: (nbt: CompoundTag): TypeLambda<iString, Tag<IntegratedValue>> => {
      return (key: iString): Tag<IntegratedValue> => {
        return nbt.get(key);
      };
    },
  },