import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_REPAIRCOST extends BaseOperator<
  Item,
  Integer
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:itemstack_repaircost",
      nicknames: [
        "ItemstackRepaircost",
        "itemstack_repair_cost",
        "itemstackRepairCost",
        "repairCost",
      ],
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
        globalMap
      ),
      symbol: "repair_cost",
      interactName: "itemstackRepairCost",
      function: (item: Item): Integer => {
        return item.getRepairCost();
      },
    });
  }
}
