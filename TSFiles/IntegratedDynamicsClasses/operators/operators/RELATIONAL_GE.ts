RELATIONAL_GE: {
    internalName: "integrateddynamics:relational_ge",
    nicknames: ["relationalGe", ">="],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Number",
      },
      to: {
        type: "Function",
        from: {
          type: "Number",
        },
        to: {
          type: "Boolean",
        },
      },
    },
    symbol: ">=",
    interactName: "anyGreaterThanOrEquals",
    function: (num1: TypeNumber): TypeLambda<TypeNumber, iBoolean> => {
      return (num2: TypeNumber): iBoolean => {
        return new iBoolean(JavaMath.gte(num1, num2));
      };
    },
  },