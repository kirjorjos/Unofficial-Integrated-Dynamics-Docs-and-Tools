STRING_SUBSTRING: {
    internalName: "integrateddynamics:string_substring",
    nicknames: ["substring", "stringSubstring"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Integer",
      },
      to: {
        type: "Function",
        from: {
          type: "Integer",
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
    symbol: "substring",
    interactName: "integerSubstring",
    function: (
      start: TypeNumber
    ): TypeLambda<TypeNumber, TypeLambda<string, string>> => {
      return (end: TypeNumber): TypeLambda<string, string> => {
        return (fullString: string): string => {
          return fullString.substring(
            parseInt(start.toDecimal()),
            parseInt(end.toDecimal())
          );
        };
      };
    },
  },