DOUBLE_TO_LONG: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_long",
    nicknames: ["doubleToLong", "doubleToLong"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Double",
      },
      to: {
        type: "Long",
      },
    },
    symbol: "()",
    interactName: "doubleDoubleToLong",
    function: (double: Double): Promise<Long> => {
      return double.toLong();
    },
  },