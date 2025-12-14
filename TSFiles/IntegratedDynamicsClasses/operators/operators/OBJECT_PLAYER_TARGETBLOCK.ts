OBJECT_PLAYER_TARGETBLOCK: {
    internalName: "integrateddynamics:entity_targetblock",
    nicknames: [
      "PlayerTargetblock",
      "player_target_block",
      "playerTargetBlock"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Block",
      },
    },
    symbol: "target_block",
    interactName: "entityTargetBlock",
    function: (entity: Entity): Block => {
      return entity.getTargetBlock();
    },
  },