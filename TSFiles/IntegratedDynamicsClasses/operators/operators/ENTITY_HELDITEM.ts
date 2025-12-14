ENTITY_HELDITEM: {
    internalName: "integrateddynamics:entity_helditem",
    nicknames: [
      "EntityHelditemMain",
      "entity_held_item_main",
      "entityHeldItemMain",
      "heldItemMain",
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
    symbol: "held_item_1",
    interactName: "entityHeldItem",
    function: (entity: Entity): Item => {
      return entity.getHeldItemMain();
    },
  },