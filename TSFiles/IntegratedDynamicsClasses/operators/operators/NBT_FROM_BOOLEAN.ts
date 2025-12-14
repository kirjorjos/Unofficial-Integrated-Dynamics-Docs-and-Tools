NBT_FROM_BOOLEAN: {
    internalName: "integrateddynamics:nbt_from_iBoolean",
    nicknames: ["nbtFromBoolean"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Boolean",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT.from_iBoolean",
    interactName: "booleanAsNbt",
    function: (bool: iBoolean): ByteTag => {
      return new ByteTag(new Integer(+bool));
    },
  },