NBT_PATH_MATCH_ALL: {
    internalName: "integrateddynamics:nbt_path_match_all",
    nicknames: ["nbtPathMatchAll"],
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
        to: { type: "List", listType: { type: "NBT" } },
      },
    },
    symbol: "NBT.path_match_all",
    interactName: "stringNbtPathMatchAll",
    function: (
      path: string
    ): TypeLambda<CompoundTag, Array<Tag<IntegratedValue>>> => {
      return (nbt: CompoundTag): Array<Tag<IntegratedValue>> => {
        let expression = NbtPath.parse(path);
        if (!expression) throw new Error(`Invalid path: ${path}`);
        return expression.match(nbt).getMatches();
      };
    },
  },