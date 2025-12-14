DOUBLE_SQRT: {
    internalName: "integrateddynamics:double_sqrt",
    nicknames: ["doubleSqrt"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Double",
      },
      to: {
        type: "Double",
      },
    },
    symbol: "sqrt",
    interactName: "doubleSqrt",
    function: (double: Double): Double => {
      return double.sqrt();
    },
  },