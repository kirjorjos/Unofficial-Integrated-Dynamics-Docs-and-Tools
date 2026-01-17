import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_RARITY extends BaseOperator<
  Item,
  iString
> {
  constructor() {
    super({
      internalName: "integrateddynamics:itemstack_rarity",
      nicknames: [
        "ItemstackRarity",
        "itemstack_rarity",
        "itemstackRarity",
        "rarity",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "rarity",
      interactName: "itemstackRarity",
      function: (item: Item): iString => {
        return item.getRarity();
      },
    });
  }
}
