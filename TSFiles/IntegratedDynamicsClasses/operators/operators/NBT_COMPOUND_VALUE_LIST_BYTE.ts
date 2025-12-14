NBT_COMPOUND_VALUE_LIST_BYTE: {
    internalName: "integrateddynamics:nbt_compound_value_list_byte",
    nicknames: ["nbtCompoundValueListByte", "compoundValueListByte"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "NBT",
      },
      to: {
        type: "Function",
        from: {
          type: "String",
        },
        to: { type: "List", listType: { type: "Integer" } },
      },
    },
    symbol: "NBT{}.get_list_byte",
    interactName: "nbtGetListByte",
    function: (nbt: CompoundTag) => {
      return (key: iString): Integer[] => {
        let value = nbt.get(key) as ListTag;
        if (value.getType() !== Tag.TAG_LIST) return [new Integer(0)]
        let list = value.valueOf() as ByteTag[];
        return list.map((e: ByteTag) => e.valueOf());
      };
    },
  },