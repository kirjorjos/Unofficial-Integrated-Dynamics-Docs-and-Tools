import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_LIST_CONCAT extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<iArray<IntegratedValue>, iArray<IntegratedValue>>
> {
  static override internalName = "integrateddynamics:list_concat" as const;
  constructor() {
    super({
      nicknames: ["listConcat", "concat"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: { type: "List", listType: { type: "Any", typeID: 1 } },
        },
      }),
      symbol: "concat",
      interactName: "listConcat",
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
