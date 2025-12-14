OBJECT_FLUIDSTACK_AMOUNT: {
    internalName: "integrateddynamics:fluidstack_amount",
    nicknames: [
      "FluidstackAmount",
      "fluidstackAmount",
      "fluid_stack_amount",
      "fluidStackAmount",
      "fluid_stack_amount",
      "fluid_amount",
        "fluidAmount",
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
    symbol: "amount",
    interactName: "fluidstackAmount",
    function: (fluid: Fluid): Integer => {
      return fluid.getAmount();
    },
  },