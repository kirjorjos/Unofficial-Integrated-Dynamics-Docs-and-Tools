import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

import { RegistryHub } from "IntegratedDynamicsClasses/registries/registryHub";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Properties } from "IntegratedDynamicsClasses/Properties";

export class OPERATOR_ITEMSTACK_ITEMBYNAME extends BaseOperator<iString, Item> {
  static override internalName =
    "integrateddynamics:itemstack_itembyname" as const;
  static override nicknames = [
    "stringItemByName",
    "ItemstackByName",
    "itemstack_by_name",
    "itemstackByName",
    "item_by_name",
    "itemByName",
  ];
  static override symbol = "item_by_name";
  static override interactName = "stringItemByName";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "Item",
        },
      }),
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
