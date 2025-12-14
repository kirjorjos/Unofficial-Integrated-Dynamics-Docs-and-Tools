NBT_PATH_MATCH_FIRST: {
    internalName: "integrateddynamics:nbt_path_match_first",
    nicknames: ["nbtPathMatchFirst"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "Function",
        from: {
          type: "NBT",
        },
        to: {
          type: "NBT",
        },
      },
    },
    symbol: "NBT.path_match_first",
    interactName: "stringNbtPathMatchFirst",
    function: (path: string): TypeLambda<CompoundTag, Tag<IntegratedValue>> => {
      return (nbt: CompoundTag): Tag<IntegratedValue> => {
        let expression = NbtPath.parse(path);
        if (!expression) throw new Error(`Invalid path: ${path}`);
        return expression.match(nbt).getMatches()[0] ?? new NullTag();
      };
    },
  },