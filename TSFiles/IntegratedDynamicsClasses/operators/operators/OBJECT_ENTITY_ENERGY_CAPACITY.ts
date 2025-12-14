OBJECT_ENTITY_ENERGY_CAPACITY: {
    internalName: "integrateddynamics:entity_entityenergystored",
    nicknames: ["EntityEnergyCapacity", "entity_energy_capacity", "entityEnergyCapacity"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "entity_capacity_fe",
    interactName: "entityEnergyCapacity",
    function: (entity: Entity): Integer => {
      return entity.getEnergyCapacity();
    },
  },