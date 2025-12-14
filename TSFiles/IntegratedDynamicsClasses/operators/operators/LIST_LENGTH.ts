LIST_LENGTH: {
    internalName: "integrateddynamics:list_length",
    nicknames: ["listLength"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Integer",
      },
    },
    symbol: "| |",
    interactName: "listLength",
    function: (list: Array<IntegratedValue>) => {
      return list.length;
    },
  },