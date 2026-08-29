import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_SOUND_BUCKET_EMPTY extends BaseOperator<
  Fluid,
  iString
> {
  static override internalName =
    "integrateddynamics:fluidstack_sound_bucket_empty" as const;
  static override numericID = 273;
  static override nicknames = [
    "fluidSoundBucketEmpty",
    "fluidstackBucketEmptySound",
    "fluidstackSoundBucketEmpty",
    "fluidStackSoundBucketEmpty",
    "FluidstackSoundBucketEmpty",
    "soundBucketEmpty",
    "fluid_sound_bucket_empty",
    "fluid_stack_sound_bucket_empty",
    "fluidstack_bucket_empty_sound",
    "fluidstack_sound_bucket_empty",
    "fluidstackSound_bucket_empty",
    "sound_bucket_empty",
  ];
  static override symbol = "sound_bucket_empty";
  static override interactName = "fluidstackBucketEmptySound";
  static override operatorName = "sound_bucket_empty" as const;
  static override displayName = "Bucket empty sound" as const;
  static override fullDisplayName = "Fluid Bucket empty sound" as const;
  static override stringDisplayNames = [
    "fluid bucket empty sound",
    "fluid bucket empty Sound",
    "fluid bucket Empty sound",
    "fluid bucket Empty Sound",
    "fluid Bucket empty sound",
    "fluid Bucket empty Sound",
    "fluid Bucket Empty sound",
    "fluid Bucket Empty Sound",
    "Fluid bucket empty sound",
    "Fluid bucket empty Sound",
    "Fluid bucket Empty sound",
    "Fluid bucket Empty Sound",
    "Fluid Bucket empty sound",
    "Fluid Bucket empty Sound",
    "Fluid Bucket Empty sound",
    "Fluid Bucket Empty Sound",
    "fluidstack bucket empty sound",
    "fluidstack bucket empty Sound",
    "fluidstack bucket Empty sound",
    "fluidstack bucket Empty Sound",
    "fluidstack Bucket empty sound",
    "fluidstack Bucket empty Sound",
    "fluidstack Bucket Empty sound",
    "fluidstack Bucket Empty Sound",
    "Fluidstack bucket empty sound",
    "Fluidstack bucket empty Sound",
    "Fluidstack bucket Empty sound",
    "Fluidstack bucket Empty Sound",
    "Fluidstack Bucket empty sound",
    "Fluidstack Bucket empty Sound",
    "Fluidstack Bucket Empty sound",
    "Fluidstack Bucket Empty Sound",
    "fluidStack bucket empty sound",
    "fluidStack bucket empty Sound",
    "fluidStack bucket Empty sound",
    "fluidStack bucket Empty Sound",
    "fluidStack Bucket empty sound",
    "fluidStack Bucket empty Sound",
    "fluidStack Bucket Empty sound",
    "fluidStack Bucket Empty Sound",
    "FluidStack bucket empty sound",
    "FluidStack bucket empty Sound",
    "FluidStack bucket Empty sound",
    "FluidStack bucket Empty Sound",
    "FluidStack Bucket empty sound",
    "FluidStack Bucket empty Sound",
    "FluidStack Bucket Empty sound",
    "FluidStack Bucket Empty Sound",
    "bucket empty sound",
    "bucket empty Sound",
    "bucket Empty sound",
    "bucket Empty Sound",
    "Bucket empty sound",
    "Bucket empty Sound",
    "Bucket Empty sound",
    "Bucket Empty Sound",
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
        return fluid.getBucketEmptySound();
      },
    });
  }
}
