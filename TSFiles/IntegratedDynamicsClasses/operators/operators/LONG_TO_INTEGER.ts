LONG_TO_INTEGER: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_integer",
    nicknames: ["longToInt", "longInteger", "longToInteger"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Long",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "()",
    interactName: "longLongToInteger",
    function: (long: Long): Integer => {
      return long.toInteger();
    },
  },