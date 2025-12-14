OBJECT_ENTITY_HURTSOUND: {
    internalName: "integrateddynamics:entity_hurtsound",
    nicknames: ["EntityHurtsound", "entity_hurt_sound", "entityHurtSound"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "String",
      },
    },
    symbol: "hurtsound",
    interactName: "entityHurtSound",
    function: (entity: Entity): string => {
      return entity.getHurtSound();
    },
  },