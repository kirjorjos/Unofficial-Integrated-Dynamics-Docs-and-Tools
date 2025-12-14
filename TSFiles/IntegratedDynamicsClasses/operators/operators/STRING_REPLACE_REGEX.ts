STRING_REPLACE_REGEX: {
    internalName: "integrateddynamics:string_replace_regex",
    nicknames: ["stringReplaceRegex"],
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
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "String",
          },
        },
      },
    },
    symbol: "replace_regex",
    interactName: "stringReplaceRegex",
    function: (regexString: string) => {
      return (replacementString: string): TypeLambda<string, string> => {
        return (fullString: string): string => {
          const regex = new RE2(regexString, "u");
          return fullString.replace(regex, replacementString);
        };
      };
    },
  },