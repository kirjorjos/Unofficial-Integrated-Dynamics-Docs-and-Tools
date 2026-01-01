OBJECT_ITEMSTACK_STRENGTH_VS_BLOCK: {
    internalName: "integrateddynamics:itemstack_strength",
    nicknames: [
      "ItemstackStrengthVsBlock",
      "itemstack_strength_vs_block",
      "itemstackStrengthVsBlock",
      "strengthVsBlock"
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
          type: "Double",
        },
      },
    },
    symbol: "strength",
    interactName: "itemstackStrength",
    function: (item: Item): TypeLambda<Block, void> => {
      return (block: Block): void => {
        return item.getStrengthVsBlock(block);
      };
    },
  },