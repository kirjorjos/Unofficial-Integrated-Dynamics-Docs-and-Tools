import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";

export class OPERATOR_ITEMSTACK_CANBURN extends BaseOperator<Item, iBoolean> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:itemstack_canburn",
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
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "can_burn",
      interactName: "itemstackCanBurn",
      function: (item: Item): iBoolean => {
        return item.isFuel();
      },
    });
  }
}
