NBT_FROM_BYTE: {
    internalName: "integrateddynamics:nbt_from_byte",
    nicknames: ["nbtFromByte"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Integer",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_byte",
    interactName: "byteAsNbt",
    function: (byte: Integer): IntTag => {
      return new IntTag(byte);
    },
  },