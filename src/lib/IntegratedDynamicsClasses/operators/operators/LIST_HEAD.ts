import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Integer } from "lib/JavaNumberClasses/Integer";

export class OPERATOR_LIST_HEAD extends BaseOperator<
  iArray<IntegratedValue>,
  IntegratedValue
> {
  static override internalName = "integrateddynamics:list_head" as const;
  static override numericID = 116;
  static override nicknames = ["listHead", "head"];
  static override symbol = "head";
  static override interactName = "listHead";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: { type: "Any", typeID: 1 },
        },
        normalizeSignature
      ),
      function: (list: iArray<IntegratedValue>): IntegratedValue => {
        if (list.size().equals(Integer.ZERO).valueOf()) {
          throw new Error("head called on an empty list");
        }
        return list.get(Integer.ZERO);
      },
    });
  }
}
