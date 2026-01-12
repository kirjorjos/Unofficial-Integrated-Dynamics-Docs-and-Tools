import { TypeMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";

export class OPERATOR_LIST_ELEMENT extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<Integer, IntegratedValue>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:list_get",
      nicknames: ["listElement", "get", "listGet"],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: { type: "Any", typeID: 1 },
          },
        },
        globalMap
      ),
      symbol: "get",
      interactName: "listGet",
      function: (
        index: Integer
      ): TypeLambda<iArray<IntegratedValue>, IntegratedValue> => {
        return (list: iArray<IntegratedValue>): IntegratedValue => {
          return list.get(index);
        };
      },
    });
  }
}
