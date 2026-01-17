import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_RARITY extends BaseOperator<
  Fluid,
  iString
> {
  constructor() {
    super({
      internalName: "integrateddynamics:fluidstack_rarity",
      nicknames: [
        "FluidstackRarity",
        "fluidstackRarity",
        "fluid_stack_rarity",
        "fluidStackRarity",
        "fluid_stack_rarity",
        "fluid_rarity",
        "fluidRarity",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "rarity",
      interactName: "fluidstackRarity",
      function: (fluid: Fluid): iString => {
        return new iString(fluid.getRarity());
      },
    });
  }
}
