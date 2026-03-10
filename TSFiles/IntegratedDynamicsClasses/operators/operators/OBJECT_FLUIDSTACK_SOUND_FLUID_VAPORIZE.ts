import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_SOUND_FLUID_VAPORIZE extends BaseOperator<
  Fluid,
  iString
> {
  static override internalName =
    "integrateddynamics:fluidstack_sound_fluid_vaporize" as const;
  constructor() {
    super({
      nicknames: [
        "FluidstackSoundFluidVaporize",
        "fluidstackSoundFluidVaporize",
        "fluid_stack_sound_fluid_vaporize",
        "fluidStackSoundFluidVaporize",
        "fluid_sound_fluid_vaporize",
        "fluidSoundFluidVaporize",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Fluid",
        },
        to: {
          type: "String",
        },
      }),
      symbol: "sound_fluid_vaporize",
      interactName: "fluidstackFluidVaporizeSound",
      function: (fluid: Fluid): iString => {
        return fluid.getFluidVaporizeSound();
      },
    });
  }
}
