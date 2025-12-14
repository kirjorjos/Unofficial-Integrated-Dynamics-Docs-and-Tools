NBT_COMPOUND_INTERSECTION: {
    internalName: "integrateddynamics:nbt_compound_intersection",
    nicknames: ["nbtCompoundIntersection", "NBTIntersection"],
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
          type: "NBT",
        },
      },
    },
    symbol: "NBT{}.∩",
    interactName: "nbtIntersection",
    function: (nbt1: CompoundTag) => {
      return (nbt2: CompoundTag) => {
        return nbt1.compoundIntersection(nbt2);
      };
    },
  },