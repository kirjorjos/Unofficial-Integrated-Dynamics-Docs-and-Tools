OBJECT_BLOCK_BY_NAME: {
    internalName: "integrateddynamics:block_blockbyname",
    nicknames: ["BlockByName", "block_by_name", "blockByName"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "Block",
      },
    },
    symbol: "block_by_name",
    interactName: "stringBlockByName",
    function: (): never => {
      throw new Error(
        "Block by name is infeasible without a registry. This is a placeholder function."
      );
    },
  },