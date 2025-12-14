OBJECT_ENTITY_HEIGHT: {
    internalName: "integrateddynamics:entity_height",
    nicknames: [
      "EntityHeight",
      "entity_height",
      "entityHeight",
      "entityHeight"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Float",
      },
    },
    symbol: "height",
    interactName: "entityHeight",
    function: (entity: Entity): Double => {
      return entity.getHeight();
    },
  },