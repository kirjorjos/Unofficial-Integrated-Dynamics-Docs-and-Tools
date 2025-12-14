LOGICAL_NOR: {
    internalName: "integrateddynamics:logical_nor",
    nicknames: ["nor", "logicalNor"],
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
    symbol: "!||",
    interactName: "booleanNor",
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
          return new iBoolean(!(func1(input) || func2(input)));
        };
      };
    },
  },