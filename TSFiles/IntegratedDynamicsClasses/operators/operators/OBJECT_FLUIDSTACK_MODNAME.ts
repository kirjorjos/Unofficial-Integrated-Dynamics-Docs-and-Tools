import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_MODNAME extends BaseOperator<
  Fluid,
  iString
> {
  static override internalName = "integrateddynamics:fluidstack_mod" as const;
  constructor() {
    super({
      nicknames: [
        "FluidstackModname",
        "fluidstackModname",
        "fluid_stack_modname",
        "fluidStackModname",
        "fluid_stack_modname",
        "fluid_mod_name",
        "fluidModName",
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
      symbol: "mod",
      interactName: "fluidstackMod",
      function: (fluid: Fluid): iString => {
        return fluid.getModName();
      },
    });
  }
}
