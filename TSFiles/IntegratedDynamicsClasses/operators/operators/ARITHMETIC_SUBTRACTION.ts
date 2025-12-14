ARITHMETIC_SUBTRACTION: {
    internalName: "integrateddynamics:arithmetic_subtraction",
    nicknames: ["subtract", "arithmeticSubtraction"],
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
    symbol: "-",
    interactName: "numberSubtract",
    function: (
      num1: TypeNumber
    ): TypeLambda<TypeNumber, Promise<TypeNumber>> => {
      return (num2: TypeNumber): Promise<TypeNumber> => {
        return JavaMath.subtract(num1, num2);
      };
    },
  },