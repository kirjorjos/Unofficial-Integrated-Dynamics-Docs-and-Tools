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
  constructor() {
    super({
      nicknames: [
        "FluidstackRarity",
        "fluidstackRarity",
        "fluid_stack_rarity",
        "fluidStackRarity",
        "fluid_stack_rarity",
        "fluid_rarity",
        "fluidRarity",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Fluid",
        },
        to: {
          type: "String",
        },
      }),
      symbol: "rarity",
      interactName: "fluidstackRarity",
      function: (fluid: Fluid): iString => {
        return fluid.getRarity();
      },
    });
  }
}
