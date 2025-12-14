STRING_CONCAT: {
    internalName: "integrateddynamics:string_concat",
    nicknames: ["stringConcat"],
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
          type: "String",
        },
      },
    },
    symbol: "+",
    interactName: "stringConcat",
    function: (str1: string): TypeLambda<string, string> => {
      return (str2: string): string => {
        return str1.concat(str2);
      };
    },
  },