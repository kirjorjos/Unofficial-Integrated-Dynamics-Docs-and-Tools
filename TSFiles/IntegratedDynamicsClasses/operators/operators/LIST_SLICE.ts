LIST_SLICE: {
    internalName: "integrateddynamics:list_slice",
    nicknames: ["listSlice", "slice"],
    parsedSignature: {
      type: "Function",
      from: { type: "List", listType: { type: "Any", typeID: 1 } },
      to: {
        type: "Function",
        from: {
          type: "Integer",
        },
        to: {
          type: "Function",
          from: {
            type: "Integer",
          },
          to: { type: "List", listType: { type: "Any", typeID: 1 } },
        },
      },
    },
    symbol: "slice",
    interactName: "listSlice",
    function: async <T>(
      list: Array<T>
    ): Promise<
      TypeLambda<Integer, Promise<TypeLambda<Integer, Promise<Array<T>>>>>
    > => {
      return async (
        start: Integer
      ): Promise<TypeLambda<Integer, Promise<Array<T>>>> => {
        return async (end: Integer): Promise<Array<T>> => {
          if (
            (await JavaMath.lt(start, new Integer(0))) ||
            (await JavaMath.gt(end, new Integer(list.length))) ||
            (await JavaMath.gt(start, end))
          ) {
            throw new Error(
              `Invalid slice range: [${start.toDecimal()}, ${end.toDecimal()}) for list of length ${list.length}`
            );
          }
          return list.slice(
            parseInt(start.toDecimal()),
            parseInt(end.toDecimal())
          );
        };
      };
    },
  },