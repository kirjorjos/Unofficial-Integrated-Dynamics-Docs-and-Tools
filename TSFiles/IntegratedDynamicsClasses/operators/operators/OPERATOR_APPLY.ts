OPERATOR_APPLY: {
    internalName: "integrateddynamics:operator_apply",
    nicknames: ["operatorApply", "apply", "opByName"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: { type: "Any", typeID: 2 },
      },
      to: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: { type: "Any", typeID: 2 },
      },
    },
    symbol: "apply",
    interactName: "operatorApply",
    serializer: "integrateddynamics:curry",
    function: (op: Operator<IntegratedValue, IntegratedValue>) => {
      return (arg: IntegratedValue) => {
        globalMap.unify(op.parsedSignature.getInput(0), arg);
        return op.apply(arg);
      };
    },
  },