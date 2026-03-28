import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Block } from "lib/IntegratedDynamicsClasses/Block";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_BLOCK extends BaseOperator<
  Fluid,
  Block
> {
  static override internalName = "integrateddynamics:fluidstack_block" as const;
  static override numericID = 38;
  static override nicknames = [
    "FluidstackBlock",
    "fluidstackBlock",
    "fluid_stack_block",
    "fluidStackBlock",
    "fluid_block",
    "fluidBlock",
  ];
  static override symbol = "block";
  static override interactName = "fluidstackBlock";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "Block",
          },
        },
        normalizeSignature
      ),
      function: (fluid: Fluid): Block => {
        return fluid.getBlock();
      },
    });
  }
}
