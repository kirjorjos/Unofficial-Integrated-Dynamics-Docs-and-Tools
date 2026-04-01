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
    "fluidstackBucketFillSound",
    "FluidstackSoundBucketFill",
    "fluidstackSoundBucketFill",
    "fluid_stack_sound_bucket_fill",
    "fluidStackSoundBucketFill",
    "fluid_sound_bucket_fill",
    "fluidSoundBucketFill",
    "sound_bucket_fill",
    "fluidstackSound_bucket_fill",
  ];
  static override symbol = "sound_bucket_fill";
  static override interactName = "fluidstackBucketFillSound";
  static override operatorName = "sound_bucket_fill" as const;
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
