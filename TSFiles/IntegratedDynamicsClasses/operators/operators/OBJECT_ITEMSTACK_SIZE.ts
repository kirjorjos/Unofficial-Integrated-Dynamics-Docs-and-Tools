import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_SIZE extends BaseOperator<
  Item,
  Integer
> {
  static override internalName = "integrateddynamics:itemstack_size" as const;
  static override nicknames = [
    "ItemstackSize",
    "itemstack_size",
    "itemstackSize",
    "size",
  ];
  static override symbol = "size";
  static override interactName = "itemstackSize";
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
        return item.getSize();
      },
    });
  }
}
