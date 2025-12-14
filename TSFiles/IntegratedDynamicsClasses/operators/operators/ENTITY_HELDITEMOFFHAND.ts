ENTITY_HELDITEMOFFHAND: {
    internalName: "integrateddynamics:entity_helditemoffhand",
    nicknames: [
      "EntityHelditemOff",
      "entity_held_item_off",
      "entityHeldItemOff",
      "heldItemOff",
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
    symbol: "held_item_2",
    interactName: "entityHeldItemOffHand",
    function: (entity: Entity): Item => {
      return entity.getHeldItemOffHand();
    },
  },