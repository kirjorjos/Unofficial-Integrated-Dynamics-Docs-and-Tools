NBT_COMPOUND_VALUE_COMPOUND: {
    internalName: "integrateddynamics:nbt_compound_value_compound",
    nicknames: ["nbtCompoundValueCompound", "compoundValueNBT"],
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
    symbol: "NBT{}.get_compound",
    interactName: "nbtGetCompound",
    function: (nbt: CompoundTag): TypeLambda<iString, Tag<IntegratedValue>> => {
      return (key: iString): Tag<IntegratedValue> => {
        let value = nbt.get(key);
        if (value.getType() === Tag.TAG_COMPOUND) {
          return value;
        }
        throw new Error(
          `${key} is not a Compound in ${JSON.stringify(nbt.toJSON())}`
        );
      };
    },
  },