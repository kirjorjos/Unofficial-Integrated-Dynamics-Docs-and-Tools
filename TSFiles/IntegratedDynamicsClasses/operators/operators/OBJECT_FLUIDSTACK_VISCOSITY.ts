import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_VISCOSITY extends BaseOperator<
  Fluid,
  Integer
> {
  constructor() {
    super({
      internalName: "integrateddynamics:fluidstack_viscosity",
      nicknames: [
        "FluidstackViscosity",
        "fluidstackViscosity",
        "fluid_stack_viscosity",
        "fluidStackViscosity",
        "fluid_stack_viscosity",
        "fluid_viscosity",
        "fluidViscosity",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "Integer",
          },
        },
        globalMap
      ),
      symbol: "viscosity",
      interactName: "fluidstackViscosity",
      function: (fluid: Fluid): Integer => {
        return fluid.getViscosity();
      },
    });
  }
}
