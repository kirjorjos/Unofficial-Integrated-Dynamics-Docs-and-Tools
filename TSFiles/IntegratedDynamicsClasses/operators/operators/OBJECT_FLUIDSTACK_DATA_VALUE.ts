OBJECT_FLUIDSTACK_DATA_VALUE: {
    internalName: "integrateddynamics:fluidstack_datavalue",
    nicknames: [
      "FluidstackDataValue",
      "fluidstackDataValue",
      "fluid_stack_data_value",
      "fluidStackDataValue",
      "fluid_stack_data_value",
      "fluid_data_value",
      "fluidDataValue",
      "fluid_NBT_value",
      "fluidStackNBTValue",
      "fluid_stack_NBT_value",
      "fluidstack_NBT_value",
      "fluidstackNBTValue",
        "fluidNBTValue",
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
          type: "NBT",
        },
      },
    },
    symbol: "data_value",
    interactName: "fluidstackDataValue",
    function: (fluid: Fluid): TypeLambda<iString, Tag<IntegratedValue>> => {
      return (key: iString): Tag<IntegratedValue> => {
        const nbt = fluid.getNBT();
        if (!nbt || !nbt.has(key)) {
          return new NullTag();
        }
        return nbt.get(key);
      };
    },
  },