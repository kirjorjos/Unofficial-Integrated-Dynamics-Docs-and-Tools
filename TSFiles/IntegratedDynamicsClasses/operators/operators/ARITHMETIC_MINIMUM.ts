ARITHMETIC_MINIMUM: {
    internalName: "integrateddynamics:arithmetic_minimum",
    nicknames: ["min", "arithmeticMinimum"],
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
    symbol: "min",
    interactName: "numberMin",
    function: (
      num1: TypeNumber
    ): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
      return (num2: TypeNumber): Promise<TypeNumber> => {
        return JavaMath.min(num1, num2);
      };
    },
  },