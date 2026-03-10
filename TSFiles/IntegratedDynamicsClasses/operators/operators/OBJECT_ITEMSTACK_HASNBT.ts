import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "IntegratedDynamicsClasses/Item";
import { Tag } from "IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag";

export class OPERATOR_OBJECT_ITEMSTACK_HASNBT extends BaseOperator<
  Item,
  iBoolean
> {
  static override internalName = "integrateddynamics:itemstack_hasnbt" as const;
  static override nicknames = [
    "itemStackHasNBT",
    "ItemstackHasnbt",
    "itemstack_has_nbt",
    "itemstackHasNBT",
    "hasNBT",
  ];
  static override symbol = "has_nbt";
  static override interactName = "itemStackHasNBT";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: {
          type: "Boolean",
        },
      }),
      function: (item: Item): iBoolean => {
        return new iBoolean(item.getNBT().getType() != Tag.TAG_NULL);
      },
    });
  }
}
