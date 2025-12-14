OBJECT_ENTITY_ISMOB: {
    internalName: "integrateddynamics:entity_ismob",
    nicknames: [
      "EntityIsmob",
      "entity_is_mob",
      "entityIsMob",
      "isMob"
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
    symbol: "is_mob",
    interactName: "entityIsMob",
    function: (entity: Entity): iBoolean => {
      return entity.isMob();
    },
  },