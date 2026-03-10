import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_TEMPERATURE extends BaseOperator<
  Fluid,
  Integer
> {
  static override internalName =
    "integrateddynamics:fluidstack_temperature" as const;
  static override nicknames = [
    "FluidstackTemperature",
    "fluidstackTemperature",
    "fluid_stack_temperature",
    "fluidStackTemperature",
    "fluid_temperature",
    "fluidTemperature",
  ];
  static override symbol = "temperature";
  static override interactName = "fluidstackTemperature";
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
        return fluid.getTemperature();
      },
    });
  }
}
