import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_FE_CAPACITY extends BaseOperator<
  Item,
  Integer
> {
  constructor() {
    super({
      internalName: "integrateddynamics:itemstack_fecapacity",
      nicknames: [
        "ItemstackFecapacity",
        "itemstack_fe_capacity",
        "itemstackFECapacity",
        "feCapacity",
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
      symbol: "fe_capacity",
      interactName: "itemstackFECapacity",
      function: (item: Item): Integer => {
        return item.getFeCapacity();
      },
    });
  }
}
