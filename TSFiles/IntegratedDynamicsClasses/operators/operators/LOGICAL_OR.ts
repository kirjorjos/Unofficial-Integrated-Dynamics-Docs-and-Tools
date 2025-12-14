LOGICAL_OR: {
    internalName: "integrateddynamics:logical_or",
    nicknames: ["or", "logicalOr"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Boolean",
      },
      to: {
        type: "Function",
        from: {
          type: "Boolean",
        },
        to: {
          type: "Boolean",
        },
      },
    },
    symbol: "||",
    interactName: "booleanOr",
    function: (bool1: iBoolean): TypeLambda<iBoolean, iBoolean> => {
      return (bool2: iBoolean): iBoolean => {
        return bool1 || bool2;
      };
    },
  },