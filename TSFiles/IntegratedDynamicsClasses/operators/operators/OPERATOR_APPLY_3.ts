OPERATOR_APPLY_3: {
    internalName: "integrateddynamics:operator_apply3",
    nicknames: ["operatorApply_3", "apply3", "opByName"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: {
          type: "Function",
          from: { type: "Any", typeID: 2 },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 3 },
            to: { type: "Any", typeID: 4 },
          },
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
            type: "Function",
            from: {
              type: "Any",
              typeID: 3,
            },
            to: {
              type: "Any",
              typeID: 4,
            },
          },
        },
      },
    },
    symbol: "apply3",
    interactName: "operatorApply3",
    serializer: "integrateddynamics:curry",
    function: (
      op: Operator<IntegratedValue, Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>>
    ): TypeLambda<
      IntegratedValue,
      TypeLambda<IntegratedValue, TypeLambda<IntegratedValue, IntegratedValue>>
    > => {
      return (
        arg1: IntegratedValue
      ): TypeLambda<
        IntegratedValue,
        TypeLambda<IntegratedValue, IntegratedValue>
      > => {
        return (
          arg2: IntegratedValue
        ): TypeLambda<IntegratedValue, IntegratedValue> => {
          return (arg3: IntegratedValue): IntegratedValue => {
            op.parsedSignature.typeMap.unify(
              op.parsedSignature.getInput(0),
              arg1
            );
            op.parsedSignature.typeMap.unify(
              op.parsedSignature.getInput(1),
              arg2
            );
            op.parsedSignature.typeMap.unify(
              op.parsedSignature.getInput(2),
              arg3
            );
            return op.apply(arg1).apply(arg2).apply(arg3);
          };
        };
      };
    },
  },