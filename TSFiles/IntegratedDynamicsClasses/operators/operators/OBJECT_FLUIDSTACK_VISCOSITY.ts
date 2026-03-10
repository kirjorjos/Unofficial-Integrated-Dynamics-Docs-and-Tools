import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_VISCOSITY extends BaseOperator<
  Fluid,
  Integer
> {
  static override internalName =
    "integrateddynamics:fluidstack_viscosity" as const;
  static override nicknames = [
    "FluidstackViscosity",
    "fluidstackViscosity",
    "fluid_stack_viscosity",
    "fluidStackViscosity",
    "fluid_viscosity",
    "fluidViscosity",
  ];
  static override symbol = "viscosity";
  static override interactName = "fluidstackViscosity";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Fluid",
        },
        to: {
          type: "Integer",
        },
      }),
      function: (fluid: Fluid): Integer => {
        return fluid.getViscosity();
      },
    });
  }
}
