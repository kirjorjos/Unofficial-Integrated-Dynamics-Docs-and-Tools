import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_AMOUNT extends BaseOperator<
  Fluid,
  Integer
> {
  static override internalName =
    "integrateddynamics:fluidstack_amount" as const;
  static override numericID = 37;
  static override nicknames = [
    "FluidstackAmount",
    "fluidstackAmount",
    "fluid_stack_amount",
    "fluidStackAmount",
    "fluid_amount",
    "fluidAmount",
  ];
  static override symbol = "amount";
  static override interactName = "fluidstackAmount";
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
        return fluid.getAmount();
      },
    });
  }
}
