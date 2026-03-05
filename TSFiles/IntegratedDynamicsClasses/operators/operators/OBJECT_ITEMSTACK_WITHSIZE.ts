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
  constructor() {
    super({
      nicknames: [
        "ItemstackWithSize",
        "itemstack_with_size",
        "itemstackWithSize",
        "itemWithSize",
      ],
      parsedSignature: new ParsedSignature({
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
      }),
      symbol: "with_size",
      interactName: "itemstackWithSize",
      function: (item: Item): TypeLambda<Integer, Item> => {
        return (size: Integer): Item => {
          return new Item(new Properties({ size }), item);
        };
      },
    });
  }
}
