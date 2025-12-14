ITEMSTACK_ITEMLISTCOUNT: {
    internalName: "integrateddynamics:itemstack_itemlistcount",
    nicknames: [
      "ItemstackListCount",
      "itemstack_list_count",
      "itemstackListCount",
      "item_list_count",
      "itemListCount",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "List",
        listType: { type: "Item" },
      },
      to: {
        type: "Function",
        from: { type: "Item" },
        to: {
          type: "Integer",
        },
      },
    },
    symbol: "item_list_count",
    interactName: "listItemListCount",
    function: (items: Array<Item>): TypeLambda<Item, Integer> => {
      return (item: Item): Integer => {
        return new Integer(
          items.filter((i) => {
            try {
              return i.equals(item);
            } catch (e) {
              return false;
            }
          }).length
        );
      };
    },
  },