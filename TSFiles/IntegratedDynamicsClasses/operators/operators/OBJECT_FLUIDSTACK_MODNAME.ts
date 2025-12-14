OBJECT_FLUIDSTACK_MODNAME: {
    internalName: "integrateddynamics:fluidstack_mod",
    nicknames: [
      "FluidstackModname",
      "fluidstackModname",
      "fluid_stack_modname",
      "fluidStackModname",
      "fluid_stack_modname",
      "fluid_mod_name",
        "fluidModName",
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
    symbol: "mod",
    interactName: "fluidstackMod",
    function: (fluid: Fluid): string => {
      return fluid.getModName();
    },
  },