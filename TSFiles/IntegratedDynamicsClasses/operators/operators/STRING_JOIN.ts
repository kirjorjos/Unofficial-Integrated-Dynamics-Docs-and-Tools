STRING_JOIN: {
    internalName: "integrateddynamics:string_join",
    nicknames: ["stringJoin"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "Function",
        from: { type: "List", listType: { type: "String" } },
        to: {
          type: "String",
        },
      },
    },
    symbol: "join",
    interactName: "stringJoin",
    function: (delimiter: string): TypeLambda<Array<string>, string> => {
      return (stringList: Array<string>): string => {
        if (stringList.some((item) => typeof item !== "string")) {
          throw new Error("stringJoin expects a list of strings");
        }
        return stringList.join(delimiter);
      };
    },
  },