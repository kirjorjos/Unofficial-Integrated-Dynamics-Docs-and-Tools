import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_RARITY extends BaseOperator<
  Fluid,
  iString
> {
  static override internalName =
    "integrateddynamics:fluidstack_rarity" as const;
  static override nicknames = [
    "FluidstackRarity",
    "fluidstackRarity",
    "fluid_stack_rarity",
    "fluidStackRarity",
    "fluid_rarity",
    "fluidRarity",
  ];
  static override symbol = "rarity";
  static override interactName = "fluidstackRarity";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Fluid",
        },
        to: {
          type: "String",
        },
      }),
      function: (fluid: Fluid): iString => {
        return fluid.getRarity();
      },
    });
  }
}
