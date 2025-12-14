OBJECT_ENTITY_MOUNTED: {
    internalName: "integrateddynamics:entity_mounted",
    nicknames: ["EntityMounted", "entitys_mounted", "entitysMounted"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: { type: "List", listType: { type: "Entity" } },
    },
    symbol: "mounted",
    interactName: "entityMounted",
    function: (entity: Entity): iBoolean => {
      return entity.isEntityMounted();
    },
  },