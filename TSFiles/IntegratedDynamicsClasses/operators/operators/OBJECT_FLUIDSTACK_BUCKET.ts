import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_BUCKET extends BaseOperator<
  Fluid,
  Item
> {
  static override internalName =
    "integrateddynamics:fluidstack_bucket" as const;
  constructor() {
    super({
      nicknames: [
        "FluidstackBucket",
        "fluidstackBucket",
        "fluid_stack_bucket",
        "fluidStackBucket",
        "fluid_stack_bucket",
        "fluid_bucket",
        "fluidBucket",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Fluid",
        },
        to: {
          type: "Item",
        },
      }),
      symbol: "bucket",
      interactName: "fluidstackBucket",
      function: (fluid: Fluid): Item => {
        return fluid.getBucket();
      },
    });
  }
}
