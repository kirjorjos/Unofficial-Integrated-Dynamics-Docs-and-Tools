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
  constructor() {
    super({
      nicknames: [
        "ItemstackStoredfe",
        "itemstack_stored_fe",
        "itemstackStoredFe",
        "item_stored_fe",
        "itemStoredFe",
        "storedFe",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: {
          type: "Integer",
        },
      }),
      symbol: "stored_fe",
      interactName: "itemstackFeStored",
      function: (item: Item): Integer => {
        return item.getFeStored();
      },
    });
  }
}
