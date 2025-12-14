NBT_FROM_INT: {
    internalName: "integrateddynamics:nbt_from_int",
    nicknames: ["nbtFromInt"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Integer",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_int",
    interactName: "integerAsNbt",
    function: (int: Integer): IntTag => {
      return new IntTag(int);
    },
  },