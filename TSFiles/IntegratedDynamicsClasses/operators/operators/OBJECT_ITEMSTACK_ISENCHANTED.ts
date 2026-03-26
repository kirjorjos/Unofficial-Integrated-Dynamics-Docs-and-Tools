import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_ISENCHANTED extends BaseOperator<
  Item,
  iBoolean
> {
  static override internalName =
    "integrateddynamics:itemstack_enchanted" as const;
  static override numericID = 53;
  static override nicknames = [
    "ItemstackIsenchanted",
    "itemstack_is_enchanted",
    "itemstackIsEnchanted",
    "isEnchanted",
    "enchanted",
  ];
  static override symbol = "enchanted";
  static override interactName = "itemstackIsEnchanted";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (item: Item): iBoolean => {
        return item.isEnchanted();
      },
    });
  }
}
