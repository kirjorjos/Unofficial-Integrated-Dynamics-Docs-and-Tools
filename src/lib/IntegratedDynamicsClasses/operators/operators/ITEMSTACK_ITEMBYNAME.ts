import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

import { RegistryHub } from "lib/IntegratedDynamicsClasses/registries/registryHub";
import { Item } from "lib/IntegratedDynamicsClasses/Item";
import { Properties } from "lib/IntegratedDynamicsClasses/Properties";

export class OPERATOR_ITEMSTACK_ITEMBYNAME extends BaseOperator<iString, Item> {
  static override internalName =
    "integrateddynamics:itemstack_itembyname" as const;
  static override numericID = 189;
  static override nicknames = [
    "stringItemByName",
    "ItemstackByName",
    "itemstack_by_name",
    "itemstackByName",
    "item_by_name",
    "itemByName",
    "itembyname",
    "itemstackItembyname",
  ];
  static override symbol = "item_by_name";
  static override interactName = "stringItemByName";
  static override operatorName = "itembyname" as const;
  static override displayName = "Item By Name" as const;
  static override fullDisplayName = "Item Item By Name" as const;
  static override kind = "itemstack" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Item",
          },
        },
        normalizeSignature
      ),
      function: (name: iString): Item => {
        const itemRegistry = RegistryHub.itemRegistry;
        let key = name.valueOf().toLowerCase();
        const ItemConstructor =
          itemRegistry.items[key as keyof typeof itemRegistry.items];
        if (ItemConstructor) {
          return new ItemConstructor();
        }
        return new Item(new Properties({}));
      },
    });
  }
}
