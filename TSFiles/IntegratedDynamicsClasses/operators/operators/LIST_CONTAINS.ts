LIST_CONTAINS: {
    internalName: "integrateddynamics:list_contains",
    nicknames: ["listContains"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: {
          type: "Boolean",
        },
      },
    },
    symbol: "contains",
    interactName: "listContains",
    function: <T>(list: Array<T>): TypeLambda<T, iBoolean> => {
      return (element: T): iBoolean => {
        return new iBoolean(list.includes(element));
      };
    },
  },