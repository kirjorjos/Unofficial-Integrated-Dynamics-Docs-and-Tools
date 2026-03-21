import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_LIST_UNIQ extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<IntegratedValue, iArray<IntegratedValue>>
> {
  static override internalName = "integrateddynamics:list_uniq" as const;
  static override nicknames = ["listUnique", "listUniq"];
  static override symbol = "uniq";
  static override interactName = "listUnique";
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
