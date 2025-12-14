LIST_CONTAINS_PREDICATE: {
    internalName: "integrateddynamics:list_contains_p",
    nicknames: ["listContainsP", "listContainsPredicate"],
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
          type: "Boolean",
        },
      },
    },
    symbol: "contains_p",
    interactName: "listContainsPredicate",
    function: (predicate: Predicate): TypeLambda<Array<IntegratedValue>, iBoolean> => {
      return (list: Array<IntegratedValue>): iBoolean => {
        return new iBoolean(list.some((item) => predicate.apply(item).valueOf()));
      };
    },
  },