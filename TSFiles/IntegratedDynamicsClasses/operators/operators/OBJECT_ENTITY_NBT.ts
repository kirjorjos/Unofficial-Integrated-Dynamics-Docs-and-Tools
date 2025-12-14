OBJECT_ENTITY_NBT: {
    internalName: "integrateddynamics:entity_nbt",
    nicknames: ["EntityNbt", "entity_nbt", "canBreed", "entityNBT"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT()",
    interactName: "entityNbt",
    function: (entity: Entity): CompoundTag => {
      return entity.getNBT();
    },
  },