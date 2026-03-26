import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Operator } from "../Operator";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OBJECT_ITEMSTACK_ISDATAEQUAL extends BaseOperator<
  Item,
  Operator<Item, iBoolean>
> {
  static override internalName =
    "integrateddynamics:itemstack_isnbtequal" as const;
  static override numericID = 283;
  static override nicknames = [
    "itemstackIsNbtEqual",
    "ItemstackIsdataequal",
    "itemstack_is_dataequal",
    "itemstackIsDataequal",
  ];
  static override symbol = "=NBT=";
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
          const itemsEqual = item1
            .getUniqueName()
            .equals(item2.getUniqueName())
            .valueOf();
          if (!itemsEqual) return new iBoolean(false);
          return item1.getNBT().equals(item2.getNBT());
        };
      },
    });
  }
}
