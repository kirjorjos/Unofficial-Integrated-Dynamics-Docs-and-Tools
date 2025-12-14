OBJECT_FLUIDSTACK_TEMPERATURE: {
    internalName: "integrateddynamics:fluidstack_temperature",
    nicknames: [
      "FluidstackTemperature",
      "fluidstackTemperature",
      "fluid_stack_temperature",
      "fluidStackTemperature",
      "fluid_stack_temperature",
      "fluid_temperature",
        "fluidTemperature",
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
    symbol: "temperature",
    interactName: "fluidstackTemperature",
    function: (fluid: Fluid): Integer => {
      return fluid.getTemperature();
    },
  },