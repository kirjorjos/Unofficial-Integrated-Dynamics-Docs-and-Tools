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
    function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<iBoolean>> => {
      return async (num2: TypeNumber): Promise<iBoolean> => {
        return new iBoolean(await JavaMath.lte(num1, num2));
      };
    },
  },