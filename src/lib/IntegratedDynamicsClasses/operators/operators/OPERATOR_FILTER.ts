import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";

export class OPERATOR_OPERATOR_FILTER extends BaseOperator<
  Operator<IntegratedValue, iBoolean>,
  Operator<iArray<IntegratedValue>, iArray<IntegratedValue>>
> {
  static override internalName = "integrateddynamics:operator_filter" as const;
  static override numericID = 99;
  static override nicknames = ["filter", "operatorFilter", "operator_filter"];
  static override symbol = "filter";
  static override interactName = "operatorFilter";
  static override operatorName = "filter" as const;
  static override displayName = "Filter" as const;
  static override fullDisplayName = "Operator Filter" as const;
  static override tooltipInfo =
    "Filter a list of elements by matching them all with the given predicate." as const;

  static override kind = "operator" as const;
  static override renderPattern = "INFIX" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "Operator",
            obscured: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Boolean" },
            },
          },
          to: {
            type: "Function",
            from: {
              type: "List",
              listType: { type: "Any", typeID: 1 },
            },
            to: {
              type: "List",
              listType: { type: "Any", typeID: 1 },
            },
          },
        },
        normalizeSignature
      ),
      function: (
        predicate: Operator<IntegratedValue, iBoolean>
      ): TypeLambda<iArray<IntegratedValue>, iArray<IntegratedValue>> => {
        return (list: iArray<IntegratedValue>): iArray<IntegratedValue> => {
          return list.filter((item) => predicate.apply(item).valueOf());
        };
      },
    });
  }
}
