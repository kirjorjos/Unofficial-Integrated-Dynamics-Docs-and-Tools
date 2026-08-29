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
    "itemstackRepaircost",
    "itemstackRepairCost",
    "ItemstackRepaircost",
    "repaircost",
    "repairCost",
    "itemstack_repair_cost",
    "itemstack_repaircost",
    "repair_cost",
  ];
  static override symbol = "repair_cost";
  static override interactName = "itemstackRepairCost";
  static override operatorName = "repaircost" as const;
  static override displayName = "Repair Cost" as const;
  static override fullDisplayName = "Item Repair Cost" as const;
  static override stringDisplayNames = [
    "item repair cost",
    "item repair Cost",
    "item Repair cost",
    "item Repair Cost",
    "Item repair cost",
    "Item repair Cost",
    "Item Repair cost",
    "Item Repair Cost",
    "itemstack repair cost",
    "itemstack repair Cost",
    "itemstack Repair cost",
    "itemstack Repair Cost",
    "Itemstack repair cost",
    "Itemstack repair Cost",
    "Itemstack Repair cost",
    "Itemstack Repair Cost",
    "itemStack repair cost",
    "itemStack repair Cost",
    "itemStack Repair cost",
    "itemStack Repair Cost",
    "ItemStack repair cost",
    "ItemStack repair Cost",
    "ItemStack Repair cost",
    "ItemStack Repair Cost",
    "repair cost",
    "repair Cost",
    "Repair cost",
    "Repair Cost",
  ];
  static override tooltipInfo = "The repair cost of the item" as const;

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
