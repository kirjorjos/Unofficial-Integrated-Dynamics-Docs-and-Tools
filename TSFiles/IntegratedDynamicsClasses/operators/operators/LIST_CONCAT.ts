LIST_CONCAT: {
    internalName: "integrateddynamics:list_concat",
    nicknames: ["listConcat"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: { type: "List", listType: { type: "Any", typeID: 1 } },
      },
    },
    symbol: "concat",
    interactName: "listConcat",
    function: <T>(list1: Array<T>): TypeLambda<Array<T>, Array<T>> => {
      return (list2: Array<T>): Array<T> => {
        return [...list1, ...list2];
      };
    },
  },