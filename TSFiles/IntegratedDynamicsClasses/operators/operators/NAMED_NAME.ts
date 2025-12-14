NAMED_NAME: {
    internalName: "integrateddynamics:string_name",
    nicknames: ["name", "namedName", "toString"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Named",
      },
      to: {
        type: "String",
      },
    },
    symbol: "name",
    interactName: "namedName",
    function: (named: TypeRawSignatureAST.RawSignatureNamed): string => {
      return named.toString();
    },
  },