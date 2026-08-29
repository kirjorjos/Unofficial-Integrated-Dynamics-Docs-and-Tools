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
    "fluidIsrawfluidequal",
    "fluidstackIsRawEqual",
    "fluidstackIsrawfluidequal",
    "fluidStackIsrawfluidequal",
    "FluidstackIsrawfluidequal",
    "israwfluidequal",
    "isRawFluidEqual",
    "rawFluidEquals",
    "fluid_israwfluidequal",
    "fluid_stack_israwfluidequal",
    "fluidstack_is_raw_equal",
    "fluidstack_israwfluidequal",
    "is_raw_fluid_equal",
    "raw_fluid_equals",
  ];
  static override symbol = "=Raw=";
  static override interactName = "fluidstackIsRawEqual";
  static override operatorName = "israwfluidequal" as const;
  static override displayName = "Raw fluid equals" as const;
  static override fullDisplayName = "Fluid Raw fluid equals" as const;
  static override stringDisplayNames = [
    "fluid raw fluid equals",
    "fluid raw fluid Equals",
    "fluid raw Fluid equals",
    "fluid raw Fluid Equals",
    "fluid Raw fluid equals",
    "fluid Raw fluid Equals",
    "fluid Raw Fluid equals",
    "fluid Raw Fluid Equals",
    "Fluid raw fluid equals",
    "Fluid raw fluid Equals",
    "Fluid raw Fluid equals",
    "Fluid raw Fluid Equals",
    "Fluid Raw fluid equals",
    "Fluid Raw fluid Equals",
    "Fluid Raw Fluid equals",
    "Fluid Raw Fluid Equals",
    "fluid raw fluidstack equals",
    "fluid raw fluidstack Equals",
    "fluid raw Fluidstack equals",
    "fluid raw Fluidstack Equals",
    "fluid raw fluidStack equals",
    "fluid raw fluidStack Equals",
    "fluid raw FluidStack equals",
    "fluid raw FluidStack Equals",
    "fluid Raw fluidstack equals",
    "fluid Raw fluidstack Equals",
    "fluid Raw Fluidstack equals",
    "fluid Raw Fluidstack Equals",
    "fluid Raw fluidStack equals",
    "fluid Raw fluidStack Equals",
    "fluid Raw FluidStack equals",
    "fluid Raw FluidStack Equals",
    "Fluid raw fluidstack equals",
    "Fluid raw fluidstack Equals",
    "Fluid raw Fluidstack equals",
    "Fluid raw Fluidstack Equals",
    "Fluid raw fluidStack equals",
    "Fluid raw fluidStack Equals",
    "Fluid raw FluidStack equals",
    "Fluid raw FluidStack Equals",
    "Fluid Raw fluidstack equals",
    "Fluid Raw fluidstack Equals",
    "Fluid Raw Fluidstack equals",
    "Fluid Raw Fluidstack Equals",
    "Fluid Raw fluidStack equals",
    "Fluid Raw fluidStack Equals",
    "Fluid Raw FluidStack equals",
    "Fluid Raw FluidStack Equals",
    "fluidstack raw fluid equals",
    "fluidstack raw fluid Equals",
    "fluidstack raw Fluid equals",
    "fluidstack raw Fluid Equals",
    "fluidstack Raw fluid equals",
    "fluidstack Raw fluid Equals",
    "fluidstack Raw Fluid equals",
    "fluidstack Raw Fluid Equals",
    "Fluidstack raw fluid equals",
    "Fluidstack raw fluid Equals",
    "Fluidstack raw Fluid equals",
    "Fluidstack raw Fluid Equals",
    "Fluidstack Raw fluid equals",
    "Fluidstack Raw fluid Equals",
    "Fluidstack Raw Fluid equals",
    "Fluidstack Raw Fluid Equals",
    "fluidStack raw fluid equals",
    "fluidStack raw fluid Equals",
    "fluidStack raw Fluid equals",
    "fluidStack raw Fluid Equals",
    "fluidStack Raw fluid equals",
    "fluidStack Raw fluid Equals",
    "fluidStack Raw Fluid equals",
    "fluidStack Raw Fluid Equals",
    "FluidStack raw fluid equals",
    "FluidStack raw fluid Equals",
    "FluidStack raw Fluid equals",
    "FluidStack raw Fluid Equals",
    "FluidStack Raw fluid equals",
    "FluidStack Raw fluid Equals",
    "FluidStack Raw Fluid equals",
    "FluidStack Raw Fluid Equals",
    "fluidstack raw fluidstack equals",
    "fluidstack raw fluidstack Equals",
    "fluidstack raw Fluidstack equals",
    "fluidstack raw Fluidstack Equals",
    "fluidstack raw fluidStack equals",
    "fluidstack raw fluidStack Equals",
    "fluidstack raw FluidStack equals",
    "fluidstack raw FluidStack Equals",
    "fluidstack Raw fluidstack equals",
    "fluidstack Raw fluidstack Equals",
    "fluidstack Raw Fluidstack equals",
    "fluidstack Raw Fluidstack Equals",
    "fluidstack Raw fluidStack equals",
    "fluidstack Raw fluidStack Equals",
    "fluidstack Raw FluidStack equals",
    "fluidstack Raw FluidStack Equals",
    "Fluidstack raw fluidstack equals",
    "Fluidstack raw fluidstack Equals",
    "Fluidstack raw Fluidstack equals",
    "Fluidstack raw Fluidstack Equals",
    "Fluidstack raw fluidStack equals",
    "Fluidstack raw fluidStack Equals",
    "Fluidstack raw FluidStack equals",
    "Fluidstack raw FluidStack Equals",
    "Fluidstack Raw fluidstack equals",
    "Fluidstack Raw fluidstack Equals",
    "Fluidstack Raw Fluidstack equals",
    "Fluidstack Raw Fluidstack Equals",
    "Fluidstack Raw fluidStack equals",
    "Fluidstack Raw fluidStack Equals",
    "Fluidstack Raw FluidStack equals",
    "Fluidstack Raw FluidStack Equals",
    "fluidStack raw fluidstack equals",
    "fluidStack raw fluidstack Equals",
    "fluidStack raw Fluidstack equals",
    "fluidStack raw Fluidstack Equals",
    "fluidStack raw fluidStack equals",
    "fluidStack raw fluidStack Equals",
    "fluidStack raw FluidStack equals",
    "fluidStack raw FluidStack Equals",
    "fluidStack Raw fluidstack equals",
    "fluidStack Raw fluidstack Equals",
    "fluidStack Raw Fluidstack equals",
    "fluidStack Raw Fluidstack Equals",
    "fluidStack Raw fluidStack equals",
    "fluidStack Raw fluidStack Equals",
    "fluidStack Raw FluidStack equals",
    "fluidStack Raw FluidStack Equals",
    "FluidStack raw fluidstack equals",
    "FluidStack raw fluidstack Equals",
    "FluidStack raw Fluidstack equals",
    "FluidStack raw Fluidstack Equals",
    "FluidStack raw fluidStack equals",
    "FluidStack raw fluidStack Equals",
    "FluidStack raw FluidStack equals",
    "FluidStack raw FluidStack Equals",
    "FluidStack Raw fluidstack equals",
    "FluidStack Raw fluidstack Equals",
    "FluidStack Raw Fluidstack equals",
    "FluidStack Raw Fluidstack Equals",
    "FluidStack Raw fluidStack equals",
    "FluidStack Raw fluidStack Equals",
    "FluidStack Raw FluidStack equals",
    "FluidStack Raw FluidStack Equals",
    "raw fluid equals",
    "raw fluid Equals",
    "raw Fluid equals",
    "raw Fluid Equals",
    "Raw fluid equals",
    "Raw fluid Equals",
    "Raw Fluid equals",
    "Raw Fluid Equals",
    "raw fluidstack equals",
    "raw fluidstack Equals",
    "raw Fluidstack equals",
    "raw Fluidstack Equals",
    "raw fluidStack equals",
    "raw fluidStack Equals",
    "raw FluidStack equals",
    "raw FluidStack Equals",
    "Raw fluidstack equals",
    "Raw fluidstack Equals",
    "Raw Fluidstack equals",
    "Raw Fluidstack Equals",
    "Raw fluidStack equals",
    "Raw fluidStack Equals",
    "Raw FluidStack equals",
    "Raw FluidStack Equals",
  ];
  static override tooltipInfo = "If the raw fluids are equal" as const;

  static override kind = "fluidstack" as const;
  static override renderPattern = "INFIX" as const;
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
