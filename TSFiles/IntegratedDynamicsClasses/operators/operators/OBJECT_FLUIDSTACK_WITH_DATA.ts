OBJECT_FLUIDSTACK_WITH_DATA: {
    internalName: "integrateddynamics:fluidstack_withdata",
    nicknames: [
      "FluidstackWithData",
      "fluidstackWithData",
      "fluid_stack_with_data",
      "fluidStackWithData",
        "fluidWithNBT",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "Function",
          from: {
            type: "NBT",
          },
          to: {
            type: "Fluid",
          },
        },
      },
    },
    symbol: "with_data",
    interactName: "fluidstackWithData",
    function: (
      fluid: Fluid
    ): TypeLambda<string, TypeLambda<CompoundTag, Fluid>> => {
      return (key: string): TypeLambda<CompoundTag, Fluid> => {
        return (value: CompoundTag): Fluid => {
          let nbt = fluid.getNBT() || {};
          nbt = nbt.set(key, value);
          return new Fluid(new Properties({ nbt }), fluid);
        };
      };
    },
  },