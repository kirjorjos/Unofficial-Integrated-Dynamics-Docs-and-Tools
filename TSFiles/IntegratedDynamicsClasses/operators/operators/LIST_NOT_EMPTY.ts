LIST_NOT_EMPTY: {
    internalName: "integrateddynamics:list_notempty",
    nicknames: ["listNotEmpty"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Boolean",
      },
    },
    symbol: "o",
    interactName: "listIsNotEmpty",
    function: (list: Array<IntegratedValue>): iBoolean => {
      return new iBoolean(list.length > 0);
    },
  },