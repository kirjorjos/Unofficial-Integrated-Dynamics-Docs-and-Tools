import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

import { RegistryHub } from "IntegratedDynamicsClasses/registries/registryHub";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Properties } from "IntegratedDynamicsClasses/Properties";

export class OPERATOR_ITEMSTACK_ITEMBYNAME extends BaseOperator<iString, Item> {
  static override internalName =
    "integrateddynamics:itemstack_itembyname" as const;
  constructor() {
    super({
      nicknames: [
        "ItemstackByName",
        "itemstack_by_name",
        "itemstackByName",
        "item_by_name",
        "itemByName",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "Item",
        },
      }),
      symbol: "item_by_name",
      interactName: "stringItemByName",
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
