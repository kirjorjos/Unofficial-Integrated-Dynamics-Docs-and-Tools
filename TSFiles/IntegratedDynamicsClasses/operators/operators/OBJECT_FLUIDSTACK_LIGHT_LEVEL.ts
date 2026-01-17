import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_LIGHT_LEVEL extends BaseOperator<
  Fluid,
  Integer
> {
  constructor() {
    super({
      internalName: "integrateddynamics:fluidstack_light_level",
      nicknames: [
        "FluidstackLightLevel",
        "fluidstackLightLevel",
        "fluid_stack_light_level",
        "fluidStackLightLevel",
        "fluid_stack_light_level",
        "fluid_light_level",
        "fluidLightLevel",
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
      symbol: "light_level",
      interactName: "fluidstackLightLevel",
      function: (fluid: Fluid): Integer => {
        return fluid.getLightLevel();
      },
    });
  }
}
