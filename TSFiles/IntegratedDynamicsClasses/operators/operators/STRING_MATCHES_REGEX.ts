STRING_MATCHES_REGEX: {
    internalName: "integrateddynamics:string_matches_regex",
    nicknames: ["matchesRegex"],
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
    symbol: "matches_regex",
    interactName: "stringMatchesRegex",
    function: (regexString: string): TypeLambda<string, iBoolean> => {
      return (fullString: string): iBoolean => {
        if (regexString.startsWith("^")) regexString = regexString.slice(1);
        if (regexString.endsWith("$")) regexString = regexString.slice(0, -1);
        const regex = new RE2(`^(?:${regexString})$`, "u");
        return new iBoolean(regex.test(fullString));
      };
    },
  },