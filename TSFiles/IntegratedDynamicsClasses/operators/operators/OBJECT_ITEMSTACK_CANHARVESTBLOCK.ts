OBJECT_ITEMSTACK_CANHARVESTBLOCK: {
    internalName: "integrateddynamics:itemstack_canharvest",
    nicknames: [
      "ItemstackCanHarvestBlock",
      "itemstack_can_harvest_block",
      "itemstackCanHarvestBlock",
      "canHarvestBlock"
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Item",
      },
      to: {
        type: "Function",
        from: {
          type: "Block",
        },
        to: {
          type: "Boolean",
        },
      },
    },
    symbol: "can_harvest",
    interactName: "itemstackCanHarvest",
    function: (item: Item): TypeLambda<Block, void> => {
      return (block: Block): void => {
        return item.canHarvestBlock(block);
      };
    },
  },