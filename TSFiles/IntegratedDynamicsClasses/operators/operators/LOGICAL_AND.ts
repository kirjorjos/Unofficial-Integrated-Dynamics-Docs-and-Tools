LOGICAL_AND: {
    internalName: "integrateddynamics:logical_and",
    nicknames: ["and", "logicalAnd"],
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
    symbol: "&&",
    interactName: "booleanAnd",
    function: (bool1: iBoolean): TypeLambda<iBoolean, iBoolean> => {
      return (bool2: iBoolean): iBoolean => {
        return bool1 && bool2;
      };
    },
  },