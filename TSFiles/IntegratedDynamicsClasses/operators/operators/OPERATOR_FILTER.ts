OPERATOR_FILTER: {
    internalName: "integrateddynamics:operator_filter",
    nicknames: ["operatorFilter", "filter"],
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
          type: "List",
          listType: {
            type: "Any",
            typeID: 1,
          },
        },
        to: {
          type: "List",
          listType: {
            type: "Any",
            typeID: 1,
          },
        },
      },
    },
    symbol: "filter",
    interactName: "operatorFilter",
    function: (
      predicate: Predicate
    ): TypeLambda<Array<IntegratedValue>, Array<IntegratedValue>> => {
      return (list: Array<IntegratedValue>): Array<IntegratedValue> => {
        return list.filter((item) => predicate.apply(item));
      };
    },
  },