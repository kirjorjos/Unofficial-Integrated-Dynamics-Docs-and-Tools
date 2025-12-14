OPERATOR_PIPE: {
    internalName: "integrateddynamics:operator_pipe",
    nicknames: ["operatorPipe", "pipe"],
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
          type: "Function",
          from: { type: "Any", typeID: 2 },
          to: { type: "Any", typeID: 3 },
        },
        to: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: { type: "Any", typeID: 3 },
        },
      },
    },
    symbol: ".",
    interactName: "operatorPipe",
    serializer: "integrateddynamics:combined.pipe",
    function: (
      f: Operator<IntegratedValue, IntegratedValue>
    ): TypeLambda<Operator<IntegratedValue, IntegratedValue>, TypeLambda<IntegratedValue, IntegratedValue>> => {
      return (g: Operator<IntegratedValue, IntegratedValue>): TypeLambda<IntegratedValue, IntegratedValue> => {
        f.parsedSignature.pipe(g.parsedSignature);
        return (x: IntegratedValue): IntegratedValue => {
          return g.apply(f.apply(x));
        };
      };
    },
  },