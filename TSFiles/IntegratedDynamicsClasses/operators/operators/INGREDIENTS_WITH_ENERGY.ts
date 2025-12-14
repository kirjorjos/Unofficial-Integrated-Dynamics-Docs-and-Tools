INGREDIENTS_WITH_ENERGY: {
    internalName: "integrateddynamics:ingredients_with_energy",
    nicknames: ["ingredientsWithEnergy"],
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
            type: "Long",
          },
          to: {
            type: "Ingredients",
          },
        },
      },
    },
    symbol: "Ingr.with_energy",
    interactName: "ingredientsWithEnergy",
    function: (
      ingredients: Ingredients
    ): TypeLambda<Integer, TypeLambda<Long, Ingredients>> => {
      return (index: Integer): TypeLambda<Long, Ingredients> => {
        return (energy: Long): Ingredients => {
          return ingredients.setEnergy(energy, index);
        };
      };
    },
  },