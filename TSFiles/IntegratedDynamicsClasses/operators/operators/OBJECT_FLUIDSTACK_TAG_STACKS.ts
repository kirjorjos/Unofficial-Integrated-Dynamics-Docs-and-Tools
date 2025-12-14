OBJECT_FLUIDSTACK_TAG_STACKS: {
    internalName: "integrateddynamics:string_fluidtag",
    nicknames: [
      "FluidstackTagStacks",
      "fluidStackTagStacks",
      "fluid_stack_tag_stacks",
        "fluidTagStacks",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "String",
      },
      to: { type: "List", listType: { type: "Fluid" } },
    },
    symbol: "fluid_tag_values",
    interactName: "stringFluidsByTag",
    function: (): never => {
      throw new Error(
        "Fluid tag values is infeasible without a registry. This is a placeholder function."
      );
    },
  },