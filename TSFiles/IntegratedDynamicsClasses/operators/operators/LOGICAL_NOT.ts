LOGICAL_NOT: {
    internalName: "integrateddynamics:logical_not",
    nicknames: ["not", "logicalNot"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Boolean",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "!",
    interactName: "booleanNot",
    function: (bool: iBoolean): iBoolean => {
      return new iBoolean(!bool.valueOf());
    },
  },