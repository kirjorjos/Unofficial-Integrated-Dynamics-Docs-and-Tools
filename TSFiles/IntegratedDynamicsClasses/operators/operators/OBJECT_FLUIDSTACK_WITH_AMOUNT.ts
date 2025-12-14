OBJECT_FLUIDSTACK_WITH_AMOUNT: {
    internalName: "integrateddynamics:fluidstack_with_amount",
    nicknames: [
      "FluidstackWithAmount",
      "fluidstackWithAmount",
      "fluid_stack_with_amount",
      "fluidStackWithAmount",
      "fluid_stack_with_amount",
      "fluid_with_amount",
        "fluidWithAmount",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "Function",
        from: {
          type: "Integer",
        },
        to: {
          type: "Fluid",
        },
      },
    },
    symbol: "with_amount",
    interactName: "fluidstackWithAmount",
    function: (fluid: Fluid): TypeLambda<Integer, Fluid> => {
      return (amount: Integer): Fluid => {
        return new Fluid(new Properties({ amount }), fluid);
      };
    },
  },