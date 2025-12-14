GENERAL_CONSTANT: {
    internalName: "integrateddynamics:general_constant",
    nicknames: ["generalConstant"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Any",
        typeID: 1,
      },
      to: {
        type: "Function",
        from: {
          type: "Any",
          typeID: 2,
        },
        to: {
          type: "Any",
          typeID: 1,
        },
      },
    },
    symbol: "K",
    interactName: "anyConstant",
    function: (value: IntegratedValue): TypeLambda<void, IntegratedValue> => {
      return () => {
        return value;
      };
    },
  },