import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_LIST_APPEND extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<IntegratedValue, iArray<IntegratedValue>>
> {
  static override internalName = "integrateddynamics:list_append" as const;
  constructor() {
    super({
      nicknames: ["listAppend", "append"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: { type: "List", listType: { type: "Any", typeID: 1 } },
        },
      }),
      symbol: "append",
      interactName: "listAppend",
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<IntegratedValue, iArray<IntegratedValue>> => {
        return (element: IntegratedValue): iArray<IntegratedValue> => {
          const listType = list.getSignatureNode().getOutput().getRootType();
          const elementType = element.getSignatureNode().getRootType();
          if (listType !== elementType)
            throw new Error(`Can't add ${elementType} to ${listType}[]`);
          return list.append(element);
        };
      },
    });
  }
}
