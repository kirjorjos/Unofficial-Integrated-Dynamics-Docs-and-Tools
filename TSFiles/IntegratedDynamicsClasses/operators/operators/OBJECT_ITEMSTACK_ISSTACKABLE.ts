import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_ISSTACKABLE extends BaseOperator<
  Item,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:itemstack_stackable" as const;
  static override nicknames = [
    "ItemstackIsstackable",
    "itemstack_is_stackable",
    "itemstackIsStackable",
    "isStackable",
  ];
  static override symbol = "stackable";
  static override interactName = "itemstackIsStackable";
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
        return item.isStackable();
      },
    });
  }
}
