NBT_COMPOUND_HASKEY: {
    internalName: "integrateddynamics:nbt_compound_haskey",
    nicknames: ["nbtCompoundHaskey", "NBTHasKey"],
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
    symbol: "NBT{}.has_key",
    interactName: "nbtHasKey",
    function: (nbt: CompoundTag): TypeLambda<iString, iBoolean> => {
      return (key: iString): iBoolean => {
        return new iBoolean(nbt.has(key));
      };
    },
  },