PARSE_NBT: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.nbt",
    nicknames: ["parseNBT"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "parse_nbt",
    interactName: "stringParseAsNbt",
    function: (data: string): CompoundTag => {
      return CompoundTag.fromJSON(data);
    },
  },