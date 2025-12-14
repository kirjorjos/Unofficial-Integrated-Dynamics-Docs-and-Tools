OPERATOR_PIPE2: {
    internalName: "integrateddynamics:operator_pipe2",
    nicknames: ["operatorPipe2", "pipe.2", "pipe2"],
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
          from: { type: "Any", typeID: 1 },
          to: { type: "Any", typeID: 3 },
        },
        to: {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 2 },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 3 },
              to: { type: "Any", typeID: 4 },
            },
          },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 4 },
          },
        },
      },
    },
    symbol: ".2",
    interactName: "operatorPipe2",
    serializer: "integrateddynamics:combined.pipe",
    function: (
      f: Operator<IntegratedValue, IntegratedValue>
    ): TypeLambda<
      Operator<IntegratedValue, IntegratedValue>,
      TypeLambda<Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>, TypeLambda<IntegratedValue, IntegratedValue>>
    > => {
      return (
        g: Operator<IntegratedValue, IntegratedValue>
      ): TypeLambda<Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>, TypeLambda<IntegratedValue, IntegratedValue>> => {
        return (h: Operator<IntegratedValue, Operator<IntegratedValue, IntegratedValue>>): TypeLambda<IntegratedValue, IntegratedValue> => {
          f.parsedSignature.typeMap.unify(
            f.parsedSignature.getOutput(),
            h.parsedSignature.getInput(0)
          );
          g.parsedSignature.typeMap.unify(
            g.parsedSignature.getOutput(),
            h.parsedSignature.getInput(1)
          );

          return (x: IntegratedValue): IntegratedValue => {
            return h.apply(f.apply(x)).apply(g.apply(x));
          };
        };
      };
    },
  },