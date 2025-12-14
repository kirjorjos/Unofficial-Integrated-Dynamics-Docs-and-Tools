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
    function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<iBoolean>> => {
      return async (num2: TypeNumber): Promise<iBoolean> => {
        return new iBoolean(await JavaMath.gte(num1, num2));
      };
    },
  },