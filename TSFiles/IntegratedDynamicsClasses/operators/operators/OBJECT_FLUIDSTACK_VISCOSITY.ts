OBJECT_FLUIDSTACK_VISCOSITY: {
    internalName: "integrateddynamics:fluidstack_viscosity",
    nicknames: [
      "FluidstackViscosity",
      "fluidstackViscosity",
      "fluid_stack_viscosity",
      "fluidStackViscosity",
      "fluid_stack_viscosity",
      "fluid_viscosity",
        "fluidViscosity",
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
    symbol: "viscosity",
    interactName: "fluidstackViscosity",
    function: (fluid: Fluid): Integer => {
      return fluid.getViscosity();
    },
  },