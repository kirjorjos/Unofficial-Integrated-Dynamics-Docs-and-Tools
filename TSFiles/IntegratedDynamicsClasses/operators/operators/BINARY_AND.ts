BINARY_AND: {
    internalName: "integrateddynamics:binary_and",
    nicknames: ["binaryAnd"],
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
    symbol: "&",
    interactName: "integerBinaryAnd",
    function: (int1: Integer): TypeLambda<Integer, Integer> => {
      return (int2: Integer): Integer => {
        return int1.binaryAnd(int2);
      };
    },
  },