import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Operator } from "../Operator";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OBJECT_ITEMSTACK_ISITEMEQUALNODATA extends BaseOperator<
  Item,
  Operator<Item, iBoolean>
> {
  static override internalName =
    "integrateddynamics:itemstack_isitemequalnodata" as const;
  static override nicknames = [
    "itemstackIsNbtEqual",
    "ItemstackIsitemequalnodata",
    "itemstack_is_itemequalnodata",
    "itemstackIsItemequalnodata",
  ];
  static override symbol = "=NoNBT=";
  static override interactName = "itemstackIsNbtEqual";
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
              type: "Item",
            },
            to: {
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
      function: (item1: Item): TypeLambda<Item, iBoolean> => {
        return (item2: Item): iBoolean => {
          return new iBoolean(
            item1.getUniqueName().valueOf() ===
              item2.getUniqueName().valueOf() &&
              item1.getSize().equals(item2.getSize()).valueOf()
          );
        };
      },
    });
  }
}
