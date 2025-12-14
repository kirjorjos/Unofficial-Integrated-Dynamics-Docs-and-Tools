STRING_LENGTH: {
    internalName: "integrateddynamics:string_length",
    nicknames: ["stringLength"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "len",
    interactName: "stringLength",
    function: (str: string): TypeNumber => {
      return new Integer(str.length);
    },
  },