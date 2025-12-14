OBJECT_ENTITY_AGE: {
    internalName: "integrateddynamics:entity_age",
    nicknames: ["EntityAge", "entity_age", "entityAge"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "age",
    interactName: "entityAge",
    function: (entity: Entity): Integer => {
      return entity.getAge();
    },
  },