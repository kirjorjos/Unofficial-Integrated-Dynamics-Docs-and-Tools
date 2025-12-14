OPERATOR_CONJUNCTION: {
    internalName: "integrateddynamics:operator_conjunction",
    nicknames: ["operatorConjunction", "conjunction"],
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
    },
    symbol: ".&&.",
    interactName: "operatorConjunction",
    function: (
      predicate1: Predicate
    ): TypeLambda<Predicate, TypeLambda<IntegratedValue, iBoolean>> => {
      return (predicate2: Predicate): TypeLambda<IntegratedValue, iBoolean> => {
        return (input: IntegratedValue): iBoolean => {
          return predicate1.apply(input) && predicate2.apply(input);
        };
      };
    },
  },