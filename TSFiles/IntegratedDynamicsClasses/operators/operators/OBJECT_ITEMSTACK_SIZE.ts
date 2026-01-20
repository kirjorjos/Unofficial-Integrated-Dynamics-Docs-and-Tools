import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_SIZE extends BaseOperator<
  Item,
  Integer
> {
    static override internalName = "integrateddynamics:itemstack_size"
  constructor() {
    super({
      nicknames: ["ItemstackSize", "itemstack_size", "itemstackSize", "size"],
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
      symbol: "size",
      interactName: "itemstackSize",
      function: (item: Item): Integer => {
        return item.getSize();
      },
    });
  }
}
