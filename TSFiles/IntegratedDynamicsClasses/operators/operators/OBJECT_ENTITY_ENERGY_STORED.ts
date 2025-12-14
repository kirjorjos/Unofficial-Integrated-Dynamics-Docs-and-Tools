OBJECT_ENTITY_ENERGY_STORED: {
    internalName: "integrateddynamics:entity_entityenergystored",
    nicknames: ["EntityEnergyStored", "entity_energy_stored", "entityEnergyStored"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "entity_stored_fe",
    interactName: "entityEnergy",
    function: (entity: Entity): Integer => {
      return entity.getEnergyStored();
    },
  },