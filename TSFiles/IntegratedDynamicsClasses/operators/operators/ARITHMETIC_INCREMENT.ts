ARITHMETIC_INCREMENT: {
    internalName: "integrateddynamics:arithmetic_increment",
    nicknames: ["increment", "arithmeticIncrement"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Number",
      },
      to: {
        type: "Number",
      },
    },
    symbol: "++",
    interactName: "numberIncrement",
    function: async (num1: TypeNumber): Promise<TypeNumber> => {
      return JavaMath.add(num1, new Integer(1));
    },
  },