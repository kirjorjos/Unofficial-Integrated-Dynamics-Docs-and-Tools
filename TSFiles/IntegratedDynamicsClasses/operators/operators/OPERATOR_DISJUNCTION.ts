OPERATOR_DISJUNCTION: {
    internalName: "integrateddynamics:operator_disjunction",
    nicknames: ["operatorDisjunction", "disjunction"],
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
    symbol: ".||.",
    interactName: "operatorDisjunction",
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