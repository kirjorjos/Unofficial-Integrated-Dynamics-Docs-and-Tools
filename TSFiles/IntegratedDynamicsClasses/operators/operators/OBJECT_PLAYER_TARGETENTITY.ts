OBJECT_PLAYER_TARGETENTITY: {
    internalName: "integrateddynamics:entity_targetentity",
    nicknames: [
      "EntityTargetentity",
      "entity_target_entity",
      "entityTargetEntity",
      "playerTargetEntity"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Entity",
      },
    },
    symbol: "target_entity",
    interactName: "entityTargetEntity",
    function: (entity: Entity): Entity => {
      return entity.getTargetEntity();
    },
  },