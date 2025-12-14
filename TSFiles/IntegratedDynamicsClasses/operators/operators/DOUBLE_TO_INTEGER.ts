DOUBLE_TO_INTEGER: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_integer",
    nicknames: ["doubleToInt", "doubleInteger", "doubleToInteger"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Double",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "()",
    interactName: "doubleDoubleToInteger",
    function: (double: Double): Promise<Integer> => {
      return double.toInteger();
    },
  },