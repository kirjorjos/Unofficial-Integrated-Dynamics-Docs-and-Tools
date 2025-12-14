BINARY_COMPLEMENT: {
    internalName: "integrateddynamics:binary_complement",
    nicknames: ["binaryComplement"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Integer",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "~",
    interactName: "integerComplement",
    function: (int: Integer): Integer => {
      return int.binaryComplement();
    },
  },