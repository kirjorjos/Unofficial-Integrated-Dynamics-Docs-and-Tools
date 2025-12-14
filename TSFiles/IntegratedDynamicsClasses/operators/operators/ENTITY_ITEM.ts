ENTITY_ITEM: {
    internalName: "integrateddynamics:entity_item",
    nicknames: [
      "EntityItemstack",
      "entity_itemstack",
      "entityItemstack",
      "entity_item_stack",
      "entityItemStack",
      "entity_item",
      "entityItem",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Item",
      },
    },
    symbol: "item",
    interactName: "entityItem",
    function: (entity: Entity): Item => {
      if (entity.isItem()) {
        return entity.getItem();
      } else {
        throw new Error("Entity is not an item entity.");
      }
    },
  },