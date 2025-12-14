OBJECT_FLUIDSTACK_LIGHT_LEVEL: {
    internalName: "integrateddynamics:fluidstack_light_level",
    nicknames: [
      "FluidstackLightLevel",
      "fluidstackLightLevel",
      "fluid_stack_light_level",
      "fluidStackLightLevel",
      "fluid_stack_light_level",
      "fluid_light_level",
        "fluidLightLevel",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "Integer",
      },
    },
    symbol: "light_level",
    interactName: "fluidstackLightLevel",
    function: (fluid: Fluid): Integer => {
      return fluid.getLightLevel();
    },
  },