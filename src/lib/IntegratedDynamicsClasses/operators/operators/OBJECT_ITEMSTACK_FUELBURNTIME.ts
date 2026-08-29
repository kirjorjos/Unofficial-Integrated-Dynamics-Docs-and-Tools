import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_FUELBURNTIME extends BaseOperator<
  Item,
  Integer
> {
  static override internalName =
    "integrateddynamics:itemstack_burntime" as const;
  static override numericID = 49;
  static override nicknames = [
    "burntime",
    "fuelBurnTime",
    "itemFuelBurnTime",
    "itemstackBurntime",
    "itemstackBurnTime",
    "ItemstackFuelburntime",
    "fuel_burn_time",
    "item_fuel_burn_time",
    "itemstack_burn_time",
    "itemstack_burntime",
    "itemstack_fuelburntime",
  ];
  static override symbol = "burn_time";
  static override interactName = "itemstackBurnTime";
  static override operatorName = "burntime" as const;
  static override displayName = "Fuel Burn Time" as const;
  static override fullDisplayName = "Item Fuel Burn Time" as const;
  static override stringDisplayNames = [
    "item fuel burn time",
    "item fuel burn Time",
    "item fuel Burn time",
    "item fuel Burn Time",
    "item Fuel burn time",
    "item Fuel burn Time",
    "item Fuel Burn time",
    "item Fuel Burn Time",
    "Item fuel burn time",
    "Item fuel burn Time",
    "Item fuel Burn time",
    "Item fuel Burn Time",
    "Item Fuel burn time",
    "Item Fuel burn Time",
    "Item Fuel Burn time",
    "Item Fuel Burn Time",
    "itemstack fuel burn time",
    "itemstack fuel burn Time",
    "itemstack fuel Burn time",
    "itemstack fuel Burn Time",
    "itemstack Fuel burn time",
    "itemstack Fuel burn Time",
    "itemstack Fuel Burn time",
    "itemstack Fuel Burn Time",
    "Itemstack fuel burn time",
    "Itemstack fuel burn Time",
    "Itemstack fuel Burn time",
    "Itemstack fuel Burn Time",
    "Itemstack Fuel burn time",
    "Itemstack Fuel burn Time",
    "Itemstack Fuel Burn time",
    "Itemstack Fuel Burn Time",
    "itemStack fuel burn time",
    "itemStack fuel burn Time",
    "itemStack fuel Burn time",
    "itemStack fuel Burn Time",
    "itemStack Fuel burn time",
    "itemStack Fuel burn Time",
    "itemStack Fuel Burn time",
    "itemStack Fuel Burn Time",
    "ItemStack fuel burn time",
    "ItemStack fuel burn Time",
    "ItemStack fuel Burn time",
    "ItemStack fuel Burn Time",
    "ItemStack Fuel burn time",
    "ItemStack Fuel burn Time",
    "ItemStack Fuel Burn time",
    "ItemStack Fuel Burn Time",
    "fuel burn time",
    "fuel burn Time",
    "fuel Burn time",
    "fuel Burn Time",
    "Fuel burn time",
    "Fuel burn Time",
    "Fuel Burn time",
    "Fuel Burn Time",
  ];
  static override tooltipInfo =
    "The fuel burn time in ticks of the given item" as const;

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
        return item.getFuelBurnTime();
      },
    });
  }
}
