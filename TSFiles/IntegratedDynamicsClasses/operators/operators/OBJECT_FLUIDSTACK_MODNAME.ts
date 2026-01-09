import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_MODNAME extends BaseOperator<
  Fluid,
  iString
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:fluidstack_mod",
      nicknames: [
        "FluidstackModname",
        "fluidstackModname",
        "fluid_stack_modname",
        "fluidStackModname",
        "fluid_stack_modname",
        "fluid_mod_name",
        "fluidModName",
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
      symbol: "mod",
      interactName: "fluidstackMod",
      function: (fluid: Fluid): iString => {
        return new iString(fluid.getModName());
      },
    });
  }
}
