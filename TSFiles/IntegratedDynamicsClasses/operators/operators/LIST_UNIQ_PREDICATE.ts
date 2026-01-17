import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { globalMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";

export class OPERATOR_LIST_UNIQ_PREDICATE extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<
    Operator<IntegratedValue, Operator<IntegratedValue, iBoolean>>,
    iArray<IntegratedValue>
  >
> {
  constructor() {
    super({
      internalName: "integrateddynamics:list_uniq_p",
      nicknames: ["listUniqPredicate", "uniq_p", "list_uniq_p"],
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
        },
        globalMap
      ),
      symbol: "uniq_p",
      interactName: "listUniquePredicate",
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<Predicate<IntegratedValue>, iArray<IntegratedValue>> => {
        return (
          predicate: Predicate<IntegratedValue>
        ): iArray<IntegratedValue> => {
          const seen = new Set();
          return list.filter((item) => {
            const key = predicate.apply(item);
            if (seen.has(key)) {
              return false;
            } else {
              seen.add(key);
              return true;
            }
          });
        };
      },
    });
  }
}
