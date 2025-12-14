OBJECT_ENTITY_DEATHSOUND: {
    internalName: "integrateddynamics:entity_deathsound",
    nicknames: ["entityDeathSound", "EntityDeathsound", "entity_death_sound"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "String",
      },
    },
    symbol: "deathsound",
    interactName: "entityDeathSound",
    function: (entity: Entity): string => {
      return entity.getDeathSound();
    },
  },