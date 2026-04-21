import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_MAXSIZE extends BaseOperator<
  Item,
  Integer
> {
  static override internalName =
    "integrateddynamics:itemstack_maxsize" as const;
  static override numericID = 59;
  static override nicknames = [
    "itemstackMaxsize",
    "itemstackMaxSize",
    "ItemstackMaxsize",
    "maxsize",
    "maxSize",
    "itemstack_max_size",
    "itemstack_maxsize",
    "max_size",
  ];
  static override symbol = "maxsize";
  static override interactName = "itemstackMaxSize";
  static override operatorName = "maxsize" as const;
  static override displayName = "Max size" as const;
  static override fullDisplayName = "Item Max size" as const;
  static override tooltipInfo = "The maximum stack size" as const;

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
        return item.getMaxSize();
      },
    });
  }
}
