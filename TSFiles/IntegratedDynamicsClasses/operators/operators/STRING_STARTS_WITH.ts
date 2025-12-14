STRING_STARTS_WITH: {
    internalName: "integrateddynamics:string_starts_with",
    nicknames: ["startsWith", "stringStartsWith"],
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
    symbol: "starts_with",
    interactName: "stringStartsWith",
    function: (substring: string): TypeLambda<string, iBoolean> => {
      return (fullString: string): iBoolean => {
        return new iBoolean(fullString.startsWith(substring));
      };
    },
  },