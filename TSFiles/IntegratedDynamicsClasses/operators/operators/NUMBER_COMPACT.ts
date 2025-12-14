NUMBER_COMPACT: {
    internalName: "integrateddynamics:number_compact",
    nicknames: ["compact", "numberCompact"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Number",
      },
      to: {
        type: "String",
      },
    },
    symbol: "compact",
    interactName: "numberCompact",
    function: (number: TypeNumber): string => {
      return number.toDecimal().toString();
    },
  },