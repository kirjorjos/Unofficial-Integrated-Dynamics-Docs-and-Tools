import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_MODNAME extends BaseOperator<
  Item,
  iString
> {
  static override internalName = "integrateddynamics:itemstack_mod" as const;
  static override nicknames = [
    "ItemstackModname",
    "item_mod",
    "itemModname",
    "itemMod",
  ];
  static override symbol = "mod";
  static override interactName = "itemstackMod";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Item",
        },
        to: {
          type: "String",
        },
      }),
      function: (item: Item): iString => {
        return item.getModName();
      },
    });
  }
}
