BINARY_LSHIFT: {
    internalName: "integrateddynamics:binary_lshift",
    nicknames: ["<<", "binaryLshift"],
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
    symbol: "<<",
    interactName: "integerLeftShift",
    function: (int1: Integer): TypeLambda<Integer, Integer> => {
      return (int2: Integer): Integer => {
        return int1.leftShift(int2);
      };
    },
  },