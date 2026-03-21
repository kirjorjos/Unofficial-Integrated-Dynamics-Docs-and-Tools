import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_LIST_COUNT extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<IntegratedValue, Integer>
> {
  static override internalName = "integrateddynamics:list_count" as const;
  static override nicknames = ["listCount", "count"];
  static override symbol = "count";
  static override interactName = "listCount";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Integer",
            },
          },
        },
        normalizeSignature
      ),
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<IntegratedValue, Integer> => {
        return (element: IntegratedValue): Integer => {
          return list.filter((item) => item.equals(element).valueOf()).size();
        };
      },
    });
  }
}
