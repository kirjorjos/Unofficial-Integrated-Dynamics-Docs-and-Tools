INTEGER_TO_DOUBLE: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_double",
    nicknames: ["intToDouble", "integerDouble", "integerToDouble"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Integer",
      },
      to: {
        type: "Double",
      },
    },
    symbol: "()",
    interactName: "integerIntegerToDouble",
    function: (int: Integer): Promise<Double> => {
      return int.toDouble();
    },
  },