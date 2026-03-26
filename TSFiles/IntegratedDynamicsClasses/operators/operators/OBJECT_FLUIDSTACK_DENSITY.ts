import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_DENSITY extends BaseOperator<
  Fluid,
  Integer
> {
  static override internalName =
    "integrateddynamics:fluidstack_density" as const;
  static override numericID = 39;
  static override nicknames = [
    "FluidstackDensity",
    "fluidstackDensity",
    "fluid_stack_density",
    "fluidStackDensity",
    "fluid_density",
    "fluidDensity",
  ];
  static override symbol = "density";
  static override interactName = "fluidstackDensity";
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
