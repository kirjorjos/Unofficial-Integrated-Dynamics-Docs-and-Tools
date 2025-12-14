OBJECT_ENTITY_ISWET: {
    internalName: "integrateddynamics:entity_iswet",
    nicknames: [
      "EntityIswet",
      "entity_is_wet",
      "entityIsWet",
      "isWet"
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
    symbol: "is_wet",
    interactName: "entityIsWet",
    function: (entity: Entity): iBoolean => {
      return entity.isWet();
    },
  },