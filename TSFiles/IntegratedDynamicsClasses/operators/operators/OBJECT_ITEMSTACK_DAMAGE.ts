import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_DAMAGE extends BaseOperator<
  Item,
  Integer
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:itemstack_damage",
      nicknames: [
        "ItemstackDamage",
        "itemstack_damage",
        "itemstackDamage",
        "damage",
      ],
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
        globalMap
      ),
      symbol: "damage",
      interactName: "itemstackDamage",
      function: (item: Item): Integer => {
        return item.getDamage();
      },
    });
  }
}
