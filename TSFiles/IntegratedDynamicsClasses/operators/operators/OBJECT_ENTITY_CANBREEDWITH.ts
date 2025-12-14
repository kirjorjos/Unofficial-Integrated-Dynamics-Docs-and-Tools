OBJECT_ENTITY_CANBREEDWITH: {
    internalName: "integrateddynamics:entity_canbreedwith",
    nicknames: [
      "EntityCanbreedwith",
      "entity_can_breed_with",
      "entityCanBreedWith",
      "canBreedWith",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Function",
        from: {
          type: "Entity",
        },
        to: {
          type: "Boolean",
        },
      },
    },
    symbol: "can_breed_with",
    interactName: "entityCanBreedWith",
    function: (entity1: Entity): TypeLambda<Entity, iBoolean> => {
      return (entity2: Entity): iBoolean => {
        return new iBoolean(entity1.getBreadableList().includes(entity2.getUniqueName()));
      };
    },
  },