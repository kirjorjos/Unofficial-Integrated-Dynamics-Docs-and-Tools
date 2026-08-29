import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";

export class OPERATOR_LIST_ELEMENT_DEFAULT extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<Integer, Operator<IntegratedValue, IntegratedValue>>
> {
  static override internalName =
    "integrateddynamics:list_get_or_default" as const;
  static override numericID = 143;
  static override nicknames = [
    "getOrDefault",
    "listElementDefault",
    "listGetOrDefault",
    "get_or_default",
    "list_element_default",
    "list_get_or_default",
    "listGet_or_default",
  ];
  static override symbol = "get_or_default";
  static override interactName = "listGetOrDefault";
  static override operatorName = "get_or_default" as const;
  static override displayName = "Get Or Default" as const;
  static override fullDisplayName = "List Get Or Default" as const;
  static override stringDisplayNames = [
    "get or default",
    "get or Default",
    "get Or default",
    "get Or Default",
    "Get or default",
    "Get or Default",
    "Get Or default",
    "Get Or Default",
    "list get or default",
    "list get or Default",
    "list get Or default",
    "list get Or Default",
    "list Get or default",
    "list Get or Default",
    "list Get Or default",
    "list Get Or Default",
    "List get or default",
    "List get or Default",
    "List get Or default",
    "List get Or Default",
    "List Get or default",
    "List Get or Default",
    "List Get Or default",
    "List Get Or Default",
  ];
  static override tooltipInfo =
    "Safely get the list element at the given position, if that element is not available, return the given default value." as const;

  static override kind = "list" as const;
  static override renderPattern = "INFIX_2_LONG" as const;
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
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Any", typeID: 1 },
            },
          },
        },
        normalizeSignature
      ),
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<Integer, TypeLambda<IntegratedValue, IntegratedValue>> => {
        return (
          index: Integer
        ): TypeLambda<IntegratedValue, IntegratedValue> => {
          return (defaultValue: IntegratedValue): IntegratedValue => {
            return list.getOrDefault(index, defaultValue);
          };
        };
      },
    });
  }
}
