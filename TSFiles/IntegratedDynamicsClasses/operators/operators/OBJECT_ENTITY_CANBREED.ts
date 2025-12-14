OBJECT_ENTITY_CANBREED: {
    internalName: "integrateddynamics:entity_canbreed",
    nicknames: ["EntityCanbreed", "entity_can_breed", "entityCanBreed", "canBreed"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "canbreed",
    interactName: "entityCanBreed",
    function: (entity: Entity): iBoolean => {
      return entity.canBreed();
    },
  },