OPERATOR_FLIP: {
    internalName: "integrateddynamics:operator_flip",
    nicknames: ["operatorFlip", "flip"],
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
          typeID: 2,
        },
        to: {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1,
          },
          to: { type: "Any", typeID: 3 },
        },
      },
    },
    symbol: "flip",
    interactName: "operatorFlip",
    serializer: "integrateddynamics:combined.flip",
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
          return op.apply(arg2).apply(arg1);
        };
      };
    },
  },