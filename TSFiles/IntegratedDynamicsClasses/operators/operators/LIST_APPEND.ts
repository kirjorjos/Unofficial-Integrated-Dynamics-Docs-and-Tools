import { globalMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_LIST_APPEND extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<IntegratedValue, iArray<IntegratedValue>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:list_append",
      nicknames: ["listAppend", "append"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "List", listType: { type: "Any", typeID: 1 } },
          },
        },
        globalMap
      ),
      symbol: "append",
      interactName: "listAppend",
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<IntegratedValue, iArray<IntegratedValue>> => {
        return (element: IntegratedValue): iArray<IntegratedValue> => {
          return list.append(element);
        };
      },
    });
  }
}
