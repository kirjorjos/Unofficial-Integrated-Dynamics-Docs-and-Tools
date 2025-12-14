OBJECT_ENTITY_ISEATING: {
    internalName: "integrateddynamics:entity_iseating",
    nicknames: [
      "EntityIseating",
      "entity_is_eating",
      "entityIsEating",
      "isEating"
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
    symbol: "is_eating",
    interactName: "entityIsEating",
    function: (entity: Entity): iBoolean => {
      return entity.isEating();
    },
  },