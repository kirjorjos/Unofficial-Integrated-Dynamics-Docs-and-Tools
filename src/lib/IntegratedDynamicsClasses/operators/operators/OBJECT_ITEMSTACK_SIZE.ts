import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_SIZE extends BaseOperator<
  Item,
  Integer
> {
  static override internalName = "integrateddynamics:itemstack_size" as const;
  static override numericID = 63;
  static override nicknames = [
    "ItemstackSize",
    "itemstack_size",
    "itemstackSize",
    "size",
  ];
  static override symbol = "size";
  static override interactName = "itemstackSize";
  static override operatorName = "size" as const;
  static override displayName = "Size" as const;
  static override fullDisplayName = "Item Size" as const;
  static override kind = "itemstack" as const;
  static override renderPattern = "SUFFIX_1_LONG" as const;
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
