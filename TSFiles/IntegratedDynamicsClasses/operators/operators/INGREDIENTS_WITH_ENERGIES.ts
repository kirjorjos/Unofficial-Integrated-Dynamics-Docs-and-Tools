INGREDIENTS_WITH_ENERGIES: {
    internalName: "integrateddynamics:ingredients_with_energies",
    nicknames: ["ingredientsWithEnergies"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Ingredients",
      },
      to: {
        type: "Function",
        from: { type: "List", listType: { type: "Long" } },
        to: {
          type: "Ingredients",
        },
      },
    },
    symbol: "Ingr.with_energies",
    interactName: "ingredientsWithEnergies",
    function: (
      ingredients: Ingredients
    ): TypeLambda<Array<Long>, Ingredients> => {
      return (energyList: Array<Long>): Ingredients => {
        return ingredients.appendEnergies(energyList);
      };
    },
  },