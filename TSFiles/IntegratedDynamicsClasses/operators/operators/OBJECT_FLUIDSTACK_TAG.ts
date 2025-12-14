OBJECT_FLUIDSTACK_TAG: {
    internalName: "integrateddynamics:fluidstack_tag",
    nicknames: [
      "FluidstackTag",
      "fluidstackTag",
      "fluidstackTagStacks",
      "fluidstackTagStack",
        "fluidTag",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: { type: "List", listType: { type: "String" } },
    },
    symbol: "fluid_tag_names",
    interactName: "fluidstackTags",
    function: (fluid: Fluid): Array<string> => {
      return fluid.getTagNames();
    },
  },