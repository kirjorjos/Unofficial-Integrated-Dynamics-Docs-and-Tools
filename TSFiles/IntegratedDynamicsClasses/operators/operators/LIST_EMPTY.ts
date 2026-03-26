import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_LIST_EMPTY extends BaseOperator<
  iArray<IntegratedValue>,
  iBoolean
> {
  static override internalName = "integrateddynamics:list_empty" as const;
  static override numericID = 105;
  static override nicknames = ["listEmpty", "listIsEmpty"];
  static override symbol = "∅";
  static override interactName = "listIsEmpty";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Boolean",
          },
        },
        normalizeSignature
      ),
      function: (list: iArray<IntegratedValue>): iBoolean => {
        return list.size().equals(Integer.ZERO);
      },
    });
  }
}
