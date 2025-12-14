OBJECT_ENTITY_ISSHEARABLE: {
    internalName: "integrateddynamics:entity_isshearable",
    nicknames: [
      "EntityIsshearable",
      "entity_is_shearable",
      "entityIsShearable",
      "entityIsShearable",
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
    symbol: "is_shearable",
    interactName: "entityIsShearable",
    function: (entity: Entity): iBoolean => {
      return entity.isShearable();
    },
  },