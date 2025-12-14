LIST_UNIQ: {
    internalName: "integrateddynamics:list_uniq",
    nicknames: ["listUniq"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: { type: "List", listType: { type: "Any", typeID: 1 } },
    },
    symbol: "uniq",
    interactName: "listUnique",
    function: <T>(list: Array<T>): Array<T> => {
      const seen = new Set();
      return list.filter((item) => {
        if (seen.has(item)) {
          return false;
        } else {
          seen.add(item);
          return true;
        }
      });
    },
  },