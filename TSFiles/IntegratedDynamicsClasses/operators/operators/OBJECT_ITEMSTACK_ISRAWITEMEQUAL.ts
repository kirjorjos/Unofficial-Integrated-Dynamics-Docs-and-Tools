import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Operator } from "../Operator";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OBJECT_ITEMSTACK_ISRAWITEMEQUAL extends BaseOperator<
  Item,
  Operator<Item, iBoolean>
> {
  static override internalName =
    "integrateddynamics:itemstack_israwitemequal" as const;
  static override nicknames = [
    "ItemstackIsrawitemequal",
    "itemstack_is_rawitemequal",
    "itemstackIsRawitemequal",
    "rawItemEquals",
  ];
  static override symbol = "=Raw=";
  static override interactName = "itemstackIsEqualRaw";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
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
      }),
      function: (item1: Item): TypeLambda<Item, iBoolean> => {
        return (item2: Item): iBoolean => {
          return new iBoolean(
            item1.getUniqueName().valueOf() === item2.getUniqueName().valueOf()
          );
        };
      },
    });
  }
}
