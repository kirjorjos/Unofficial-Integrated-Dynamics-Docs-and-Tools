NBT_FROM_STRING: {
    internalName: "integrateddynamics:nbt_from_string",
    nicknames: ["nbtFromString"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_string",
    interactName: "stringAsNbt",
    function: (str: iString): StringTag => {
      return new StringTag(str);
    },
  },