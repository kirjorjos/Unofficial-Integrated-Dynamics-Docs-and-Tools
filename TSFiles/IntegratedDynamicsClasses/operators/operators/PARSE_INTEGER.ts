PARSE_INTEGER: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.integer",
    nicknames: ["parseInteger"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Any",
        typeID: 1,
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "parse_integer",
    interactName: "stringParseAsInteger",
    function: (data: IntegratedValue): Integer => {
      try {
        return new Integer(data as Integer);
      } catch (e) {
        return new Integer(0);
      }
    },
  },