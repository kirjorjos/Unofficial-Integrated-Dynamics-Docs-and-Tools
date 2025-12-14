OPERATOR_REDUCE1: {
    internalName: "integrateddynamics:operator_reduce1",
    nicknames: ["operatorReduce1", "reduce1"],
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
        to: { type: "Any", typeID: 1 },
      },
    },
    symbol: "reduce1",
    interactName: "operatorReduce1",
    function: (op: Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>): TypeLambda<Array<IntegratedValue>, IntegratedValue> => {
      return (list: Array<IntegratedValue>): IntegratedValue => {
        list = [...list];
        let result = list.shift()!;
        for (let item of list) {
          result = op.apply(result).apply(item);
        }
        return result;
      };
    },
  },