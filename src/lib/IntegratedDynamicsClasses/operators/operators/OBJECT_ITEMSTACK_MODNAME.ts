import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_MODNAME extends BaseOperator<
  Item,
  iString
> {
  static override internalName = "integrateddynamics:itemstack_mod" as const;
  static override numericID = 60;
  static override nicknames = [
    "itemstackMod",
    "ItemstackModname",
    "item_mod",
    "itemModname",
    "itemMod",
    "mod",
  ];
  static override symbol = "mod";
  static override interactName = "itemstackMod";
  static override operatorName = "mod" as const;
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
            type: "String",
          },
        },
        normalizeSignature
      ),
      function: (item: Item): iString => {
        return item.getModName();
      },
    });
  }
}
