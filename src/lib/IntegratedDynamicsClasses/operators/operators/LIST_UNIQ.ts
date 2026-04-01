import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_LIST_UNIQ extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<IntegratedValue, iArray<IntegratedValue>>
> {
  static override internalName = "integrateddynamics:list_uniq" as const;
  static override numericID = 136;
  static override nicknames = ["listUnique", "listUniq", "uniq"];
  static override symbol = "uniq";
  static override interactName = "listUnique";
  static override operatorName = "uniq" as const;
  static override kind = "list" as const;
  static override renderPattern = "PREFIX_1_LONG" as const;
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
        const seen = new Set();
        return list.filter((item) => {
          if (seen.has(item)) {
            return false;
          } else {
            seen.add(item);
            return true;
          }
        });
      },
    });
  }
}
