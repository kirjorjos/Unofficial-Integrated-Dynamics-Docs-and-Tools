OBJECT_FLUIDSTACK_RARITY: {
    internalName: "integrateddynamics:fluidstack_rarity",
    nicknames: [
      "FluidstackRarity",
      "fluidstackRarity",
      "fluid_stack_rarity",
      "fluidStackRarity",
      "fluid_stack_rarity",
      "fluid_rarity",
        "fluidRarity",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "String",
      },
    },
    symbol: "rarity",
    interactName: "fluidstackRarity",
    function: (fluid: Fluid): string => {
      return fluid.getRarity();
    },
  },