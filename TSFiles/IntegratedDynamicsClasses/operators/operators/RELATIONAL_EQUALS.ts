RELATIONAL_EQUALS: {
    internalName: "integrateddynamics:relational_equals",
    nicknames: ["==", "relationalEquals"],
    parsedSignature: {
      type: "Function",
      from: { type: "Any", typeID: 1 },
      to: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: {
          type: "Boolean",
        },
      },
    },
    symbol: "==",
    interactName: "anyEquals",
    function: (
      value1: IntegratedValue
    ): TypeLambda<IntegratedValue, iBoolean> => {
      return (value2: IntegratedValue): iBoolean => {
        return value1.equals(value2);
      };
    },
  },