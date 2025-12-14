OBJECT_FLUIDSTACK_ISRAWFLUIDEQUAL: {
    internalName: "integrateddynamics:fluidstack_israwfluidequal",
    nicknames: [
      "FluidstackIsrawfluidequal",
      "fluidstackIsrawfluidequal",
      "fluid_stack_israwfluidequal",
      "fluidStackIsrawfluidequal",
      "fluid_stack_israwfluidequal",
      "fluid_israwfluidequal",
      "isRawFluidEqual",
        "rawFluidEquals",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "Function",
        from: {
          type: "Fluid",
        },
        to: {
          type: "Boolean",
        },
      },
    },
    symbol: "=Raw=",
    interactName: "fluidstackIsRawEqual",
    function: (fluid1: Fluid): TypeLambda<Fluid, iBoolean> => {
      return (fluid2: Fluid): iBoolean => {
        return new iBoolean(
          fluid1
            .getUname()
            .replace(new RegExp("\\s\\d+$"), "")
            .toLowerCase() ===
          fluid2.getUname().replace(new RegExp("\\s\\d+$"), "").toLowerCase()
        );
      };
    },
  },