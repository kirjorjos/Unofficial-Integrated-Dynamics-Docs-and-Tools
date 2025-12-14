ARITHMETIC_DECREMENT: {
    internalName: "integrateddynamics:arithmetic_decrement",
    nicknames: ["arithmeticDecrement", "decrement"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Number",
      },
      to: {
        type: "Number",
      },
    },
    symbol: "--",
    interactName: "numberDecrement",
    function: (num1: TypeNumber): Promise<TypeNumber> => {
      return JavaMath.subtract(num1, new Integer(1));
    },
  },