import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Integer } from "JavaNumberClasses/Integer";
import { Properties } from "IntegratedDynamicsClasses/Properties";
import { Operator } from "../Operator";

export class OPERATOR_OBJECT_ITEMSTACK_WITHSIZE extends BaseOperator<
  Item,
  Operator<Integer, Item>
> {
  static override internalName =
    "integrateddynamics:itemstack_withsize" as const;
  static override numericID = 108;
  static override nicknames = [
    "ItemstackWithSize",
    "itemstack_with_size",
    "itemstackWithSize",
    "itemWithSize",
  ];
  static override symbol = "with_size";
  static override interactName = "itemstackWithSize";
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
