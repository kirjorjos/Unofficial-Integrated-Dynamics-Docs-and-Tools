OBJECT_FLUIDSTACK_BUCKET: {
    internalName: "integrateddynamics:fluidstack_bucket",
    nicknames: [
      "FluidstackBucket",
      "fluidstackBucket",
      "fluid_stack_bucket",
      "fluidStackBucket",
      "fluid_stack_bucket",
      "fluid_bucket",
        "fluidBucket",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "Item",
      },
    },
    symbol: "bucket",
    interactName: "fluidstackBucket",
    function: (fluid: Fluid): Item => {
      return fluid.getBucket();
    },
  },