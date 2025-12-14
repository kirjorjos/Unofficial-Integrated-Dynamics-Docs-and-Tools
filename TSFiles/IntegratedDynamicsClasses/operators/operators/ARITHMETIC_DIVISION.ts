ARITHMETIC_DIVISION: {
    internalName: "integrateddynamics:arithmetic_division",
    nicknames: ["divide", "arithmeticDivision"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Number",
      },
      to: {
        type: "Function",
        from: {
          type: "Number",
        },
        to: {
          type: "Number",
        },
      },
    },
    symbol: "/",
    interactName: "numberDivide",
    function: (
      num1: TypeNumber
    ): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
      return (num2: TypeNumber): Promise<TypeNumber> => {
        return JavaMath.divide(num1, num2);
      };
    },
  },