NUMBER_FLOOR: {
    internalName: "integrateddynamics:number_floor",
    nicknames: ["floor", "numberFloor"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Number",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "⌊ ⌋",
    interactName: "numberFloor",
    function: (number: TypeNumber): Promise<Integer> => {
      return number.floor();
    },
  },