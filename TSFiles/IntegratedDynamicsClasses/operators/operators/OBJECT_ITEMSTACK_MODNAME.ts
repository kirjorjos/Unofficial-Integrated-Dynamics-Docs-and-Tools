import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_MODNAME extends BaseOperator<
  Item,
  iString
> {
  constructor() {
    super({
      internalName: "integrateddynamics:itemstack_mod",
      nicknames: ["ItemstackModname", "item_mod", "itemModname", "itemMod"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "String",
          },
        },
        globalMap
      ),
      symbol: "mod",
      interactName: "itemstackMod",
      function: (item: Item): iString => {
        return item.getModName();
      },
    });
  }
}
