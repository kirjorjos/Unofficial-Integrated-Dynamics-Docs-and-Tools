GENERAL_CHOICE: {
    internalName: "integrateddynamics:general_choice",
    nicknames: ["generalChoice", "choice"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Boolean",
      },
      to: {
        type: "Function",
        from: {
          type: "Any",
          typeID: 1,
        },
        to: {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1,
          },
          to: {
            type: "Any",
            typeID: 1,
          },
        },
      },
    },
    symbol: "?",
    interactName: "booleanChoice",
    function: <T>(bool: iBoolean): TypeLambda<T, TypeLambda<T, T>> => {
      return (trueValue: T): TypeLambda<T, T> => {
        return (falseValue: T): T => {
          return bool ? trueValue : falseValue;
        };
      };
    },
  },