RELATIONAL_GT: {
    internalName: "integrateddynamics:relational_gt",
    nicknames: ["relationalGt", ">"],
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
    symbol: ">",
    interactName: "numberGreaterThan",
    function: (num1: TypeNumber): TypeLambda<TypeNumber, iBoolean> => {
      return (num2: TypeNumber): iBoolean => {
        return new iBoolean(JavaMath.gt(num1, num2));
      };
    },
  },