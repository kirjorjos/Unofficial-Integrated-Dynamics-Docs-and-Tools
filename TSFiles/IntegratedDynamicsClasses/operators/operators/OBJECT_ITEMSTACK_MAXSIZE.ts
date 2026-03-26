import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_MAXSIZE extends BaseOperator<
  Item,
  Integer
> {
  static override internalName =
    "integrateddynamics:itemstack_maxsize" as const;
  static override numericID = 59;
  static override nicknames = [
    "ItemstackMaxsize",
    "itemstack_max_size",
    "itemstackMaxSize",
    "maxSize",
  ];
  static override symbol = "maxsize";
  static override interactName = "itemstackMaxSize";
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
        return item.getMaxSize();
      },
    });
  }
}
