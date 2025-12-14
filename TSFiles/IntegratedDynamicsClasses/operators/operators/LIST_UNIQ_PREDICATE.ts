LIST_UNIQ_PREDICATE: {
    internalName: "integrateddynamics:list_uniq_p",
    nicknames: ["listUniqPredicate"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Function",
        from: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean",
            },
          },
        },
        to: { type: "List", listType: { type: "Any", typeID: 1 } },
      },
    },
    symbol: "uniq_p",
    interactName: "listUniquePredicate",
    function: (
      list: Array<IntegratedValue>
    ): TypeLambda<TypeLambda<IntegratedValue, iBoolean>, Array<IntegratedValue>> => {
      return (predicate: Predicate): Array<IntegratedValue> => {
        const seen = new Set();
        return list.filter((item) => {
          const key = predicate.apply(item);
          if (seen.has(key)) {
            return false;
          } else {
            seen.add(key);
            return true;
          }
        });
      };
    },
  },