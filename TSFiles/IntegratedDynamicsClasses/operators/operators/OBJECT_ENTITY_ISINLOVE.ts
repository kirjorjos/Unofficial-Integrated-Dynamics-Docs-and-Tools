OBJECT_ENTITY_ISINLOVE: {
    internalName: "integrateddynamics:entity_isinlove",
    nicknames: [
      "EntityIsinlove", 
      "entity_is_in_love", 
      "entityIsInLove",
      "isInLove"
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
    symbol: "is_in_love",
    interactName: "entityIsInLove",
    function: (entity: Entity): iBoolean => {
      return entity.isInLove();
    },
  },