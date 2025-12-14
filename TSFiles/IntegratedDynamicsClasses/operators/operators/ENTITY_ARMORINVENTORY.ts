ENTITY_ARMORINVENTORY: {
    internalName: "integrateddynamics:entity_armorinventory",
    nicknames: [
      "EntityArmorinventory",
      "entity_armor_inventory",
      "entityArmorInventory",
      "entity_armor",
      "entityArmor"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: { type: "List", listType: { type: "Item" } },
    },
    symbol: "armor_inventory",
    interactName: "entityArmorInventory",
    function: (entity: Entity): Array<Item> => {
      return entity.getArmorInventory();
    },
  },