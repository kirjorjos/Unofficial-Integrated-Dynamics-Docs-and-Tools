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
    function: (num1: TypeNumber): TypeLambda<TypeNumber, Promise<iBoolean>> => {
      return async (num2: TypeNumber): Promise<iBoolean> => {
        return new iBoolean(await JavaMath.gt(num1, num2));
      };
    },
  },