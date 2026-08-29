import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_SOUND_BUCKET_FILL extends BaseOperator<
  Fluid,
  iString
> {
  static override internalName =
    "integrateddynamics:fluidstack_sound_bucket_fill" as const;
  static override numericID = 274;
  static override nicknames = [
    "fluidSoundBucketFill",
    "fluidstackBucketFillSound",
    "fluidstackSoundBucketFill",
    "fluidStackSoundBucketFill",
    "FluidstackSoundBucketFill",
    "soundBucketFill",
    "fluid_sound_bucket_fill",
    "fluid_stack_sound_bucket_fill",
    "fluidstack_bucket_fill_sound",
    "fluidstack_sound_bucket_fill",
    "fluidstackSound_bucket_fill",
    "sound_bucket_fill",
  ];
  static override symbol = "sound_bucket_fill";
  static override interactName = "fluidstackBucketFillSound";
  static override operatorName = "sound_bucket_fill" as const;
  static override displayName = "Bucket fill sound" as const;
  static override fullDisplayName = "Fluid Bucket fill sound" as const;
  static override stringDisplayNames = [
    "fluid bucket fill sound",
    "fluid bucket fill Sound",
    "fluid bucket Fill sound",
    "fluid bucket Fill Sound",
    "fluid Bucket fill sound",
    "fluid Bucket fill Sound",
    "fluid Bucket Fill sound",
    "fluid Bucket Fill Sound",
    "Fluid bucket fill sound",
    "Fluid bucket fill Sound",
    "Fluid bucket Fill sound",
    "Fluid bucket Fill Sound",
    "Fluid Bucket fill sound",
    "Fluid Bucket fill Sound",
    "Fluid Bucket Fill sound",
    "Fluid Bucket Fill Sound",
    "fluidstack bucket fill sound",
    "fluidstack bucket fill Sound",
    "fluidstack bucket Fill sound",
    "fluidstack bucket Fill Sound",
    "fluidstack Bucket fill sound",
    "fluidstack Bucket fill Sound",
    "fluidstack Bucket Fill sound",
    "fluidstack Bucket Fill Sound",
    "Fluidstack bucket fill sound",
    "Fluidstack bucket fill Sound",
    "Fluidstack bucket Fill sound",
    "Fluidstack bucket Fill Sound",
    "Fluidstack Bucket fill sound",
    "Fluidstack Bucket fill Sound",
    "Fluidstack Bucket Fill sound",
    "Fluidstack Bucket Fill Sound",
    "fluidStack bucket fill sound",
    "fluidStack bucket fill Sound",
    "fluidStack bucket Fill sound",
    "fluidStack bucket Fill Sound",
    "fluidStack Bucket fill sound",
    "fluidStack Bucket fill Sound",
    "fluidStack Bucket Fill sound",
    "fluidStack Bucket Fill Sound",
    "FluidStack bucket fill sound",
    "FluidStack bucket fill Sound",
    "FluidStack bucket Fill sound",
    "FluidStack bucket Fill Sound",
    "FluidStack Bucket fill sound",
    "FluidStack Bucket fill Sound",
    "FluidStack Bucket Fill sound",
    "FluidStack Bucket Fill Sound",
    "bucket fill sound",
    "bucket fill Sound",
    "bucket Fill sound",
    "bucket Fill Sound",
    "Bucket fill sound",
    "Bucket fill Sound",
    "Bucket Fill sound",
    "Bucket Fill Sound",
  ];
  static override kind = "fluidstack" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "String",
          },
        },
        normalizeSignature
      ),
      function: (fluid: Fluid): iString => {
        return fluid.getBucketFillSound();
      },
    });
  }
}
