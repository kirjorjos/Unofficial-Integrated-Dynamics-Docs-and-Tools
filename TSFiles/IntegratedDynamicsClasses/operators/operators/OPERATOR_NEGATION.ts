OPERATOR_NEGATION: {
    internalName: "integrateddynamics:operator_negation",
    nicknames: ["operatorNegation", "negation"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: {
          type: "Boolean",
        },
      },
      to: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: {
          type: "Boolean",
        },
      },
    },
    symbol: "!.",
    interactName: "operatorNegation",
    function: (predicate: Predicate): TypeLambda<IntegratedValue, iBoolean> => {
      return (input: IntegratedValue): iBoolean => {
        return new iBoolean(!predicate.apply(input).valueOf());
      };
    },
  },