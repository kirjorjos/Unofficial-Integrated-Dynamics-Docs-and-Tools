RELATIONAL_NOTEQUALS: {
    internalName: "integrateddynamics:relational_notequals",
    nicknames: ["relationalNotequals", "!="],
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
    symbol: "!=",
    interactName: "anyNotEquals",
    function: (
      value1: IntegratedValue
    ): TypeLambda<IntegratedValue, iBoolean> => {
      return (value2: IntegratedValue): iBoolean => {
        return new iBoolean(!value1.equals(value2));
      };
    },
  },