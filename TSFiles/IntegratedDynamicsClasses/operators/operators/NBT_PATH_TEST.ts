NBT_PATH_TEST: {
    internalName: "integrateddynamics:nbt_path_test",
    nicknames: ["NBTPathTest"],
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
          type: "Boolean",
        },
      },
    },
    symbol: "NBT.path_test",
    interactName: "stringNbtPathTest",
    function: (path: string): TypeLambda<CompoundTag, iBoolean> => {
      return (nbt: CompoundTag): iBoolean => {
        let expression = NbtPath.parse(path);
        if (!expression) throw new Error(`Invalid path: ${path}`);
        return new iBoolean(expression.test(nbt));
      };
    },
  },