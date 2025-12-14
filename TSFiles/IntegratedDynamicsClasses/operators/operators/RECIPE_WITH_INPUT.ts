RECIPE_WITH_INPUT: {
    internalName: "integrateddynamics:recipe_with_input",
    nicknames: [, "recipeWithInput"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Recipe",
      },
      to: {
        type: "Function",
        from: {
          type: "Ingredients",
        },
        to: {
          type: "Recipe",
        },
      },
    },
    symbol: "Recipe.with_in",
    interactName: "recipeWithInput",
    function: (recipe: Recipe): TypeLambda<Ingredients, Recipe> => {
      return (ingredients: Ingredients): Recipe => {
        return recipe.setInput(ingredients);
      };
    },
  },