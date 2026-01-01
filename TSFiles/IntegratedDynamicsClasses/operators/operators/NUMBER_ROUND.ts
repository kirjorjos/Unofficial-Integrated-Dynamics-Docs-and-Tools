NUMBER_ROUND: {
    internalName: "integrateddynamics:number_round",
    nicknames: ["round", "numberRound"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Number",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "|| ||",
    interactName: "numberRound",
    function: (number: TypeNumber): Integer => {
      return number.round();
    },
  },