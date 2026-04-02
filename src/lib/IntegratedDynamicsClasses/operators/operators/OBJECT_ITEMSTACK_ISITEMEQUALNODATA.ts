import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OBJECT_ITEMSTACK_ISITEMEQUALNODATA extends BaseOperator<
  Item,
  Operator<Item, iBoolean>
> {
  static override internalName =
    "integrateddynamics:itemstack_isitemequalnodata" as const;
  static override numericID = 282;
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
      flipTarget: "OBJECT_ITEMSTACK_ISITEMEQUALNODATA",
    });
  }
}
