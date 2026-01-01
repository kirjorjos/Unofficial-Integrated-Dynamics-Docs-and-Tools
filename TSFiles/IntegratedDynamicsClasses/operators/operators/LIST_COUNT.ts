import { TypeMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_LIST_COUNT extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<IntegratedValue, Integer>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:list_count",
      nicknames: ["listCount", "count"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Integer",
            },
          },
        },
        globalMap
      ),
      symbol: "count",
      interactName: "listCount",
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<IntegratedValue, Integer> => {
        return (element: IntegratedValue): Integer => {
          return list.filter((item) => item.equals(element).valueOf()).size();
        };
      },
    });
  }
}
