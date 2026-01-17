import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Fluid } from "IntegratedDynamicsClasses/Fluid";
import { Operator } from "../Operator";

export class OPERATOR_OBJECT_FLUIDSTACK_ISRAWFLUIDEQUAL extends BaseOperator<
  Fluid,
  Operator<Fluid, iBoolean>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:fluidstack_israwfluidequal",
      nicknames: [
        "FluidstackIsrawfluidequal",
        "fluidstackIsrawfluidequal",
        "fluid_stack_israwfluidequal",
        "fluidStackIsrawfluidequal",
        "fluid_stack_israwfluidequal",
        "fluid_israwfluidequal",
        "isRawFluidEqual",
        "rawFluidEquals",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Fluid",
          },
          to: {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "=Raw=",
      interactName: "fluidstackIsRawEqual",
      function: (fluid1: Fluid): TypeLambda<Fluid, iBoolean> => {
        return (fluid2: Fluid): iBoolean => {
          return new iBoolean(
            fluid1
              .getUname()
              .replace(new RegExp("\\s\\d+$"), "")
              .toLowerCase() ===
              fluid2
                .getUname()
                .replace(new RegExp("\\s\\d+$"), "")
                .toLowerCase()
          );
        };
      },
    });
  }
}
