LIST_ELEMENT: {
    internalName: "integrateddynamics:list_get",
    nicknames: ["listElement", "get"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Function",
        from: {
          type: "Integer",
        },
        to: { type: "Any", typeID: 1 },
      },
    },
    symbol: "get",
    interactName: "listGet",
    function: <T>(index: Integer): TypeLambda<Array<T>, Promise<T>> => {
      return async (list: Array<T>): Promise<T> => {
        if (
          (await index.lt(new Integer(0))) ||
          (await index.lte(new Integer(list.length)))
        ) {
          throw new Error(
            `Index ${index} out of bounds for list of length ${list.length}`
          );
        }
        return list[parseInt(index.toDecimal())] as T;
      };
    },
  },