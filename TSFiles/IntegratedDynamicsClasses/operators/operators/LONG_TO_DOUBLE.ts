LONG_TO_DOUBLE: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_double",
    nicknames: ["longToDouble", "longDouble", "longToDouble"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Long",
      },
      to: {
        type: "Double",
      },
    },
    symbol: "()",
    interactName: "longLongToDouble",
    function: (long: Long): Promise<Double> => {
      return long.toDouble();
    },
  },