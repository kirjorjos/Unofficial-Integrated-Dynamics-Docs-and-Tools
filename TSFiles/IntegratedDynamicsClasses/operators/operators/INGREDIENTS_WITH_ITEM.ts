INGREDIENTS_WITH_ITEM: {
    internalName: "integrateddynamics:ingredients_with_item",
    nicknames: ["ingredientsWithItem"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Ingredients",
      },
      to: {
        type: "Function",
        from: {
          type: "Integer",
        },
        to: {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Ingredients",
          },
        },
      },
    },
    symbol: "Ingr.with_item",
    interactName: "ingredientsWithItem",
    function: (
      ingredients: Ingredients
    ): TypeLambda<Integer, TypeLambda<Item, Ingredients>> => {
      return (index: Integer): TypeLambda<Item, Ingredients> => {
        return (item: Item): Ingredients => {
          return ingredients.setItem(item, index);
        };
      };
    },
  },