OBJECT_FLUIDSTACK_DATA: {
    internalName: "integrateddynamics:fluidstack_nbt",
    nicknames: [
      "FluidstackData",
      "fluidstackData",
      "fluid_stack_data",
      "fluidStackData",
      "fluid_stack_data",
      "fluid_data",
      "fluidData",
      "fluid_NBT",
      "fluidStackNBT",
      "fluid_stack_NBT",
      "fluidstack_NBT",
      "fluidstackNBT",
        "fluidNBT",
        "fluidNBTKeys",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "NBT",
      },
    },
    symbol: "NBT()",
    interactName: "fluidstackNbt",
    function: (fluid: Fluid): CompoundTag => {
      return fluid.getNBT();
    },
  },