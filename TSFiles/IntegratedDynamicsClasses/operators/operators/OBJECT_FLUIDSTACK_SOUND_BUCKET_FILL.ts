import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_SOUND_BUCKET_FILL extends BaseOperator<
  Fluid,
  iString
> {
  constructor() {
    super({
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
        globalMap
      ),
      symbol: "sound_bucket_fill",
      interactName: "fluidstackBucketFillSound",
      function: (fluid: Fluid): iString => {
        return new iString(fluid.getBucketFillSound());
      },
    });
  }
}
