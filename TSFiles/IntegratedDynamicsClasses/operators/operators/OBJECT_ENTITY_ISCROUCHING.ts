OBJECT_ENTITY_ISCROUCHING: {
    internalName: "integrateddynamics:entity_iscrouching",
    nicknames: [
      "EntityIscrouching",
      "entity_is_crouching",
      "entityIsCrouching",
      "isCrouching"
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
    symbol: "is_crouching",
    interactName: "entityIsCrouching",
    function: (entity: Entity): iBoolean => {
      return entity.isCrouching();
    },
  },