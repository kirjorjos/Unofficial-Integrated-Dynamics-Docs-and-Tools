LIST_EQUALS_MULTISET: {
    internalName: "integrateddynamics:list_equals_multiset",
    nicknames: ["listEqualsMultiset", "equalsMultiset"],
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
    symbol: "=multiset=",
    interactName: "listEquals_multiset",
    function: <T extends { equals: Function | undefined }>(
      list1: Array<T>
    ): TypeLambda<Array<T>, iBoolean> => {
      return (list2: Array<T>): iBoolean => {
        const newList1 = [...list1].sort();
        const newList2 = [...list2].sort();
        if (newList1.length !== newList2.length) {
          return new iBoolean(false);
        }
        for (let i = 0; i < newList1.length; i++) {
          if (!newList1[i] || !newList2[i]) {
            return new iBoolean(false);
          } else if (
            "equals" in (newList1[i] as T) &&
            typeof (newList1[i] as T).equals === "function"
          ) {
            if (!((newList1[i] as T).equals as Function)(newList2[i])) {
              return new iBoolean(false);
            }
          } else if (newList1[i] !== newList2[i]) {
            return new iBoolean(false);
          }
        }
        return new iBoolean(true);
      };
    },
  },