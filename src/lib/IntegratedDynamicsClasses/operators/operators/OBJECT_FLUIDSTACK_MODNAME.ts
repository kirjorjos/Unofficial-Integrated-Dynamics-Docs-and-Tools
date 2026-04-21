import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_MODNAME extends BaseOperator<
  Fluid,
  iString
> {
  static override internalName = "integrateddynamics:fluidstack_mod" as const;
  static override numericID = 41;
  static override nicknames = [
    "fluidModName",
    "fluidstackMod",
    "fluidstackModname",
    "fluidStackModname",
    "FluidstackModname",
    "mod",
    "fluid_mod_name",
    "fluid_stack_modname",
    "fluidstack_mod",
    "fluidstack_modname",
  ];
  static override symbol = "mod";
  static override interactName = "fluidstackMod";
  static override operatorName = "mod" as const;
  static override displayName = "Mod" as const;
  static override fullDisplayName = "Fluid Mod" as const;
  static override tooltipInfo =
    "The name of the mod owning the given fluid" as const;

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
        return fluid.getModName();
      },
    });
  }
}
