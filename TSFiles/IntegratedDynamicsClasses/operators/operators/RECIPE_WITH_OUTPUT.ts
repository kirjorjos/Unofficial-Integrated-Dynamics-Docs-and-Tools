RECIPE_WITH_OUTPUT: {
    internalName: "integrateddynamics:recipe_with_output",
    nicknames: ["recipeWithOutput"],
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
    symbol: "Recipe.with_out",
    interactName: "recipeWithOutput",
    function: (recipe: Recipe): TypeLambda<Ingredients, Recipe> => {
      return (ingredients: Ingredients): Recipe => {
        return recipe.setOutput(ingredients);
      };
    },
  },