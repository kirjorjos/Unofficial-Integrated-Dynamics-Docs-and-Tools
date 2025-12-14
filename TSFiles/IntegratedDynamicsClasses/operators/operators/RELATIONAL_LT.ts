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
    function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<iBoolean>> => {
      return async (num2: TypeNumber): Promise<iBoolean> => {
        return new iBoolean(await JavaMath.lt(num1, num2));
      };
    },
  },