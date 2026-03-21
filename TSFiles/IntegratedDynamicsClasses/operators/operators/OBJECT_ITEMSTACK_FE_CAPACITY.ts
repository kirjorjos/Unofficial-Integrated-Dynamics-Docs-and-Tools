import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_FE_CAPACITY extends BaseOperator<
  Item,
  Integer
> {
  static override internalName =
    "integrateddynamics:itemstack_fecapacity" as const;
  static override nicknames = [
    "ItemstackFecapacity",
    "itemstack_fe_capacity",
    "itemstackFECapacity",
    "feCapacity",
  ];
  static override symbol = "fe_capacity";
  static override interactName = "itemstackFECapacity";
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
        return item.getFeCapacity();
      },
    });
  }
}
