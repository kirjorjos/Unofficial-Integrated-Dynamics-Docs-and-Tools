import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_OBJECT_FLUIDSTACK_ISRAWFLUIDEQUAL extends BaseOperator<
  Fluid,
  Operator<Fluid, iBoolean>
> {
  static override internalName =
    "integrateddynamics:fluidstack_israwfluidequal" as const;
  static override numericID = 40;
  static override nicknames = [
    "fluidstackIsRawEqual",
    "FluidstackIsrawfluidequal",
    "fluidstackIsrawfluidequal",
    "fluid_stack_israwfluidequal",
    "fluidStackIsrawfluidequal",
    "fluid_israwfluidequal",
    "isRawFluidEqual",
    "rawFluidEquals",
  ];
  static override symbol = "=Raw=";
  static override interactName = "fluidstackIsRawEqual";
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (fluid1: Fluid): TypeLambda<Fluid, iBoolean> => {
        return (fluid2: Fluid): iBoolean => {
          return new iBoolean(
            fluid1
              .getUniqueName()
              .valueOf()
              .replace(/\s\(\d+\)$/, "")
              .toLowerCase() ===
              fluid2
                .getUniqueName()
                .valueOf()
                .replace(/\s\(\d+\)$/, "")
                .toLowerCase()
          );
        };
      },
      flipTarget: "OBJECT_FLUIDSTACK_ISRAWFLUIDEQUAL",
    });
  }
}
