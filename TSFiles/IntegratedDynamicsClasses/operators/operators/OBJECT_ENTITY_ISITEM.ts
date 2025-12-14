OBJECT_ENTITY_ISITEM: {
    internalName: "integrateddynamics:entity_isitem",
    nicknames: [
      "EntityIsitem",
      "entity_is_item",
      "entityIsItem",
      "isItem"
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
    symbol: "is_item",
    interactName: "entityIsItem",
    function: (entity: Entity): iBoolean => {
      return entity.isItem();
    },
  },