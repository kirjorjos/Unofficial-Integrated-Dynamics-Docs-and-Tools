import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_MODNAME extends BaseOperator<
  Fluid,
  iString
> {
  static override internalName = "integrateddynamics:fluidstack_mod" as const;
  static override nicknames = [
    "fluidstackMod",
    "FluidstackModname",
    "fluidstackModname",
    "fluid_stack_modname",
    "fluidStackModname",
    "fluid_mod_name",
    "fluidModName",
  ];
  static override symbol = "mod";
  static override interactName = "fluidstackMod";
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
        return fluid.getModName();
      },
    });
  }
}
