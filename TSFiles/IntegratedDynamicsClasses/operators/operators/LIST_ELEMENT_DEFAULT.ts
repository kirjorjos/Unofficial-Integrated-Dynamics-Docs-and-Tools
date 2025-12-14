LIST_ELEMENT_DEFAULT: {
    internalName: "integrateddynamics:list_get_or_default",
    nicknames: ["listElementDefault", "get_or_default", "getOrDefault"],
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
          from: { type: "Any", typeID: 1 },
          to: { type: "Any", typeID: 1 },
        },
      },
    },
    symbol: "get_or_default",
    interactName: "listGetOrDefault",
    function: async <T>(
      list: Array<T>
    ): Promise<TypeLambda<Integer, Promise<TypeLambda<T, Promise<T>>>>> => {
      return async (index: Integer): Promise<TypeLambda<T, Promise<T>>> => {
        return async (defaultValue: T): Promise<T> => {
          if (
            (await JavaMath.lt(index, new Integer(0))) ||
            (await JavaMath.gte(index, new Integer(list.length)))
          ) {
            return defaultValue;
          }
          return list[parseInt(index.toDecimal())] as T;
        };
      };
    },
  },