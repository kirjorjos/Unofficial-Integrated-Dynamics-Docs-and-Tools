import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_FLUIDSTACKCAPACITY extends BaseOperator<
  Item,
  Integer
> {
  static override internalName =
    "integrateddynamics:itemstack_fluidstackcapacity" as const;
  static override numericID = 55;
  static override nicknames = [
    "fluidCapatity",
    "fluidstackcapacity",
    "itemFluidCapacity",
    "itemFluidstackCapacity",
    "itemstackFluidCapacity",
    "itemstackFluidstackcapacity",
    "itemstackFluidstackCapacity",
    "ItemstackFluidstackcapacity",
    "fluid_capatity",
    "item_fluid_capacity",
    "item_fluidstack_capacity",
    "itemstack_fluid_capacity",
    "itemstack_fluidstack_capacity",
    "itemstack_fluidstackcapacity",
  ];
  static override symbol = "fluidstack_capacity";
  static override interactName = "itemstackFluidCapacity";
  static override operatorName = "fluidstackcapacity" as const;
  static override displayName = "Fluid Capacity" as const;
  static override fullDisplayName = "Item Fluid Capacity" as const;
  static override tooltipInfo =
    "The fluid capacity of the given item in mB" as const;

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
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (item: Item): Integer => {
        return item.getFluidCapacity();
      },
    });
  }
}
