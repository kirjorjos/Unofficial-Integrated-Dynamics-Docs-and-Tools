import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";

export class OPERATOR_OBJECT_ITEMSTACK_ISRAWITEMEQUAL extends BaseOperator<
  Item,
  Operator<Item, iBoolean>
> {
  static override internalName =
    "integrateddynamics:itemstack_israwitemequal" as const;
  static override numericID = 57;
  static override nicknames = [
    "israwitemequal",
    "itemstackIsEqualRaw",
    "itemstackIsrawitemequal",
    "itemstackIsRawitemequal",
    "ItemstackIsrawitemequal",
    "rawItemEquals",
    "itemstack_is_equal_raw",
    "itemstack_is_rawitemequal",
    "itemstack_israwitemequal",
    "raw_item_equals",
  ];
  static override symbol = "=Raw=";
  static override interactName = "itemstackIsEqualRaw";
  static override operatorName = "israwitemequal" as const;
  static override displayName = "Raw item equals" as const;
  static override fullDisplayName = "Item Raw item equals" as const;
  static override tooltipInfo =
    "If the raw items of the given items are equal, ignoring NBT and damage value." as const;

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
            item1.getUniqueName().valueOf() === item2.getUniqueName().valueOf()
          );
        };
      },
    });
  }
}
