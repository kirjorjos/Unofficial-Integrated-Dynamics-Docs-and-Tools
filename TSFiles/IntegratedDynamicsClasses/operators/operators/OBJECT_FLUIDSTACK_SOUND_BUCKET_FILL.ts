OBJECT_FLUIDSTACK_SOUND_BUCKET_FILL: {
    internalName: "integrateddynamics:fluidstack_sound_bucket_fill",
    nicknames: [
      "FluidstackSoundBucketFill",
      "fluidstackSoundBucketFill",
      "fluid_stack_sound_bucket_fill",
      "fluidStackSoundBucketFill",
      "fluid_stack_sound_bucket_fill",
      "fluid_sound_bucket_fill",
        "fluidSoundBucketFill",
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
    symbol: "sound_bucket_fill",
    interactName: "fluidstackBucketFillSound",
    function: (fluid: Fluid): string => {
      return fluid.getBucketFillSound();
    },
  },