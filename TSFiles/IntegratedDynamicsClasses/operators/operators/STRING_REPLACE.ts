STRING_REPLACE: {
    internalName: "integrateddynamics:string_replace",
    nicknames: ["stringReplace"],
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
    symbol: "replace",
    interactName: "stringReplace",
    function: (
      searchString: string
    ): TypeLambda<string, TypeLambda<string, string>> => {
      return (replacementString: string): TypeLambda<string, string> => {
        return (fullString: string): string => {
          return fullString.replace(searchString, replacementString);
        };
      };
    },
  },