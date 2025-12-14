LIST_LAZYBUILT: {
    internalName: "integrateddynamics:list_lazybuilt",
    nicknames: ["listLazybuilt", "lazybuilt"],
    parsedSignature: {
      type: "Function",
      from: { type: "Any", typeID: 1 },
      to: {
        type: "Function",
        from: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "List",
              listType: { type: "Any", typeID: 1 },
            },
          },
        },
        to: { type: "List", listType: { type: "Any", typeID: 1 } },
      },
    },
    symbol: "lazybuilt",
    interactName: "anyLazyBuilt",
    function: <T>(
      initial: T
    ): TypeLambda<TypeLambda<T, T>, InfiniteList<T>> => {
      return (builder: TypeLambda<T, T>): InfiniteList<T> => {
        return new InfiniteList(initial, builder);
      };
    },
  },