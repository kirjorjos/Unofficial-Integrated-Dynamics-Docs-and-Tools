import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_LIGHT_LEVEL extends BaseOperator<
  Fluid,
  Integer
> {
  static override internalName =
    "integrateddynamics:fluidstack_light_level" as const;
  static override numericID = 271;
  static override nicknames = [
    "fluidLightLevel",
    "fluidstackLightLevel",
    "fluidStackLightLevel",
    "FluidstackLightLevel",
    "lightLevel",
    "fluid_light_level",
    "fluid_stack_light_level",
    "fluidstack_light_level",
    "fluidstackLight_level",
    "light_level",
  ];
  static override symbol = "light_level";
  static override interactName = "fluidstackLightLevel";
  static override operatorName = "light_level" as const;
  static override displayName = "Light level" as const;
  static override fullDisplayName = "Fluid Light level" as const;
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
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (fluid: Fluid): Integer => {
        return fluid.getLightLevel();
      },
    });
  }
}
