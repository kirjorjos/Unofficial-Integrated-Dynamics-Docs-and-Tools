ENTITY_HEALTH: {
    internalName: "integrateddynamics:entity_health",
    nicknames: [
      "EntityHealth",
      "entity_health",
      "entity_health_value",
      "entityHealthValue",
      "entityHealth"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Double",
      },
    },
    symbol: "health",
    interactName: "entityHealth",
    function: (entity: Entity): Double => {
      return entity.getHealth();
    },
  },