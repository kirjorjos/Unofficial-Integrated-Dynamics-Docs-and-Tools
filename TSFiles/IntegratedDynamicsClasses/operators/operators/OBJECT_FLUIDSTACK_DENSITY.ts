OBJECT_FLUIDSTACK_DENSITY: {
    internalName: "integrateddynamics:fluidstack_density",
    nicknames: [
      "FluidstackDensity",
      "fluidstackDensity",
      "fluid_stack_density",
      "fluidStackDensity",
      "fluid_stack_density",
      "fluid_density",
        "fluidDensity",
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
    symbol: "density",
    interactName: "fluidstackDensity",
    function: (fluid: Fluid): Integer => {
      return fluid.getDensity();
    },
  },