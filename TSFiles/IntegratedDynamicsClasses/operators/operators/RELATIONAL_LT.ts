RELATIONAL_LT: {
    internalName: "integrateddynamics:relational_lt",
    nicknames: ["relationalLt", "<"],
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
    symbol: "<",
    interactName: "numberLessThan",
    function: (num1: TypeNumber): TypeLambda<TypeNumber, iBoolean> => {
      return (num2: TypeNumber): iBoolean => {
        return new iBoolean(JavaMath.lt(num1, num2));
      };
    },
  },