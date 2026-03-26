import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

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
  ];
  static override symbol = "burn_time";
  static override interactName = "itemstackBurnTime";
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
