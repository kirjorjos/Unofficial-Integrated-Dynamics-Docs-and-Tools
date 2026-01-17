import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_SOUND_BUCKET_EMPTY extends BaseOperator<
  Fluid,
  iString
> {
  constructor() {
    super({
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
      symbol: "sound_bucket_empty",
      interactName: "fluidstackBucketEmptySound",
      function: (fluid: Fluid): iString => {
        return new iString(fluid.getBucketEmptySound());
      },
    });
  }
}
