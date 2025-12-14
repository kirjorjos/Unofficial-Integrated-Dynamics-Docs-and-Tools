NBT_COMPOUND_SUBSET: {
    internalName: "integrateddynamics:nbt_compound_subset",
    nicknames: ["nbtCompoundSubset", "NBTSubset"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Function",
        from: {
          type: "NBT",
        },
        to: {
          type: "Boolean",
        },
      },
    },
    symbol: "NBT{}.⊆",
    interactName: "nbtIsSubset",
    function: (subSet: CompoundTag): TypeLambda<CompoundTag, iBoolean> => {
      return (superSet: CompoundTag): iBoolean => {
        return new iBoolean(superSet.compoundSubset(subSet));
      };
    },
  },