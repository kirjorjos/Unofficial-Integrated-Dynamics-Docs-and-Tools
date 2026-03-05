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
  constructor() {
    super({
      nicknames: [
        "ItemstackIsdataequal",
        "itemstack_is_dataequal",
        "itemstackIsDataequal",
        "=NBT=",
      ],
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
      symbol: "=NBT=",
      interactName: "itemstackIsNbtEqual",
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
