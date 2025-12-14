STRING_INDEX_OF: {
    internalName: "integrateddynamics:string_index_of",
    nicknames: ["stringIndexOf"],
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
    symbol: "index_of",
    interactName: "stringIndexOf",
    function: (substring: string): TypeLambda<string, TypeNumber> => {
      return (fullString: string): TypeNumber => {
        return new Integer(fullString.indexOf(substring));
      };
    },
  },