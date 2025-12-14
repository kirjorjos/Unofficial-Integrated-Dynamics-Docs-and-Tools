BINARY_OR: {
    internalName: "integrateddynamics:binary_or",
    nicknames: ["binaryOr"],
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
          type: "Integer",
        },
      },
    },
    symbol: "|",
    interactName: "integerBinaryOr",
    function: (int1: Integer): TypeLambda<Integer, Integer> => {
      return (int2: Integer): Integer => {
        return int1.binaryOr(int2);
      };
    },
  },