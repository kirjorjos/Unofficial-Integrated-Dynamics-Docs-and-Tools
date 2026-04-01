import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";

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
    "amount",
  ];
  static override symbol = "amount";
  static override interactName = "fluidstackAmount";
  static override operatorName = "amount" as const;
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
        return fluid.getAmount();
      },
    });
  }
}
