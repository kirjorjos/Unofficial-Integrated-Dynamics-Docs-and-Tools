OBJECT_FLUIDSTACK_BY_NAME: {
    internalName: "integrateddynamics:fluidstack_by_name",
    nicknames: [
      "FluidstackByName",
      "fluidstack_by_name",
      "fluidstackByName",
      "fluid_by_name",
        "fluidByName",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: {
        type: "Fluid",
      },
    },
    symbol: "fluid_by_name",
    interactName: "stringFluidByName",
    function: (): never => {
      throw new Error(
        "Fluid by name is infeasible without a registry. This is a placeholder function."
      );
    },
  },