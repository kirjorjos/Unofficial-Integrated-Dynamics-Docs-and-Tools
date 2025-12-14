STRING_SPLIT_ON_REGEX: {
    internalName: "integrateddynamics:string_split_on_regex",
    nicknames: ["stringSplitOnRegex"],
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
        to: { type: "List", listType: { type: "String" } },
      },
    },
    symbol: "split_on_regex",
    interactName: "stringSplitOnRegex",
    function: (regexString: string): TypeLambda<string, Array<string>> => {
      return (fullString: string): Array<string> => {
        const regex = new RE2(regexString, "u");
        return regex.split(fullString) as string[];
      };
    },
  },