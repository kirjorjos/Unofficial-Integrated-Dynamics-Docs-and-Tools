BINARY_XOR: {
    internalName: "integrateddynamics:binary_xor",
    nicknames: ["binaryXor"],
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
    symbol: "^",
    interactName: "integerXor",
    function: (int1: Integer): TypeLambda<Integer, Integer> => {
      return (int2: Integer): Integer => {
        return int1.binaryXor(int2);
      };
    },
  },