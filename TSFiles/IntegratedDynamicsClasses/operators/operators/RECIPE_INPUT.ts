RECIPE_INPUT: {
    internalName: "integrateddynamics:recipe_input",
    nicknames: ["recipeInput", "recipeWithInput"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Recipe",
      },
      to: {
        type: "Ingredients",
      },
    },
    symbol: "recipe_in",
    interactName: "recipeInput",
    function: (recipe: Recipe): Ingredients => {
      return recipe.getInput();
    },
  },