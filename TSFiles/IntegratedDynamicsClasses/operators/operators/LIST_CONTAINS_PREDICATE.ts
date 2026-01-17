import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "../Operator";
import { globalMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_LIST_CONTAINS_PREDICATE extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<Predicate<IntegratedValue>, iBoolean>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:list_contains_p",
      nicknames: [
        "listContainsP",
        "listContainsPredicate",
        "containsPredicate",
        "containsP",
      ],
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
        globalMap
      ),
      symbol: "contains_p",
      interactName: "listContainsPredicate",
      function: (
        predicate: Predicate<IntegratedValue>
      ): TypeLambda<iArray<IntegratedValue>, iBoolean> => {
        return (list: iArray<IntegratedValue>): iBoolean => {
          return list.some((item) => predicate.apply(item).valueOf());
        };
      },
    });
  }
}
