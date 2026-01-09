import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_MAXSIZE extends BaseOperator<
  Item,
  Integer
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:itemstack_maxsize",
      nicknames: [
        "ItemstackMaxsize",
        "itemstack_max_size",
        "itemstackMaxSize",
        "maxSize",
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
      symbol: "maxsize",
      interactName: "itemstackMaxSize",
      function: (item: Item): Integer => {
        return item.getMaxSize();
      },
    });
  }
}
