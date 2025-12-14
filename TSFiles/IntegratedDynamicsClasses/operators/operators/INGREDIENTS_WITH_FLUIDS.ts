INGREDIENTS_WITH_FLUIDS: {
    internalName: "integrateddynamics:ingredients_with_fluids",
    nicknames: ["ingredientsWithFluids"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Ingredients",
      },
      to: {
        type: "Function",
        from: { type: "List", listType: { type: "Fluid" } },
        to: {
          type: "Ingredients",
        },
      },
    },
    symbol: "Ingr.with_fluids",
    interactName: "ingredientsWithFluids",
    function: (
      ingredients: Ingredients
    ): TypeLambda<Array<Fluid>, Ingredients> => {
      return (fluidList: Array<Fluid>): Ingredients => {
        return ingredients.appendFluids(fluidList);
      };
    },
  },