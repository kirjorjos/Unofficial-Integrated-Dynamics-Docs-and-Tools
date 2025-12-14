OBJECT_FLUIDSTACK_BLOCK: {
    internalName: "integrateddynamics:fluidstack_block",
    nicknames: [
      "FluidstackBlock",
      "fluidstackBlock",
      "fluid_stack_block",
      "fluidStackBlock",
      "fluid_stack_block",
      "fluid_block",
        "fluidBlock",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "Block",
      },
    },
    symbol: "block",
    interactName: "fluidstackBlock",
    function: (fluid: Fluid): Block => {
      return fluid.getBlock();
    },
  },