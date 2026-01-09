import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_ISDAMAGEABLE extends BaseOperator<
  Item,
  iBoolean
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:itemstack_damageable",
      nicknames: [
        "ItemstackIsdamageable",
        "itemstack_is_damageable",
        "itemstackIsDamageable",
        "isDamageable",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: {
            type: "Boolean",
          },
        },
        globalMap
      ),
      symbol: "damageable",
      interactName: "itemstackIsDamageable",
      function: (item: Item): iBoolean => {
        return item.isDamageable();
      },
    });
  }
}
