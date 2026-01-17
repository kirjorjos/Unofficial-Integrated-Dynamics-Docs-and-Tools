import { globalMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";
import { iArrayLazy } from "IntegratedDynamicsClasses/typeWrappers/iArrayLazy";

export class OPERATOR_LIST_EQUALS_SET extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<iArray<IntegratedValue>, iBoolean>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:list_equals_set",
      nicknames: ["listEqualsSet", "equalsSet"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Boolean",
            },
          },
        },
        globalMap
      ),
      symbol: "=set=",
      interactName: "listEquals_set",
      function: (
        list1: iArray<IntegratedValue>
      ): TypeLambda<iArray<IntegratedValue>, iBoolean> => {
        return (list2: iArray<IntegratedValue>): iBoolean => {
          if (list1 instanceof iArrayLazy || list2 instanceof iArrayLazy)
            throw new Error("Equals Set not supported for infinite lists.");
          const set1 = new Set(list1.valueOf());
          const set2 = new Set(list2.valueOf());
          if (
            set1.size !== set2.size ||
            set1.size !== new Set([...set1, ...set2]).size
          )
            return new iBoolean(false);
          return new iBoolean(true);
        };
      },
    });
  }
}
