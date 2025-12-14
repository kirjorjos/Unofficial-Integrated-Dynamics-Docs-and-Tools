RECIPE_WITH_INPUT_OUTPUT: {
    internalName: "integrateddynamics:recipe_with_input_output",
    nicknames: ["recipeWithInputOutput"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Ingredients",
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
    symbol: "Recipe.with_io",
    interactName: "ingredientsWithInputOutput",
    function: (input: Ingredients): TypeLambda<Ingredients, Recipe> => {
      return (output: Ingredients): Recipe => {
        return new Recipe(input, output);
      };
    },
  },