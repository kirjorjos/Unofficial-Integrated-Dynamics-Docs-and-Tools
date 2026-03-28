import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Item } from "lib/IntegratedDynamicsClasses/Item";

export class OPERATOR_STRING_TAG extends BaseOperator<iString, iArray<Item>> {
  static override internalName = "integrateddynamics:string_tag" as const;
  static override numericID = 202;
  static override nicknames = [
    "stringItemsByTag",
    "ItemstackTagStacks",
    "itemstack_tag_values",
    "itemstackTagValues",
    "item_tag_names",
    "itemTagNames",
  ];
  static override symbol = "item_tag_values";
  static override interactName = "stringItemsByTag";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: { type: "List", listType: { type: "Item" } },
        },
        normalizeSignature
      ),
      function: (): never => {
        throw new Error(
          "Item tag values is infeasible without a registry. This is a placeholder function."
        );
      },
    });
  }
}
