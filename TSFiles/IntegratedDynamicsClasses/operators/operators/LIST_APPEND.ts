LIST_APPEND: {
    internalName: "integrateddynamics:list_append",
    nicknames: ["listAppend", "append"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: { type: "List", listType: { type: "Any", typeID: 1 } },
      },
    },
    symbol: "append",
    interactName: "listAppend",
    function: <T>(list: Array<T>): TypeLambda<T, Array<T>> => {
      return (element: T): Array<T> => {
        return [...list, element];
      };
    },
  },