OPERATOR_REDUCE: {
    internalName: "integrateddynamics:operator_reduce",
    nicknames: ["operatorReduce", "reduce"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: { type: "Any", typeID: 1 },
        },
      },
      to: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: { type: "Any", typeID: 1 },
        },
      },
    },
    symbol: "reduce",
    interactName: "operatorReduce",
    function: (op: Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>): TypeLambda<Array<IntegratedValue>, TypeLambda<IntegratedValue, IntegratedValue>> => {
      return (list: Array<IntegratedValue>): TypeLambda<IntegratedValue, IntegratedValue> => {
        return (startingValue: IntegratedValue): IntegratedValue => {
          let result = startingValue;
          for (let item of list) {
            result = op.apply(result).apply(item);
          }
          return result;
        };
      };
    },
  },