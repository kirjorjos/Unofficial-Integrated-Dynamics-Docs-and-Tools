ARITHMETIC_ADDITION: {
    internalName: "integrateddynamics:arithmetic_addition",
    nicknames: ["add", "arithmeticAddition"],
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
    symbol: "+",
    interactName: "numberAdd",
    function: async (
      num1: TypeNumber
    ): Promise<TypeLambda<TypeNumber, Promise<TypeNumber>>> => {
      return async (num2: TypeNumber): Promise<TypeNumber> => {
        return JavaMath.add(num1, num2);
      };
    },
  },