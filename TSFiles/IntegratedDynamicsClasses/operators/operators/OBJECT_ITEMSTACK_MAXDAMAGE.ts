import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_MAXDAMAGE extends BaseOperator<
  Item,
  Integer
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:itemstack_maxdamage",
      nicknames: [
        "ItemstackMaxdamage",
        "itemstack_max_damage",
        "itemstackMaxDamage",
        "maxDamage",
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
      symbol: "max_damage",
      interactName: "itemstackMaxDamage",
      function: (item: Item): Integer => {
        return item.getMaxDamage();
      },
    });
  }
}
