import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_RARITY extends BaseOperator<
  Fluid,
  iString
> {
  static override internalName =
    "integrateddynamics:fluidstack_rarity" as const;
  static override numericID = 42;
  static override nicknames = [
    "FluidstackRarity",
    "fluidstackRarity",
    "fluid_stack_rarity",
    "fluidStackRarity",
    "fluid_rarity",
    "fluidRarity",
    "rarity",
  ];
  static override symbol = "rarity";
  static override interactName = "fluidstackRarity";
  static override operatorName = "rarity" as const;
  static override displayName = "Rarity" as const;
  static override fullDisplayName = "Fluid Rarity" as const;
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
            type: "String",
          },
        },
        normalizeSignature
      ),
      function: (fluid: Fluid): iString => {
        return fluid.getRarity();
      },
    });
  }
}
