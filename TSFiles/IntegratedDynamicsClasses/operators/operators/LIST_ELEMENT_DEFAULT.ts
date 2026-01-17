import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Operator } from "../Operator";
import { globalMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";

export class OPERATOR_LIST_ELEMENT_DEFAULT extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<Integer, Operator<IntegratedValue, IntegratedValue>>
> {
  constructor() {
    super({
      internalName: "integrateddynamics:list_get_or_default",
      nicknames: [
        "listElementDefault",
        "get_or_default",
        "getOrDefault",
        "listGetOrDefault",
      ],
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Any", typeID: 1 },
            },
          },
        },
        globalMap
      ),
      symbol: "get_or_default",
      interactName: "listGetOrDefault",
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<Integer, TypeLambda<IntegratedValue, IntegratedValue>> => {
        return (
          index: Integer
        ): TypeLambda<IntegratedValue, IntegratedValue> => {
          return (defaultValue: IntegratedValue): IntegratedValue => {
            return list.getOrDefault(index, defaultValue);
          };
        };
      },
    });
  }
}
