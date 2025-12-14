PARSE_LONG: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.long",
    nicknames: ["parseLong"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Any",
        typeID: 1,
      },
      to: {
        type: "Long",
      },
    },
    symbol: "parse_long",
    interactName: "stringParseAsLong",
    function: (data: IntegratedValue): Long => {
      try {
        return new Long(data as Long);
      } catch (e) {
        return new Long(0);
      }
    },
  },