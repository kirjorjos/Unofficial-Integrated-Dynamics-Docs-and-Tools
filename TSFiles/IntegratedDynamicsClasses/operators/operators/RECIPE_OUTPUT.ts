RECIPE_OUTPUT: {
    internalName: "integrateddynamics:recipe_output",
    nicknames: ["recipeOutput"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Recipe",
      },
      to: {
        type: "Ingredients",
      },
    },
    symbol: "recipe_out",
    interactName: "recipeOutput",
    function: (recipe: Recipe): Ingredients => {
      return recipe.getOutput();
    },
  },