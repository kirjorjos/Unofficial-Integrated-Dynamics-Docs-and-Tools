OBJECT_ENTITY_MODNAME: {
    internalName: "integrateddynamics:entity_mod",
    nicknames: [
      "EntityMod",
      "entity_mod",
      "entityMod",
      "entityModName"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "String",
      },
    },
    symbol: "entity_mod",
    interactName: "entityMod",
    function: (entity: Entity): iString => {
      return new iString(entity.getModName());
    },
  },