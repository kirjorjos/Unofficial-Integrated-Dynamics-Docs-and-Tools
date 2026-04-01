import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_TEMPERATURE extends BaseOperator<
  Fluid,
  Integer
> {
  static override internalName =
    "integrateddynamics:fluidstack_temperature" as const;
  static override numericID = 276;
  static override nicknames = [
    "FluidstackTemperature",
    "fluidstackTemperature",
    "fluid_stack_temperature",
    "fluidStackTemperature",
    "fluid_temperature",
    "fluidTemperature",
    "temperature",
  ];
  static override symbol = "temperature";
  static override interactName = "fluidstackTemperature";
  static override operatorName = "temperature" as const;
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
        return fluid.getTemperature();
      },
    });
  }
}
