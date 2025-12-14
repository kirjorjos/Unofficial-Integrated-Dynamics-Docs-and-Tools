NBT_AS_STRING: {
    internalName: "integrateddynamics:nbt_as_string",
    nicknames: ["nbtAsString"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "String",
      },
    },
    symbol: "NBT.as_string",
    interactName: "nbtAsString",
    function: (nbt: StringTag): iString => {
      if (nbt.getType() === Tag.TAG_STRING) {
        return nbt.valueOf();
      } else {
        return new iString("");
      }
    },
  },