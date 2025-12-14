STRING_ERROR: {
    internalName: "integrateddynamics:string_string_error",
    nicknames: ["error", "string_error"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: { type: "Any", typeID: 1 },
    },
    symbol: "error",
    interactName: "stringStringError",
    function: (message: string): never => {
      throw new Error(`Error: ${message}`);
    },
  },