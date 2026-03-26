import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_LIST_ELEMENT extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<Integer, IntegratedValue>
> {
  static override internalName = "integrateddynamics:list_get" as const;
  static override numericID = 66;
  static override nicknames = ["listElement", "get", "listGet"];
  static override symbol = "get";
  static override interactName = "listGet";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: { type: "Any", typeID: 1 },
          },
        },
        normalizeSignature
      ),
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<Integer, IntegratedValue> => {
        return (index: Integer): IntegratedValue => {
          return list.get(index);
        };
      },
    });
  }
}
