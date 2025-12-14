STRING_ENDS_WITH: {
    internalName: "integrateddynamics:string_ends_with",
    nicknames: ["endsWith", "stringEndsWith"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "Boolean",
        },
      },
    },
    symbol: "ends_with",
    interactName: "stringEndsWith",
    function: (substring: string): TypeLambda<string, iBoolean> => {
      return (fullString: string): iBoolean => {
        return new iBoolean(fullString.endsWith(substring));
      };
    },
  },