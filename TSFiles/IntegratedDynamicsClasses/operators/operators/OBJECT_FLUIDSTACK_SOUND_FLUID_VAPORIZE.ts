OBJECT_FLUIDSTACK_SOUND_FLUID_VAPORIZE: {
    internalName: "integrateddynamics:fluidstack_sound_fluid_vaporize",
    nicknames: [
      "FluidstackSoundFluidVaporize",
      "fluidstackSoundFluidVaporize",
      "fluid_stack_sound_fluid_vaporize",
      "fluidStackSoundFluidVaporize",
      "fluid_stack_sound_fluid_vaporize",
      "fluid_sound_fluid_vaporize",
        "fluidSoundFluidVaporize",
    ],
    parsedSignature: {
      type: "Function",
      from: {
        type: "Fluid",
      },
      to: {
        type: "String",
      },
    },
    symbol: "sound_fluid_vaporize",
    interactName: "fluidstackFluidVaporizeSound",
    function: (fluid: Fluid): string => {
      return fluid.getFluidVaporizeSound();
    },
  },