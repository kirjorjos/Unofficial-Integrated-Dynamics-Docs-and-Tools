import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { BaseOperator } from "../BaseOperator";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_ITEMSTACK_ITEMBYNAME extends BaseOperator<iString, Item> {
  static override internalName =
    "integrateddynamics:itemstack_itembyname" as const;
  constructor() {
    super({
      nicknames: [
        "ItemstackByName",
        "itemstack_by_name",
        "itemstackByName",
        "item_by_name",
        "itemByName",
      ],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "String",
        },
        to: {
          type: "Item",
        },
      }),
      symbol: "item_by_name",
      interactName: "stringItemByName",
      function: (): never => {
        throw new Error(
          "Item by name is infeasible without a registry. This is a placeholder function."
        );
      },
    });
  }
}
