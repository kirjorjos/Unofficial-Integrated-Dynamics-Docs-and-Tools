LIST_INTERSECTION: {
    internalName: "integrateddynamics:list_intersection",
    nicknames: ["listIntersection", "intersection"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: { type: "List", listType: { type: "Any", typeID: 1 } },
      },
    },
    symbol: "∩",
    interactName: "listIntersection",
    function: <T>(list1: Array<T>): TypeLambda<Array<T>, Array<T>> => {
      return (list2: Array<T>): Array<T> => {
        const set1 = new Set(list1);
        return list2.filter((item) => set1.has(item));
      };
    },
  },