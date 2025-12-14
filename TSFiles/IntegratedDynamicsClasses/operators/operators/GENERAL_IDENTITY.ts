GENERAL_IDENTITY: {
    internalName: "integrateddynamics:general_identity",
    nicknames: ["generalIdentity"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Any",
        typeID: 1,
      },
      to: {
        type: "Any",
        typeID: 1,
      },
    },
    symbol: "id",
    interactName: "anyIdentity",
    function: (value: IntegratedValue): IntegratedValue => {
      return value;
    },
  },