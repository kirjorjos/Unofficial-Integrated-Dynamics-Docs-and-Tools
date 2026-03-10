import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_SOUND_BUCKET_FILL extends BaseOperator<
  Fluid,
  iString
> {
  static override internalName =
    "integrateddynamics:fluidstack_sound_bucket_fill" as const;
  static override nicknames = [
    "fluidstackBucketFillSound",
    "FluidstackSoundBucketFill",
    "fluidstackSoundBucketFill",
    "fluid_stack_sound_bucket_fill",
    "fluidStackSoundBucketFill",
    "fluid_sound_bucket_fill",
    "fluidSoundBucketFill",
  ];
  static override symbol = "sound_bucket_fill";
  static override interactName = "fluidstackBucketFillSound";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Fluid",
        },
        to: {
          type: "String",
        },
      }),
      function: (fluid: Fluid): iString => {
        return fluid.getBucketFillSound();
      },
    });
  }
}
