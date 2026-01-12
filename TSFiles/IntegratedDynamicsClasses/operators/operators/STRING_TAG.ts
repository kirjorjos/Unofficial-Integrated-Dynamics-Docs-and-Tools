import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Item } from "IntegratedDynamicsClasses/Item";

export class OPERATOR_STRING_TAG extends BaseOperator<iString, iArray<Item>> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:string_tag",
      nicknames: [
        "ItemstackTagStacks",
        "itemstack_tag_values",
        "itemstackTagValues",
        "item_tag_names",
        "itemTagNames",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: { type: "List", listType: { type: "Item" } },
        },
        globalMap
      ),
      symbol: "item_tag_values",
      interactName: "stringItemsByTag",
      function: (): never => {
        throw new Error(
          "Item tag values is infeasible without a registry. This is a placeholder function."
        );
      },
    });
  }
}
