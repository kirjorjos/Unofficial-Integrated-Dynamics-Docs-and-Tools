NBT_COMPOUND_VALUE_TYPE: {
    internalName: "integrateddynamics:nbt_compound_type",
    nicknames: ["nbtCompoundValueType", "NBTValueType"],
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
    symbol: "NBT{}.type",
    interactName: "nbtType",
    function: (nbt: CompoundTag): TypeLambda<iString, iString> => {
      return (key: iString): iString => {
        if (!nbt.has(key)) {
          throw new Error(`${key} does not exist in ${JSON.stringify(nbt)}`);
        }
        return nbt.get(key).getTypeAsString();
      };
    },
  },