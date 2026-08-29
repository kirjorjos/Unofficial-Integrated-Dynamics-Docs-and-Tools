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
    "fluidIsLighterThanAir",
    "fluidstackIsLighterThanAir",
    "fluidStackIsLighterThanAir",
    "FluidstackIsLighterThanAir",
    "fluidstackLighterThanAir",
    "isLighterThanAir",
    "lighterThanAir",
    "fluid_is_lighter_than_air",
    "fluid_stack_is_lighter_than_air",
    "fluidstack_is_lighter_than_air",
    "fluidstackLighter_than_air",
    "is_lighter_than_air",
    "lighter_than_air",
  ];
  static override symbol = "lighter_than_air";
  static override interactName = "fluidstackIsLighterThanAir";
  static override operatorName = "lighter_than_air" as const;
  static override displayName = "Is Lighter Than Air" as const;
  static override fullDisplayName = "Fluid Is Lighter Than Air" as const;
  static override stringDisplayNames = [
    "fluid is lighter than air",
    "fluid is lighter than Air",
    "fluid is lighter Than air",
    "fluid is lighter Than Air",
    "fluid is Lighter than air",
    "fluid is Lighter than Air",
    "fluid is Lighter Than air",
    "fluid is Lighter Than Air",
    "fluid Is lighter than air",
    "fluid Is lighter than Air",
    "fluid Is lighter Than air",
    "fluid Is lighter Than Air",
    "fluid Is Lighter than air",
    "fluid Is Lighter than Air",
    "fluid Is Lighter Than air",
    "fluid Is Lighter Than Air",
    "Fluid is lighter than air",
    "Fluid is lighter than Air",
    "Fluid is lighter Than air",
    "Fluid is lighter Than Air",
    "Fluid is Lighter than air",
    "Fluid is Lighter than Air",
    "Fluid is Lighter Than air",
    "Fluid is Lighter Than Air",
    "Fluid Is lighter than air",
    "Fluid Is lighter than Air",
    "Fluid Is lighter Than air",
    "Fluid Is lighter Than Air",
    "Fluid Is Lighter than air",
    "Fluid Is Lighter than Air",
    "Fluid Is Lighter Than air",
    "Fluid Is Lighter Than Air",
    "fluidstack is lighter than air",
    "fluidstack is lighter than Air",
    "fluidstack is lighter Than air",
    "fluidstack is lighter Than Air",
    "fluidstack is Lighter than air",
    "fluidstack is Lighter than Air",
    "fluidstack is Lighter Than air",
    "fluidstack is Lighter Than Air",
    "fluidstack Is lighter than air",
    "fluidstack Is lighter than Air",
    "fluidstack Is lighter Than air",
    "fluidstack Is lighter Than Air",
    "fluidstack Is Lighter than air",
    "fluidstack Is Lighter than Air",
    "fluidstack Is Lighter Than air",
    "fluidstack Is Lighter Than Air",
    "Fluidstack is lighter than air",
    "Fluidstack is lighter than Air",
    "Fluidstack is lighter Than air",
    "Fluidstack is lighter Than Air",
    "Fluidstack is Lighter than air",
    "Fluidstack is Lighter than Air",
    "Fluidstack is Lighter Than air",
    "Fluidstack is Lighter Than Air",
    "Fluidstack Is lighter than air",
    "Fluidstack Is lighter than Air",
    "Fluidstack Is lighter Than air",
    "Fluidstack Is lighter Than Air",
    "Fluidstack Is Lighter than air",
    "Fluidstack Is Lighter than Air",
    "Fluidstack Is Lighter Than air",
    "Fluidstack Is Lighter Than Air",
    "fluidStack is lighter than air",
    "fluidStack is lighter than Air",
    "fluidStack is lighter Than air",
    "fluidStack is lighter Than Air",
    "fluidStack is Lighter than air",
    "fluidStack is Lighter than Air",
    "fluidStack is Lighter Than air",
    "fluidStack is Lighter Than Air",
    "fluidStack Is lighter than air",
    "fluidStack Is lighter than Air",
    "fluidStack Is lighter Than air",
    "fluidStack Is lighter Than Air",
    "fluidStack Is Lighter than air",
    "fluidStack Is Lighter than Air",
    "fluidStack Is Lighter Than air",
    "fluidStack Is Lighter Than Air",
    "FluidStack is lighter than air",
    "FluidStack is lighter than Air",
    "FluidStack is lighter Than air",
    "FluidStack is lighter Than Air",
    "FluidStack is Lighter than air",
    "FluidStack is Lighter than Air",
    "FluidStack is Lighter Than air",
    "FluidStack is Lighter Than Air",
    "FluidStack Is lighter than air",
    "FluidStack Is lighter than Air",
    "FluidStack Is lighter Than air",
    "FluidStack Is lighter Than Air",
    "FluidStack Is Lighter than air",
    "FluidStack Is Lighter than Air",
    "FluidStack Is Lighter Than air",
    "FluidStack Is Lighter Than Air",
    "is lighter than air",
    "is lighter than Air",
    "is lighter Than air",
    "is lighter Than Air",
    "is Lighter than air",
    "is Lighter than Air",
    "is Lighter Than air",
    "is Lighter Than Air",
    "Is lighter than air",
    "Is lighter than Air",
    "Is lighter Than air",
    "Is lighter Than Air",
    "Is Lighter than air",
    "Is Lighter than Air",
    "Is Lighter Than air",
    "Is Lighter Than Air",
  ];
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
