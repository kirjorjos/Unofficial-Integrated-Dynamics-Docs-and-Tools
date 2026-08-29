import { Ingredients } from "lib/IntegratedDynamicsClasses/Ingredients";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_INGREDIENTS_WITH_FLUID extends BaseOperator<
  Ingredients,
  Operator<Integer, Operator<Fluid, Ingredients>>
> {
  static override internalName =
    "integrateddynamics:ingredients_with_fluid" as const;
  static override numericID = 180;
  static override nicknames = [
    "Ingr.withFluid",
    "ingredientsWithFluid",
    "withFluid",
    "Ingr.with_fluid",
    "ingredients_with_fluid",
    "ingredientsWith_fluid",
    "with_fluid",
  ];
  static override symbol = "Ingr.with_fluid";
  static override interactName = "ingredientsWithFluid";
  static override operatorName = "with_fluid" as const;
  static override displayName = "Ingredients With Fluid" as const;
  static override fullDisplayName =
    "Ingredients Ingredients With Fluid" as const;
  static override stringDisplayNames = [
    "ingredients with fluid",
    "ingredients with Fluid",
    "ingredients With fluid",
    "ingredients With Fluid",
    "Ingredients with fluid",
    "Ingredients with Fluid",
    "Ingredients With fluid",
    "Ingredients With Fluid",
    "ingredients with fluidstack",
    "ingredients with Fluidstack",
    "ingredients with fluidStack",
    "ingredients with FluidStack",
    "ingredients With fluidstack",
    "ingredients With Fluidstack",
    "ingredients With fluidStack",
    "ingredients With FluidStack",
    "Ingredients with fluidstack",
    "Ingredients with Fluidstack",
    "Ingredients with fluidStack",
    "Ingredients with FluidStack",
    "Ingredients With fluidstack",
    "Ingredients With Fluidstack",
    "Ingredients With fluidStack",
    "Ingredients With FluidStack",
    "ingredients ingredients with fluid",
    "ingredients ingredients with Fluid",
    "ingredients ingredients With fluid",
    "ingredients ingredients With Fluid",
    "ingredients Ingredients with fluid",
    "ingredients Ingredients with Fluid",
    "ingredients Ingredients With fluid",
    "ingredients Ingredients With Fluid",
    "Ingredients ingredients with fluid",
    "Ingredients ingredients with Fluid",
    "Ingredients ingredients With fluid",
    "Ingredients ingredients With Fluid",
    "Ingredients Ingredients with fluid",
    "Ingredients Ingredients with Fluid",
    "Ingredients Ingredients With fluid",
    "Ingredients Ingredients With Fluid",
    "ingredients ingredients with fluidstack",
    "ingredients ingredients with Fluidstack",
    "ingredients ingredients with fluidStack",
    "ingredients ingredients with FluidStack",
    "ingredients ingredients With fluidstack",
    "ingredients ingredients With Fluidstack",
    "ingredients ingredients With fluidStack",
    "ingredients ingredients With FluidStack",
    "ingredients Ingredients with fluidstack",
    "ingredients Ingredients with Fluidstack",
    "ingredients Ingredients with fluidStack",
    "ingredients Ingredients with FluidStack",
    "ingredients Ingredients With fluidstack",
    "ingredients Ingredients With Fluidstack",
    "ingredients Ingredients With fluidStack",
    "ingredients Ingredients With FluidStack",
    "Ingredients ingredients with fluidstack",
    "Ingredients ingredients with Fluidstack",
    "Ingredients ingredients with fluidStack",
    "Ingredients ingredients with FluidStack",
    "Ingredients ingredients With fluidstack",
    "Ingredients ingredients With Fluidstack",
    "Ingredients ingredients With fluidStack",
    "Ingredients ingredients With FluidStack",
    "Ingredients Ingredients with fluidstack",
    "Ingredients Ingredients with Fluidstack",
    "Ingredients Ingredients with fluidStack",
    "Ingredients Ingredients with FluidStack",
    "Ingredients Ingredients With fluidstack",
    "Ingredients Ingredients With Fluidstack",
    "Ingredients Ingredients With fluidStack",
    "Ingredients Ingredients With FluidStack",
  ];
  static override tooltipInfo =
    "Get a copy of the given ingredients with the given fluid at the given ingredient position" as const;

  static override kind = "ingredients" as const;
  static override renderPattern = "INFIX_2_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Ingredients",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "Fluid",
              },
              to: {
                type: "Ingredients",
              },
            },
          },
        },
        normalizeSignature
      ),
      function: (
        ingredients: Ingredients
      ): TypeLambda<Integer, TypeLambda<Fluid, Ingredients>> => {
        return (index: Integer): TypeLambda<Fluid, Ingredients> => {
          return (fluid: Fluid): Ingredients => {
            return ingredients.setFluid(fluid, index);
          };
        };
      },
    });
  }
}
