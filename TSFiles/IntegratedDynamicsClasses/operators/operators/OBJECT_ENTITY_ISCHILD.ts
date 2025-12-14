OBJECT_ENTITY_ISCHILD: {
    internalName: "integrateddynamics:entity_ischild",
    nicknames: ["isChild", "EntityIschild", "entity_is_child", "entityIsChild"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "is_child",
    interactName: "entityIsChild",
    function: (entity: Entity): iBoolean => {
      return entity.isChild();
    },
  },