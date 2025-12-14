INGREDIENTS_ENERGIES: {
    internalName: "integrateddynamics:ingredients_energies",
    nicknames: ["ingredientsEnergies"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Ingredients",
      },
      to: { type: "List", listType: { type: "Long" } },
    },
    symbol: "Ingr.energies",
    interactName: "ingredientsEnergies",
    function: (ingredients: Ingredients): Array<Long> => {
      return ingredients.getEnergies();
    },
  },