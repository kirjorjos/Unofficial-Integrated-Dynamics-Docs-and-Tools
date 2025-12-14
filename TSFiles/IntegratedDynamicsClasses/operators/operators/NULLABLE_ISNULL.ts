NULLABLE_ISNULL: {
    internalName: "integrateddynamics:general_isnull",
    nicknames: ["isNull", "nullableIsnull", "GENERAL_IS_NULL"],
    parsedSignature: {
      type: "Function",
      from: { type: "Any", typeID: 1 },
      to: {
        type: "Boolean",
      },
    },
    symbol: "o",
    interactName: "anyIsNull",
    function: (value: IntegratedValue): iBoolean => {
      return new iBoolean(value === null || value === undefined);
    },
  },