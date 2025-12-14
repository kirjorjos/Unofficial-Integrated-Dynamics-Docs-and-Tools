ENTITY_HASGUIOPEN: {
    internalName: "integrateddynamics:entity_hasguiopen",
    nicknames: ["PlayerHasguiopen", "player_has_gui_open", "playerHasGuiOpen"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "has_gui_open",
    interactName: "entityHasGuiOpen",
    function: (entity: Entity): iBoolean => {
      return entity.hasGuiOpen();
    },
  },