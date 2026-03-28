import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_LIST_TAIL extends BaseOperator<
  iArray<IntegratedValue>,
  iArray<IntegratedValue>
> {
  static override internalName = "integrateddynamics:list_tail" as const;
  static override numericID = 117;
  static override nicknames = ["listTail", "tail"];
  static override symbol = "tail";
  static override interactName = "listTail";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: { type: "List", listType: { type: "Any", typeID: 1 } },
        },
        normalizeSignature
      ),
      function: (list: iArray<IntegratedValue>): iArray<IntegratedValue> => {
        if (list.size().equals(Integer.ZERO).valueOf()) {
          throw new Error("tail called on an empty list");
        }
        return list.slice(Integer.ONE);
      },
    });
  }
}
