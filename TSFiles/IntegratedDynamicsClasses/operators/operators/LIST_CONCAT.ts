import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_LIST_CONCAT extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<iArray<IntegratedValue>, iArray<IntegratedValue>>
> {
  static override internalName = "integrateddynamics:list_concat" as const;
  static override numericID = 139;
  static override nicknames = ["listConcat", "concat"];
  static override symbol = "concat";
  static override interactName = "listConcat";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: { type: "List", listType: { type: "Any", typeID: 1 } },
          },
        },
        normalizeSignature
      ),
      function: (
        list1: iArray<IntegratedValue>
      ): TypeLambda<iArray<IntegratedValue>, iArray<IntegratedValue>> => {
        return (list2: iArray<IntegratedValue>): iArray<IntegratedValue> => {
          return list1.concat(list2);
        };
      },
    });
  }
}
