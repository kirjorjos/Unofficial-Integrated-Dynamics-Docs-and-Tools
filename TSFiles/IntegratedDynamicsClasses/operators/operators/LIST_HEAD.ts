LIST_HEAD: {
    internalName: "integrateddynamics:list_head",
    nicknames: ["listHead", "head"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: { type: "Any", typeID: 1 },
    },
    symbol: "head",
    interactName: "listHead",
    function: <T>(list: Array<T>): T => {
      if (list.length === 0) {
        throw new Error("head called on an empty list");
      }
      return list[0] as T;
    },
  },