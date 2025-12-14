INGREDIENTS_FLUIDS: {
    internalName: "integrateddynamics:ingredients_fluids",
    nicknames: ["ingredientsFluids"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Ingredients",
      },
      to: { type: "List", listType: { type: "Fluid" } },
    },
    symbol: "Ingr.fluids",
    interactName: "ingredientsFluids",
    function: (ingredients: Ingredients): Array<Fluid> => {
      return ingredients.getFluids();
    },
  },