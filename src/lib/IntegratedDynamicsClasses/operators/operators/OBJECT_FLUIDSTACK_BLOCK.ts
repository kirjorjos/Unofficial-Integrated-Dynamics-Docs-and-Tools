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
    "block",
    "fluidBlock",
    "fluidstackBlock",
    "fluidStackBlock",
    "FluidstackBlock",
    "fluid_block",
    "fluid_stack_block",
    "fluidstack_block",
  ];
  static override symbol = "block";
  static override interactName = "fluidstackBlock";
  static override operatorName = "block" as const;
  static override displayName = "Block" as const;
  static override fullDisplayName = "Fluid Block" as const;
  static override tooltipInfo = "The block of the fluid" as const;

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
