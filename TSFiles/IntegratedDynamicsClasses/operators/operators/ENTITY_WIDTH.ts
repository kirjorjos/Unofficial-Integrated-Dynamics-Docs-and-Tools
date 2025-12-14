ENTITY_WIDTH: {
    internalName: "integrateddynamics:entity_width",
    nicknames: ["EntityWidth", "entity_width", "entityWidth"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Double",
      },
    },
    symbol: "width",
    interactName: "entityWidth",
    function: (entity: Entity): Double => {
      return entity.getWidth();
    },
  },