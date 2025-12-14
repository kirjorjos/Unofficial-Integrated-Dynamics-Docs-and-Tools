OBJECT_ENTITY_INVENTORY: {
    internalName: "integrateddynamics:entity_inventory",
    nicknames: [
      "EntityInventoryContents",
      "entity_inventory_contents",
      "entityInventoryContents",
      "entityInventoryContents"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Entity",
      },
      to: { type: "List", listType: { type: "ItemStack" } },
    },
    symbol: "entity_inventory",
    interactName: "entityInventory",
    function: (entity: Entity): Array<Item> => {
      return entity.getInventory();
    },
  },