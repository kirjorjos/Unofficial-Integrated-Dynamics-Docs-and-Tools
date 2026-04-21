import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Properties } from "lib/IntegratedDynamicsClasses/Properties";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_OBJECT_ITEMSTACK_WITHSIZE extends BaseOperator<
  Item,
  Operator<Integer, Item>
> {
  static override internalName =
    "integrateddynamics:itemstack_withsize" as const;
  static override numericID = 108;
  static override nicknames = [
    "itemstackWithsize",
    "itemstackWithSize",
    "ItemstackWithSize",
    "itemWithSize",
    "withsize",
    "item_with_size",
    "itemstack_with_size",
    "itemstack_withsize",
  ];
  static override symbol = "with_size";
  static override interactName = "itemstackWithSize";
  static override operatorName = "withsize" as const;
  static override displayName = "Item With Stacksize" as const;
  static override fullDisplayName = "Item Item With Stacksize" as const;
  static override tooltipInfo = "Set the stacksize for the given item" as const;

  static override kind = "itemstack" as const;
  static override renderPattern = "INFIX" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Item",
            },
          },
        },
        normalizeSignature
      ),
      function: (item: Item): TypeLambda<Integer, Item> => {
        return (size: Integer): Item => {
          return new Item(new Properties({ size }), item);
        };
      },
    });
  }
}
