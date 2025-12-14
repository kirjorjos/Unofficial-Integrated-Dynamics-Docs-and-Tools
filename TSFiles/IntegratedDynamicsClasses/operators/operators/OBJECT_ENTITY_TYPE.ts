OBJECT_ENTITY_TYPE: {
    internalName: "integrateddynamics:entity_entitytype",
    nicknames: [
      "EntityType", 
      "entity_type",
      "entityType",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "String",
      },
    },
    symbol: "entity_type",
    interactName: "entityType",
    function: (entity: Entity): string => {
      return entity.getEntityType();
    },
  },