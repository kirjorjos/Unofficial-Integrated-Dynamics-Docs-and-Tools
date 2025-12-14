INGREDIENTS_WITH_ITEMS: {
    internalName: "integrateddynamics:ingredients_with_items",
    nicknames: ["ingredientsWithItems"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Ingredients",
      },
      to: {
        type: "Function",
        from: { type: "List", listType: { type: "Item" } },
        to: {
          type: "Ingredients",
        },
      },
    },
    symbol: "Ingr.with_items",
    interactName: "ingredientsWithItems",
    function: (
      ingredients: Ingredients
    ): TypeLambda<Array<Item>, Ingredients> => {
      return (itemList: Array<Item>): Ingredients => {
        return ingredients.appendItems(itemList);
      };
    },
  },