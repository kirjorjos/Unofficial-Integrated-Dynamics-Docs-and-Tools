OBJECT_FLUIDSTACK_IS_LIGHTER_THAN_AIR: {
    internalName: "integrateddynamics:fluidstack_lighter_than_air",
    nicknames: [
      "FluidstackIsLighterThanAir",
      "fluidstackIsLighterThanAir",
      "fluid_stack_is_lighter_than_air",
      "fluidStackIsLighterThanAir",
      "fluid_stack_is_lighter_than_air",
      "fluid_is_lighter_than_air",
      "fluidIsLighterThanAir",
        "isLighterThanAir",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "Boolean",
      },
    },
    symbol: "lighter_than_air",
    interactName: "fluidstackIsLighterThanAir",
    function: (fluid: Fluid): iBoolean => {
      return fluid.isLighterThanAir();
    },
  },