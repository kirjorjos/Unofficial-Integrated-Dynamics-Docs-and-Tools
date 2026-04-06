import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";

export class OPERATOR_LIST_CONTAINS extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<IntegratedValue, iBoolean>
> {
  static override internalName = "integrateddynamics:list_contains" as const;
  static override numericID = 102;
  static override nicknames = ["listContains", "contains"];
  static override symbol = "contains";
  static override interactName = "listContains";
  static override operatorName = "contains" as const;
  static override displayName = "Contains" as const;
  static override fullDisplayName = "List Contains" as const;
  static override kind = "list" as const;
  static override renderPattern = "PREFIX_2_LONG" as const;
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
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<IntegratedValue, iBoolean> => {
        return (element: IntegratedValue): iBoolean => {
          return list.includes(element);
        };
      },
    });
  }
}
