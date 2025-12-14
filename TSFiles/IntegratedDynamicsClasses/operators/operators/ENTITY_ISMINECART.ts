ENTITY_ISMINECART: {
    internalName: "integrateddynamics:entity_isminecart",
    nicknames: ["EntityIsminecart", "entity_is_minecart", "entityIsMinecart", "isMinecart"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_minecart",
    interactName: "entityIsMinecart",
    function: (entity: Entity): iBoolean => {
      return entity.isMinecart();
    },
  },