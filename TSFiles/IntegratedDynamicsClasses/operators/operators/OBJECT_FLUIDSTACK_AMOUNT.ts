import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_AMOUNT extends BaseOperator<
  Fluid,
  Integer
> {
    static override internalName = "integrateddynamics:fluidstack_amount"
  constructor() {
    super({
      nicknames: [
        "FluidstackAmount",
        "fluidstackAmount",
        "fluid_stack_amount",
        "fluidStackAmount",
        "fluid_stack_amount",
        "fluid_amount",
        "fluidAmount",
      ],
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
        globalMap
      ),
      symbol: "amount",
      interactName: "fluidstackAmount",
      function: (fluid: Fluid): Integer => {
        return fluid.getAmount();
      },
    });
  }
}
