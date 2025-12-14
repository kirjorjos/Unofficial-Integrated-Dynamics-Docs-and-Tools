OPERATOR_APPLY_0: {
    internalName: "integrateddynamics:operator_apply0",
    nicknames: ["operatorApply_0", "apply0", "opByName"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Any",
        typeID: 1,
      },
      to: { type: "Any", typeID: 1 },
    },
    symbol: "apply0",
    interactName: "operatorApply0",
    serializer: "integrateddynamics:curry",
    function: (_op: Operator<IntegratedValue, IntegratedValue>): TypeLambda<undefined, IntegratedValue> => {
      return () => {
        throw new Error(`apply0 doesn't make sense to implement`);
      };
    },
  },