import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_REPAIRCOST extends BaseOperator<
  Item,
  Integer
> {
  static override internalName =
    "integrateddynamics:itemstack_repaircost" as const;
  static override numericID = 62;
  static override nicknames = [
    "ItemstackRepaircost",
    "itemstack_repair_cost",
    "itemstackRepairCost",
    "repairCost",
    "repaircost",
    "itemstackRepaircost",
  ];
  static override symbol = "repair_cost";
  static override interactName = "itemstackRepairCost";
  static override operatorName = "repaircost" as const;
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
            type: "Integer",
          },
        },
        normalizeSignature
      ),
      function: (item: Item): Integer => {
        return item.getRepairCost();
      },
    });
  }
}
