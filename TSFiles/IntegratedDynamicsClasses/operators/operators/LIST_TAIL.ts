LIST_TAIL: {
    internalName: "integrateddynamics:list_tail",
    nicknames: ["listTail", "tail"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: { type: "List", listType: { type: "Any", typeID: 1 } },
    },
    symbol: "tail",
    interactName: "listTail",
    function: <T>(list: Array<T>): Array<T> => {
      if (list.length === 0) {
        throw new Error("tail called on an empty list");
      }
      return list.slice(1);
    },
  },