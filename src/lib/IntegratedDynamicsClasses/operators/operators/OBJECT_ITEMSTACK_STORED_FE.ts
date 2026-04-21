import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_STORED_FE extends BaseOperator<
  Item,
  Integer
> {
  static override internalName =
    "integrateddynamics:itemstack_storedfe" as const;
  static override numericID = 191;
  static override nicknames = [
    "itemstackFeStored",
    "itemstackStoredfe",
    "itemstackStoredFe",
    "ItemstackStoredfe",
    "itemStoredFe",
    "storedfe",
    "storedFe",
    "item_stored_fe",
    "itemstack_fe_stored",
    "itemstack_stored_fe",
    "itemstack_storedfe",
    "stored_fe",
  ];
  static override symbol = "stored_fe";
  static override interactName = "itemstackFeStored";
  static override operatorName = "storedfe" as const;
  static override displayName = "FE Stored" as const;
  static override fullDisplayName = "Item FE Stored" as const;
  static override tooltipInfo = "The amount of FE stored in this item" as const;

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
        return item.getFeStored();
      },
    });
  }
}
