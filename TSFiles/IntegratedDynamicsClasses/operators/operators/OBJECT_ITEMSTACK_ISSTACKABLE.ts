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
  constructor() {
    super({
      nicknames: [
        "ItemstackIsstackable",
        "itemstack_is_stackable",
        "itemstackIsStackable",
        "isStackable",
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
      symbol: "stackable",
      interactName: "itemstackIsStackable",
      function: (item: Item): iBoolean => {
        return item.isStackable();
      },
    });
  }
}
