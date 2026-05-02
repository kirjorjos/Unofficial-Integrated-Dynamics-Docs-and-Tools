import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_LIST_ELEMENT extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<Integer, IntegratedValue>
> {
  static override internalName = "integrateddynamics:list_get" as const;
  static override numericID = 66;
  static override nicknames = [
    "get",
    "listElement",
    "listGet",
    "list_element",
    "list_get",
  ];
  static override symbol = "get";
  static override interactName = "listGet";
  static override operatorName = "get" as const;
  static override displayName = "Get" as const;
  static override fullDisplayName = "List Get" as const;
  static override tooltipInfo =
    "Get the list element at the given position, throws an error if the index is out of bounds." as const;

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
