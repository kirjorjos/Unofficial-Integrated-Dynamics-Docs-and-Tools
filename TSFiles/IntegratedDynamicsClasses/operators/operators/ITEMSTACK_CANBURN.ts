import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_ITEMSTACK_CANBURN extends BaseOperator<Item, iBoolean> {
  static override internalName =
    "integrateddynamics:itemstack_canburn" as const;
  static override nicknames = [
    "ItemstackCanburn",
    "item_can_burn",
    "itemCanBurn",
    "item_is_fuel",
    "itemIsFuel",
    "isFuel",
    "can_burn",
    "itemstackCanBurn",
  ];
  static override symbol = "can_burn";
  static override interactName = "itemstackCanBurn";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: {
          type: "Boolean",
        },
      }),
      function: (item: Item): iBoolean => {
        return item.isFuel();
      },
    });
  }
}
