LIST_COUNT_PREDICATE: {
    internalName: "integrateddynamics:list_count_p",
    nicknames: ["listCountPredicate"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Function",
        from: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Boolean",
          },
        },
        to: {
          type: "Integer",
        },
      },
    },
    symbol: "count_p",
    interactName: "listCountPredicate",
    function: (
      list: Array<IntegratedValue>
    ): TypeLambda<TypeLambda<IntegratedValue, iBoolean>, Integer> => {
      return (predicate: Predicate): Integer => {
        return new Integer(list.filter((item) => predicate.apply(item)).length);
      };
    },
  },