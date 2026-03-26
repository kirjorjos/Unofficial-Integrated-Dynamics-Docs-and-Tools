import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_SOUND_BUCKET_EMPTY extends BaseOperator<
  Fluid,
  iString
> {
  static override internalName =
    "integrateddynamics:fluidstack_sound_bucket_empty" as const;
  static override numericID = 273;
  static override nicknames = [
    "fluidstackBucketEmptySound",
    "FluidstackSoundBucketEmpty",
    "fluidstackSoundBucketEmpty",
    "fluid_stack_sound_bucket_empty",
    "fluidStackSoundBucketEmpty",
    "fluid_sound_bucket_empty",
    "fluidSoundBucketEmpty",
  ];
  static override symbol = "sound_bucket_empty";
  static override interactName = "fluidstackBucketEmptySound";
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
