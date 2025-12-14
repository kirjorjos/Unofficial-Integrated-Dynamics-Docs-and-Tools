OBJECT_ENTITY_ISBURNING: {
    internalName: "integrateddynamics:entity_isburning",
    nicknames: [
      "EntityIsburning",
      "entity_is_burning",
      "entityIsBurning",
      "isBurning"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_burning",
    interactName: "entityIsBurning",
    function: (entity: Entity): iBoolean => {
      return entity.isBurning();
    },
  },