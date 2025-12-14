UNIQUELY_NAMED_UNIQUE_NAME: {
    internalName: "integrateddynamics:string_unique_name",
    nicknames: ["uname", "uniquelynamedUniquename"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "UniquelyNamed",
      },
      to: {
        type: "String",
      },
    },
    symbol: "uname",
    interactName: "uniquely_namedUniqueName",
    function: (uniquelyNamed: UniquelyNamed): string => {
      return uniquelyNamed.getUniqueName();
    },
  },