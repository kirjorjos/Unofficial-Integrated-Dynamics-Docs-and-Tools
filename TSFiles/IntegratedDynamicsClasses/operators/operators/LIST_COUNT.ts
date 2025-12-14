LIST_COUNT: {
    internalName: "integrateddynamics:list_count",
    nicknames: ["listCount"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: {
          type: "Integer",
        },
      },
    },
    symbol: "count",
    interactName: "listCount",
    function: <T>(list: Array<T>): TypeLambda<T, Integer> => {
      return (element: T): Integer => {
        return new Integer(list.filter((item) => item === element).length);
      };
    },
  },