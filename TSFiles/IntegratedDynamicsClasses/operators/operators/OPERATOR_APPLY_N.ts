OPERATOR_APPLY_N: {
    internalName: "integrateddynamics:operator_apply_n",
    nicknames: ["operatorApplyN", "applyn", "applyN", "opByName"],
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
          listType: {
            type: "Any",
            typeID: 1,
          },
        },
        to: { type: "Any", typeID: 3 },
      },
    },
    symbol: "apply_n",
    interactName: "operatorApply_n",
    serializer: "integrateddynamics:curry",
    function: (
      op: Operator<IntegratedValue, IntegratedValue>
    ): TypeLambda<Array<IntegratedValue>, IntegratedValue> => {
      return (args: Array<IntegratedValue>): IntegratedValue => {
        args.forEach((arg, i) => {
          if (arg === undefined || arg === null) {
            throw new Error(
              "applyn requires all arguments to be defined and non-null."
            );
          }
          const result = op.apply(arg);
          if (!(result instanceof Operator)) throw new Error(`apply_n got too big a list`);
          op.parsedSignature.typeMap.unify(op.parsedSignature.getInput(i), arg);
          op = result;
        });
        return op;
      };
    },
  },