import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_LIST_APPEND extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<IntegratedValue, iArray<IntegratedValue>>
> {
  static override internalName = "integrateddynamics:list_append" as const;
  static override numericID = 113;
  static override nicknames = ["append", "listAppend", "list_append"];
  static override symbol = "append";
  static override interactName = "listAppend";
  static override operatorName = "append" as const;
  static override displayName = "Append" as const;
  static override fullDisplayName = "List Append" as const;
  static override tooltipInfo =
    "Append to the given list the given item." as const;

  static override kind = "list" as const;
  static override renderPattern = "INFIX" as const;
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
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
