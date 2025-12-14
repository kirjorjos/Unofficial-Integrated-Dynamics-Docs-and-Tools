DOUBLE_POW: {
    internalName: "integrateddynamics:double_pow",
    nicknames: ["doublePow", "doublePow"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Double",
      },
      to: {
        type: "Function",
        from: {
          type: "Double",
        },
        to: {
          type: "Double",
        },
      },
    },
    symbol: "pow",
    interactName: "doublePow",
    function: (base: Double): TypeLambda<Double, Double> => {
      return (exponent: Double): Double => {
        return base.pow(exponent);
      };
    },
  },