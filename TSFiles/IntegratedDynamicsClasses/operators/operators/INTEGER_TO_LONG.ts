INTEGER_TO_LONG: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_long",
    nicknames: ["intToLong", "integerLong", "integerToLong"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Integer",
      },
      to: {
        type: "Long",
      },
    },
    symbol: "()",
    interactName: "integerIntegerToLong",
    function: (int: Integer): Promise<Long> => {
      return int.toLong();
    },
  },