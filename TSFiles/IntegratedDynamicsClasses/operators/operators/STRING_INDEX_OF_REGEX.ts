STRING_INDEX_OF_REGEX: {
    internalName: "integrateddynamics:string_index_of_regex",
    nicknames: ["indexOfRegex", "stringIndexOfRegex"],
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
          type: "Integer",
        },
      },
    },
    symbol: "index_of_regex",
    interactName: "stringIndexOfRegex",
    function: (regexString: string): TypeLambda<string, TypeNumber> => {
      return (fullString: string): TypeNumber => {
        const regex = new RE2(regexString, "u");
        return new Integer(fullString.search(regex));
      };
    },
  },