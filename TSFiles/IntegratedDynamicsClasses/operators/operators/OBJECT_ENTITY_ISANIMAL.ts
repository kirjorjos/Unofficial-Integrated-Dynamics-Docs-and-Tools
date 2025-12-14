OBJECT_ENTITY_ISANIMAL: {
    internalName: "integrateddynamics:entity_isanimal",
    nicknames: ["EntityIsanimal", "entity_is_animal", "entityIsAnimal", "isAnimal"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_animal",
    interactName: "entityIsAnimal",
    function: (entity: Entity): iBoolean => {
      return entity.isAnimal();
    },
  },