import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_SOUND_FLUID_VAPORIZE extends BaseOperator<
  Fluid,
  iString
> {
  static override internalName =
    "integrateddynamics:fluidstack_sound_fluid_vaporize" as const;
  static override numericID = 275;
  static override nicknames = [
    "fluidSoundFluidVaporize",
    "fluidstackFluidVaporizeSound",
    "fluidstackSoundFluidVaporize",
    "fluidStackSoundFluidVaporize",
    "FluidstackSoundFluidVaporize",
    "soundFluidVaporize",
    "fluid_sound_fluid_vaporize",
    "fluid_stack_sound_fluid_vaporize",
    "fluidstack_fluid_vaporize_sound",
    "fluidstack_sound_fluid_vaporize",
    "fluidstackSound_fluid_vaporize",
    "sound_fluid_vaporize",
  ];
  static override symbol = "sound_fluid_vaporize";
  static override interactName = "fluidstackFluidVaporizeSound";
  static override operatorName = "sound_fluid_vaporize" as const;
  static override displayName = "Fluid vaporize sound" as const;
  static override fullDisplayName = "Fluid Fluid vaporize sound" as const;
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
        return fluid.getFluidVaporizeSound();
      },
    });
  }
}
