INGREDIENTS_ITEMS: {
    internalName: "integrateddynamics:ingredients_items",
    nicknames: ["ingredientsItems"],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Ingredients",
      },
      to: { type: "List", listType: { type: "Item" } },
    },
    symbol: "Ingr.items",
    interactName: "ingredientsItems",
    function: (ingredients: Ingredients): Array<Item> => {
      return ingredients.getItems();
    },
  },