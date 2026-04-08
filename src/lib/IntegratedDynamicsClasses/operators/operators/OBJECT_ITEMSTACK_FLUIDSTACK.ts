import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Fluid } from "lib/IntegratedDynamicsClasses/Fluid";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_FLUIDSTACK extends BaseOperator<
  Item,
  Fluid
> {
  static override internalName =
    "integrateddynamics:itemstack_fluidstack" as const;
  static override numericID = 54;
  static override nicknames = [
    "itemstackFluidStack",
    "ItemstackFluidstack",
    "itemstack_fluidstack",
    "itemstackFluidstack",
    "itemFluidstack",
    "item_fluidstack",
    "itemFluid",
    "item_fluid",
    "itemstack_fluid",
    "itemstackFluid",
    "fluidstack",
  ];
  static override symbol = "fluidstack";
  static override interactName = "itemstackFluidStack";
  static override operatorName = "fluidstack" as const;
  static override displayName = "Fluid" as const;
  static override fullDisplayName = "Item Fluid" as const;
  static override tooltipInfo = "The fluid from the given item" as const;

  static override kind = "itemstack" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Fluid",
          },
        },
        normalizeSignature
      ),
      function: (item: Item): Fluid => {
        return item.getFluid();
      },
    });
  }
}
