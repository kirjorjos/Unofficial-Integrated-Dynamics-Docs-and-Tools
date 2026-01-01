import { TypeMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_LIST_COUNT_PREDICATE extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<Operator<IntegratedValue, iBoolean>, Integer>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:list_count_p",
      nicknames: ["listCountPredicate", "listCountP"],
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
              type: "Integer",
            },
          },
        },
        globalMap
      ),
      symbol: "count_p",
      interactName: "listCountPredicate",
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<Predicate, Integer> => {
        return (predicate: Predicate): Integer => {
          return list.filter((item) => predicate.apply(item)).size();
        };
      },
    });
  }
}
