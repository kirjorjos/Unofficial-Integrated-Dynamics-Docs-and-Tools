STRING_SPLIT_ON: {
    internalName: "integrateddynamics:string_split_on",
    nicknames: ["stringSplitOn"],
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
    symbol: "split_on",
    interactName: "stringSplitOn",
    function: (delimiter: string): TypeLambda<string, Array<string>> => {
      return (fullString: string): Array<string> => {
        return fullString.split(delimiter);
      };
    },
  },