import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_ITEMSTACK_CANBURN extends BaseOperator<Item, iBoolean> {
  static override internalName =
    "integrateddynamics:itemstack_canburn" as const;
  constructor() {
    super({
      nicknames: [
        "ItemstackCanburn",
        "item_can_burn",
        "itemCanBurn",
        "item_is_fuel",
        "itemIsFuel",
        "isFuel",
        "can_burn",
        "itemstackCanBurn",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: {
          type: "Boolean",
        },
      }),
      symbol: "can_burn",
      interactName: "itemstackCanBurn",
      function: (item: Item): iBoolean => {
        return item.isFuel();
      },
    });
  }
}
