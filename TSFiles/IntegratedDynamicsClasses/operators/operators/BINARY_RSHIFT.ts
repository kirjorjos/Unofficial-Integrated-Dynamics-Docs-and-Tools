BINARY_RSHIFT: {
    internalName: "integrateddynamics:binary_rshift",
    nicknames: [">>", "binaryRshift"],
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
    symbol: ">>",
    interactName: "integerRightShift",
    function: (int1: Integer): TypeLambda<Integer, Integer> => {
      return (int2: Integer): Integer => {
        return int1.rightShift(int2);
      };
    },
  },