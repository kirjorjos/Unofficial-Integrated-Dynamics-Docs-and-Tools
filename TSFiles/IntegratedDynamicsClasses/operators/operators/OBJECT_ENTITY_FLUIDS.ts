OBJECT_ENTITY_FLUIDS: {
    internalName: "integrateddynamics:entity_entityfluids",
    nicknames: ["EntityFluids", "entity_fluids", "entityFluids"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: { type: "List", listType: { type: "Fluid" } },
    },
    symbol: "entity_fluids",
    interactName: "entityFluids",
    function: (entity: Entity): Array<Fluid> => {
      return entity.getFluids();
    },
  },