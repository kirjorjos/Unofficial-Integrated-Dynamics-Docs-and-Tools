import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_BUCKET extends BaseOperator<
  Fluid,
  Item
> {
  static override internalName =
    "integrateddynamics:fluidstack_bucket" as const;
  static override numericID = 270;
  static override nicknames = [
    "FluidstackBucket",
    "fluidstackBucket",
    "fluid_stack_bucket",
    "fluidStackBucket",
    "fluid_bucket",
    "fluidBucket",
  ];
  static override symbol = "bucket";
  static override interactName = "fluidstackBucket";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "Item",
          },
        },
        normalizeSignature
      ),
      function: (fluid: Fluid): Item => {
        return fluid.getBucket();
      },
    });
  }
}
