import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "../Operator";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_LIST_CONTAINS_PREDICATE extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<Predicate<IntegratedValue>, iBoolean>
> {
  static override internalName = "integrateddynamics:list_contains_p" as const;
  static override nicknames = [
    "listContainsP",
    "listContainsPredicate",
    "containsPredicate",
    "containsP",
  ];
  static override symbol = "contains_p";
  static override interactName = "listContainsPredicate";
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: {
                  type: "Boolean",
                },
              },
            },
            to: {
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<Predicate<IntegratedValue>, iBoolean> => {
        return (predicate: Predicate<IntegratedValue>): iBoolean => {
          return list.some((item) => predicate.apply(item).valueOf());
        };
      },
    });
  }
}
