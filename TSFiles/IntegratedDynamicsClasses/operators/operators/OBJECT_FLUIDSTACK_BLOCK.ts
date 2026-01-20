import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Block } from "IntegratedDynamicsClasses/Block";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_BLOCK extends BaseOperator<
  Fluid,
  Block
> {
    static override internalName = "integrateddynamics:fluidstack_block"
  constructor() {
    super({
      nicknames: [
        "FluidstackBlock",
        "fluidstackBlock",
        "fluid_stack_block",
        "fluidStackBlock",
        "fluid_stack_block",
        "fluid_block",
        "fluidBlock",
      ],
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
        globalMap
      ),
      symbol: "block",
      interactName: "fluidstackBlock",
      function: (fluid: Fluid): Block => {
        return fluid.getBlock();
      },
    });
  }
}
