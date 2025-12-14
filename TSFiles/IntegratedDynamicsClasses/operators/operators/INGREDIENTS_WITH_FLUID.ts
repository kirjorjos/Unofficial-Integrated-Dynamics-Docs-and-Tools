INGREDIENTS_WITH_FLUID: {
    internalName: "integrateddynamics:ingredients_with_fluid",
    nicknames: ["ingredientsWithFluid"],
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
            type: "Fluid",
          },
          to: {
            type: "Ingredients",
          },
        },
      },
    },
    symbol: "Ingr.with_fluid",
    interactName: "ingredientsWithFluid",
    function: (
      ingredients: Ingredients
    ): TypeLambda<Integer, TypeLambda<Fluid, Ingredients>> => {
      return (index: Integer): TypeLambda<Fluid, Ingredients> => {
        return (fluid: Fluid): Ingredients => {
          return ingredients.setFluid(fluid, index);
        };
      };
    },
  },