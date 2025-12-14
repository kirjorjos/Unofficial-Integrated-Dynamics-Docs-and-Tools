STRING_CONTAINS_REGEX: {
    internalName: "integrateddynamics:string_contains_regex",
    nicknames: ["containsRegex"],
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
    symbol: "contains_regex",
    interactName: "stringContainsRegex",
    function: (regexString: string): TypeLambda<string, iBoolean> => {
      return (fullString: string): iBoolean => {
        const regex = new RE2(regexString, "u");
        return new iBoolean(regex.test(fullString));
      };
    },
  },