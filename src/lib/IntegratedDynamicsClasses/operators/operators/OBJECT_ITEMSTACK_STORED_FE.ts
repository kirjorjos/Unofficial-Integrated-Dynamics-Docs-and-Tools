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
  static override stringDisplayNames = [
    "item fe stored",
    "item fe Stored",
    "item Fe stored",
    "item Fe Stored",
    "Item fe stored",
    "Item fe Stored",
    "Item Fe stored",
    "Item Fe Stored",
    "item FE stored",
    "item FE Stored",
    "Item FE stored",
    "Item FE Stored",
    "itemstack fe stored",
    "itemstack fe Stored",
    "itemstack Fe stored",
    "itemstack Fe Stored",
    "Itemstack fe stored",
    "Itemstack fe Stored",
    "Itemstack Fe stored",
    "Itemstack Fe Stored",
    "itemStack fe stored",
    "itemStack fe Stored",
    "itemStack Fe stored",
    "itemStack Fe Stored",
    "ItemStack fe stored",
    "ItemStack fe Stored",
    "ItemStack Fe stored",
    "ItemStack Fe Stored",
    "itemstack FE stored",
    "itemstack FE Stored",
    "Itemstack FE stored",
    "Itemstack FE Stored",
    "itemStack FE stored",
    "itemStack FE Stored",
    "ItemStack FE stored",
    "ItemStack FE Stored",
    "fe stored",
    "fe Stored",
    "Fe stored",
    "Fe Stored",
    "FE stored",
    "FE Stored",
  ];
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
