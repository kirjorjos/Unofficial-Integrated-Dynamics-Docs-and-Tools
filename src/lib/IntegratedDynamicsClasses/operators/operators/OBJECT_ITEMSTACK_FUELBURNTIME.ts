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
    "itemstackBurnTime",
    "ItemstackFuelburntime",
    "item_fuel_burn_time",
    "itemFuelBurnTime",
    "fuelBurnTime",
    "burntime",
    "itemstackBurntime",
  ];
  static override symbol = "burn_time";
  static override interactName = "itemstackBurnTime";
  static override operatorName = "burntime" as const;
  static override displayName = "Fuel Burn Time" as const;
  static override fullDisplayName = "Item Fuel Burn Time" as const;
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
