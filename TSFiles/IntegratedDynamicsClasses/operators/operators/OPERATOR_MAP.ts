OPERATOR_MAP: {
    internalName: "integrateddynamics:operator_map",
    nicknames: ["operatorMap", "map"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: { type: "Any", typeID: 2 },
      },
      to: {
        type: "Function",
        from: {
          type: "List",
          listType: { type: "Any", typeID: 1 },
        },
        to: {
          type: "List",
          listType: { type: "Any", typeID: 2 },
        },
      },
    },
    symbol: "map",
    interactName: "operatorMap",
    function: (
      op: Operator<IntegratedValue, IntegratedValue>
    ): TypeLambda<Array<IntegratedValue>, Array<IntegratedValue>> => {
      return (list: Array<IntegratedValue>): Array<IntegratedValue> => {
        return list.map((item) => op.apply(item));
      };
    },
  },