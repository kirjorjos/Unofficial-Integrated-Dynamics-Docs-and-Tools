LIST_EMPTY: {
    internalName: "integrateddynamics:list_empty",
    nicknames: ["listEmpty"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Boolean",
      },
    },
    symbol: "∅",
    interactName: "listIsEmpty",
    function: (list: Array<IntegratedValue>): iBoolean => {
      return new iBoolean(list.length === 0);
    },
  },