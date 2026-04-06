import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_IS_LIGHTER_THAN_AIR extends BaseOperator<
  Fluid,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:fluidstack_lighter_than_air" as const;
  static override numericID = 272;
  static override nicknames = [
    "FluidstackIsLighterThanAir",
    "fluidstackIsLighterThanAir",
    "fluid_stack_is_lighter_than_air",
    "fluidStackIsLighterThanAir",
    "fluid_is_lighter_than_air",
    "fluidIsLighterThanAir",
    "isLighterThanAir",
    "lighter_than_air",
    "fluidstackLighter_than_air",
  ];
  static override symbol = "lighter_than_air";
  static override interactName = "fluidstackIsLighterThanAir";
  static override operatorName = "lighter_than_air" as const;
  static override displayName = "Is Lighter Than Air" as const;
  static override fullDisplayName = "Fluid Is Lighter Than Air" as const;
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
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (fluid: Fluid): iBoolean => {
        return fluid.isLighterThanAir();
      },
    });
  }
}
