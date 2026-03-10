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
  static override nicknames = [
    "ItemstackFuelburntime",
    "item_fuel_burn_time",
    "itemFuelBurnTime",
    "fuelBurnTime",
  ];
  static override symbol = "burn_time";
  static override interactName = "itemstackBurnTime";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: {
          type: "Integer",
        },
      }),
      function: (item: Item): Integer => {
        return item.getFuelBurnTime();
      },
    });
  }
}
