LIST_EQUALS_SET: {
    internalName: "integrateddynamics:list_equals_set",
    nicknames: ["listEqualsSet", "equalsSet"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Boolean",
        },
      },
    },
    symbol: "=set=",
    interactName: "listEquals_set",
    function: <T extends IntegratedValue>(
      list1: Array<T>
    ): TypeLambda<Array<T>, iBoolean> => {
      return (list2: Array<T>): iBoolean => {
        const set1 = new Set(list1);
        const set2 = new Set(list2);
        if (
          set1.size !== set2.size ||
          set1.size !== new Set([...set1, ...set2]).size
        )
          return new iBoolean(false);
        return new iBoolean(true);
      };
    },
  },