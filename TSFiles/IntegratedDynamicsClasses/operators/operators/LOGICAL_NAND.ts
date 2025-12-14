LOGICAL_NAND: {
    internalName: "integrateddynamics:logical_nand",
    nicknames: ["nand", "logicalNand"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Boolean",
      },
      to: {
        type: "Function",
        from: {
          type: "Boolean",
        },
        to: {
          type: "Boolean",
        },
      },
    },
    symbol: "!&&",
    interactName: "booleanNand",
    function: (
      func1: TypeLambda<iBoolean, iBoolean>
    ): TypeLambda<
      TypeLambda<iBoolean, iBoolean>,
      TypeLambda<iBoolean, iBoolean>
    > => {
      return (
        func2: TypeLambda<iBoolean, iBoolean>
      ): TypeLambda<iBoolean, iBoolean> => {
        return (input: iBoolean): iBoolean => {
          return new iBoolean(!(func1(input).valueOf() && func2(input)));
        };
      };
    },
  },