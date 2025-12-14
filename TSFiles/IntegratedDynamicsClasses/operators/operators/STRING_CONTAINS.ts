STRING_CONTAINS: {
    internalName: "integrateddynamics:string_contains",
    nicknames: ["stringContains"],
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
    symbol: "contains",
    interactName: "stringContains",
    function: (substring: string): TypeLambda<string, iBoolean> => {
      return (fullString: string): iBoolean => {
        return new iBoolean(fullString.includes(substring));
      };
    },
  },