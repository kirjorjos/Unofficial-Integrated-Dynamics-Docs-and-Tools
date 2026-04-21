import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_DENSITY extends BaseOperator<
  Fluid,
  Integer
> {
  static override internalName =
    "integrateddynamics:fluidstack_density" as const;
  static override numericID = 39;
  static override nicknames = [
    "density",
    "fluidDensity",
    "fluidstackDensity",
    "fluidStackDensity",
    "FluidstackDensity",
    "fluid_density",
    "fluid_stack_density",
    "fluidstack_density",
  ];
  static override symbol = "density";
  static override interactName = "fluidstackDensity";
  static override operatorName = "density" as const;
  static override displayName = "Density" as const;
  static override fullDisplayName = "Fluid Density" as const;
  static override tooltipInfo = "The fluid density" as const;

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
        return fluid.getDensity();
      },
    });
  }
}
