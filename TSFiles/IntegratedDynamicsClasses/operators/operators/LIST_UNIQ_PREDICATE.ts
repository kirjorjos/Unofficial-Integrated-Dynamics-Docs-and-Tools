import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_LIST_UNIQ_PREDICATE extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<
    Operator<IntegratedValue, Operator<IntegratedValue, iBoolean>>,
    iArray<IntegratedValue>
  >
> {
  static override internalName = "integrateddynamics:list_uniq_p" as const;
  static override nicknames = ["listUniqPredicate", "uniq_p", "list_uniq_p"];
  static override symbol = "uniq_p";
  static override interactName = "listUniquePredicate";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
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
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: {
                  type: "Boolean",
                },
              },
            },
          },
          to: { type: "List", listType: { type: "Any", typeID: 1 } },
        },
      }),
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<
        Operator<IntegratedValue, Predicate<IntegratedValue>>,
        iArray<IntegratedValue>
      > => {
        return (
          predicate: Operator<IntegratedValue, Predicate<IntegratedValue>>
        ): iArray<IntegratedValue> => {
          const uniqueItems: IntegratedValue[] = [];
          list.valueOf().forEach((item) => {
            let found = false;
            for (const uniqueItem of uniqueItems) {
              if (predicate.apply(item).apply(uniqueItem).valueOf()) {
                found = true;
                break;
              }
            }
            if (!found) {
              uniqueItems.push(item);
            }
          });
          return new iArrayEager(uniqueItems);
        };
      },
    });
  }
}
