import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_FE_CAPACITY extends BaseOperator<
  Item,
  Integer
> {
  static override internalName =
    "integrateddynamics:itemstack_fecapacity" as const;
  static override numericID = 188;
  static override nicknames = [
    "ItemstackFecapacity",
    "itemstack_fe_capacity",
    "itemstackFECapacity",
    "feCapacity",
    "fecapacity",
    "itemstackFecapacity",
  ];
  static override symbol = "fe_capacity";
  static override interactName = "itemstackFECapacity";
  static override operatorName = "fecapacity" as const;
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
        return item.getFeCapacity();
      },
    });
  }
}
