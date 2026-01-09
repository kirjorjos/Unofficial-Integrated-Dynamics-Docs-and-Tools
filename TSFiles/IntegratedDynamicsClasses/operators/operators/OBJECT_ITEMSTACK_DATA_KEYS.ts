import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_OBJECT_ITEMSTACK_DATA_KEYS extends BaseOperator<
  Item,
  iArray<iString>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:itemstack_datakeys",
      nicknames: [
        "ItemstackDatakeys",
        "itemstack_data_keys",
        "itemstackDataKeys",
        "itemNBTKeys",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Item",
          },
          to: { type: "List", listType: { type: "String" } },
        },
        globalMap
      ),
      symbol: "data_keys",
      interactName: "itemStackDataKeys",
      function: (item: Item): iArray<iString> => {
        return item.getNBT().getAllKeys();
      },
    });
  }
}
