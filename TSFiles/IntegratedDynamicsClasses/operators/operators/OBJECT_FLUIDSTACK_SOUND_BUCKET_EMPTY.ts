OBJECT_FLUIDSTACK_SOUND_BUCKET_EMPTY: {
    internalName: "integrateddynamics:fluidstack_sound_bucket_empty",
    nicknames: [
      "FluidstackSoundBucketEmpty",
      "fluidstackSoundBucketEmpty",
      "fluid_stack_sound_bucket_empty",
      "fluidStackSoundBucketEmpty",
      "fluid_stack_sound_bucket_empty",
      "fluid_sound_bucket_empty",
        "fluidSoundBucketEmpty",
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
    symbol: "sound_bucket_empty",
    interactName: "fluidstackBucketEmptySound",
    function: (fluid: Fluid): string => {
      return fluid.getBucketEmptySound();
    },
  },