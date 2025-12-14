NULLABLE_ISNOTNULL: {
    internalName: "integrateddynamics:general_isnotnull",
    nicknames: ["isNotNull", "nullableIsnotnull"],
    parsedSignature: {
      type: "Function",
      from: { type: "Any", typeID: 1 },
      to: {
        type: "Boolean",
      },
    },
    symbol: "∅",
    interactName: "anyIsNotNull",
    function: (value: IntegratedValue): iBoolean => {
      return new iBoolean(value !== null && value !== undefined);
    },
  },