import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_STORED_FE extends BaseOperator<
  Item,
  Integer
> {
  static override internalName =
    "integrateddynamics:itemstack_storedfe" as const;
  static override nicknames = [
    "ItemstackStoredfe",
    "itemstack_stored_fe",
    "itemstackStoredFe",
    "item_stored_fe",
    "itemStoredFe",
    "storedFe",
  ];
  static override symbol = "stored_fe";
  static override interactName = "itemstackFeStored";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: {
          type: "Integer",
        },
      }),
      function: (item: Item): Integer => {
        return item.getFeStored();
      },
    });
  }
}
