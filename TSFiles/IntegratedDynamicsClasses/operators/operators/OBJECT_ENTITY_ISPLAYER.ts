OBJECT_ENTITY_ISPLAYER: {
    internalName: "integrateddynamics:entity_isplayer",
    nicknames: [
      "EntityIsplayer",
      "entity_is_player",
      "entityIsPlayer",
      "isPlayer"
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
    symbol: "is_player",
    interactName: "entityIsPlayer",
    function: (entity: Entity): iBoolean => {
      return entity.isPlayer();
    },
  },