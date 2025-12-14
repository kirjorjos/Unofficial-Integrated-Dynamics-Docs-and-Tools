OPERATOR_APPLY_2: {
    internalName: "integrateddynamics:operator_apply2",
    nicknames: ["operatorApply_2", "apply2", "opByName"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: {
          type: "Function",
          from: { type: "Any", typeID: 2 },
          to: { type: "Any", typeID: 3 },
        },
      },
      to: {
        type: "Function",
        from: {
          type: "Any",
          typeID: 1,
        },
        to: {
          type: "Function",
          from: {
            type: "Any",
            typeID: 2,
          },
          to: {
            type: "Any",
            typeID: 3,
          },
        },
      },
    },
    symbol: "apply2",
    interactName: "operatorApply2",
    serializer: "integrateddynamics:curry",
    function: (
      op: Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>
    ): TypeLambda<
      IntegratedValue,
      TypeLambda<IntegratedValue, IntegratedValue>
    > => {
      return (
        arg1: IntegratedValue
      ): TypeLambda<IntegratedValue, IntegratedValue> => {
        return (arg2: IntegratedValue): IntegratedValue => {
          globalMap.unify(op.parsedSignature.getInput(0), arg1);
          globalMap.unify(op.parsedSignature.getInput(1), arg2);
          return op.apply(arg1).apply(arg2);
        };
      };
    },
  },