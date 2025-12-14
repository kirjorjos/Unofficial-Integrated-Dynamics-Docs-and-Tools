OBJECT_ENTITY_ENTITYITEMTOOLTIP: {
    internalName: "integrateddynamics:entity_entityitemtooltip",
    nicknames: [
      "ItemstackEntityTooltip",
      "itemstack_entity_tooltip",
      "itemstackEntityTooltip",
      "item_entity_tooltip",
      "itemEntityTooltip"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Function",
        from: {
          type: "Item",
        },
        to: { type: "List", listType: { type: "String" } },
      },
    },
    symbol: "entity_item_tooltip",
    interactName: "entityEntityItemTooltip",
    function: (entity: Entity): TypeLambda<Item, Array<string>> => {
      return (item: Item): Array<string> => {
        if (entity.isPlayer()) {
          return item.getTooltip(entity);
        }
        console.warn(
          "Entity item tooltip is not fully supported for non-player entities. Returning item tooltip only."
        );
        return item.getTooltip();
      };
    },
  },