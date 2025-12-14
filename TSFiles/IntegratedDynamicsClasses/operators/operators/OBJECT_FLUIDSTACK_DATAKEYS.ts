OBJECT_FLUIDSTACK_DATAKEYS: {
    internalName: "integrateddynamics:fluidstack_datakeys",
    nicknames: [
      "FluidstackDataKeys",
      "fluidstackDataKeys",
      "fluid_stack_data_keys",
      "fluidStackDataKeys",
      "fluid_stack_data_keys",
      "fluid_data_keys",
      "fluidDataKeys",
      "fluid_NBT_keys",
      "fluidStackNBTKeys",
      "fluid_stack_NBT_keys",
      "fluidstack_NBT_keys",
      "fluidstackNBTKeys",
        "fluidNBTKeys",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: { type: "List", listType: { type: "String" } },
    },
    symbol: "data_keys",
    interactName: "fluidstackDataKeys",
    function: (fluid: Fluid): Array<iString> => {
      const nbt = fluid.getNBT();
      if (!nbt) {
        return [];
      }
      return Object.keys(nbt).map(e => new iString(e)).filter((key) => nbt.has(key));
    },
  },