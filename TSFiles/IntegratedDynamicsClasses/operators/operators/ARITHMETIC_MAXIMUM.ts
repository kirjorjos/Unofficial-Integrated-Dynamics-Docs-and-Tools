ARITHMETIC_MAXIMUM: {
    internalName: "integrateddynamics:arithmetic_maximum",
    nicknames: ["max", "arithmeticMaximum"],
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
    symbol: "max",
    interactName: "numberMax",
    function: (
      num1: TypeNumber
    ): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
      return (num2: TypeNumber): Promise<TypeNumber> => {
        return JavaMath.max(num1, num2);
      };
    },
  },