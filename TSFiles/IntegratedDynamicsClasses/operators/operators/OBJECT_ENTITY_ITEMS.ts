OBJECT_ENTITY_ITEMS: {
    internalName: "integrateddynamics:entity_entityitems",
    nicknames: [
      "EntityItems",
      "entity_items",
      "entityItems",
      "entity_item_list",
      "entityItemList",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: { type: "List", listType: { type: "Item" } },
    },
    symbol: "entity_items",
    interactName: "entityItems",
    function: (entity: Entity): Array<Item> => {
      return entity.getItemList();
    },
  },