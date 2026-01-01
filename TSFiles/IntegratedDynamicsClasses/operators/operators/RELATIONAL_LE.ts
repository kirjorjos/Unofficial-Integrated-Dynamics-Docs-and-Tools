RELATIONAL_LE: {
    internalName: "integrateddynamics:relational_le",
    nicknames: ["relationalLe", "<="],
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
    symbol: "<=",
    interactName: "anyLessThanOrEquals",
    function: (num1: TypeNumber): TypeLambda<TypeNumber, iBoolean> => {
      return (num2: TypeNumber): iBoolean => {
        return new iBoolean(JavaMath.lte(num1, num2));
      };
    },
  },