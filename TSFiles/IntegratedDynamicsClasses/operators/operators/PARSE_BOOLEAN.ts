PARSE_BOOLEAN: {
    internalName:
      "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.iBoolean",
    nicknames: ["parseBoolean"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "parse_iBoolean",
    interactName: "stringParseAsBoolean",
    function: (value: string): iBoolean => {
      const matchArr =
        new RE2("(F(alse)?|[+-]?(0x|#)?0+|)", "i").match(value) ?? [];
      return new iBoolean(!!matchArr[0]);
    },
  },