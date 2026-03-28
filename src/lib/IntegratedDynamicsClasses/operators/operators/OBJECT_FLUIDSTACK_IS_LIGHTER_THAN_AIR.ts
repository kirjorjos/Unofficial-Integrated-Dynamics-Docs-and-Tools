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
  ];
  static override symbol = "lighter_than_air";
  static override interactName = "fluidstackIsLighterThanAir";
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
