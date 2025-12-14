BINARY_RZSHIFT: {
    internalName: "integrateddynamics:binary_rzshift",
    nicknames: [">>>", "binaryRzshift"],
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
    symbol: ">>>",
    interactName: "integerUnsignedRightShift",
    function: (int1: Integer): TypeLambda<Integer, Integer> => {
      return (int2: Integer): Integer => {
        return new Integer(int1.unsignedRightShift(int2));
      };
    },
  },