PARSE_DOUBLE: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.double",
    nicknames: ["parseDouble"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Any",
        typeID: 1,
      },
      to: {
        type: "Double",
      },
    },
    symbol: "parse_double",
    interactName: "stringParseAsDouble",
    function: (data: IntegratedValue): Double => {
      try {
        return new Double(data as Double); // fine to cast as constructor throws error
      } catch (e) {
        return new Double(0);
      }
    },
  },