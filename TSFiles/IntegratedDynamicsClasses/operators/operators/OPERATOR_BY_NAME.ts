OPERATOR_BY_NAME: {
    internalName: "integrateddynamics:operator_by_name",
    nicknames: ["operatorByName", "opByName"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: { type: "Any", typeID: 2 },
      },
    },
    symbol: "op_by_name",
    interactName: "stringOperatorByName",
    function: (name: TypeOperatorInternalName): Operator<IntegratedValue, IntegratedValue> => {
      return operatorRegistry.find((op: BaseOperator<IntegratedValue, IntegratedValue>) => op.internalName === name);
    },
  },