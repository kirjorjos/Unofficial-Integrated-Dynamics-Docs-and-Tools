NUMBER_CEIL: {
    internalName: "integrateddynamics:number_ceil",
    nicknames: ["ceil", "numberCeil"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Number",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "⌈ ⌉",
    interactName: "numberCeil",
    function: (number: TypeNumber): Integer => {
      return number.ceil();
    },
  },