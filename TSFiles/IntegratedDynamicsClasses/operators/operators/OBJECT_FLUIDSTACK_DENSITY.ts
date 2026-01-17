import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";

export class OPERATOR_OBJECT_FLUIDSTACK_DENSITY extends BaseOperator<
  Fluid,
  Integer
> {
  constructor() {
    super({
      internalName: "integrateddynamics:fluidstack_density",
      nicknames: [
        "FluidstackDensity",
        "fluidstackDensity",
        "fluid_stack_density",
        "fluidStackDensity",
        "fluid_stack_density",
        "fluid_density",
        "fluidDensity",
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
      symbol: "density",
      interactName: "fluidstackDensity",
      function: (fluid: Fluid): Integer => {
        return fluid.getDensity();
      },
    });
  }
}
