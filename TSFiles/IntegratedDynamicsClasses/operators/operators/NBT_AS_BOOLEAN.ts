NBT_AS_BOOLEAN: {
    internalName: "integrateddynamics:nbt_as_iBoolean",
    nicknames: ["nbtAsBoolean"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "NBT.as_iBoolean",
    interactName: "nbtAsBoolean",
    function: (nbt: ByteTag): iBoolean => {
      if (nbt.getType() === Tag.TAG_BYTE) {
        return new iBoolean(!!parseInt(nbt.valueOf().toDecimal()));
      } else {
        return new iBoolean(false);
      }
    },
  },