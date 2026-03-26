import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

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
  ];
  static override symbol = "repair_cost";
  static override interactName = "itemstackRepairCost";
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
