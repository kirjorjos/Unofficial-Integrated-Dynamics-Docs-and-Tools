import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_VISCOSITY extends BaseOperator<
  Fluid,
  Integer
> {
  static override internalName =
    "integrateddynamics:fluidstack_viscosity" as const;
  static override numericID = 43;
  static override nicknames = [
    "fluidstackViscosity",
    "fluidStackViscosity",
    "FluidstackViscosity",
    "fluidViscosity",
    "viscosity",
    "fluid_stack_viscosity",
    "fluid_viscosity",
    "fluidstack_viscosity",
  ];
  static override symbol = "viscosity";
  static override interactName = "fluidstackViscosity";
  static override operatorName = "viscosity" as const;
  static override displayName = "Viscosity" as const;
  static override fullDisplayName = "Fluid Viscosity" as const;
  static override tooltipInfo = "The fluid viscosity" as const;

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
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (fluid: Fluid): Integer => {
        return fluid.getViscosity();
      },
    });
  }
}
