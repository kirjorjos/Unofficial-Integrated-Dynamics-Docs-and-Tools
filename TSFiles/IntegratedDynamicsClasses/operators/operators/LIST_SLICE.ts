import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { TypeMap } from "HelperClasses/TypeMap";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "JavaNumberClasses/Integer";
import { BaseOperator } from "../BaseOperator";
import { Operator } from "../Operator";
import { iArrayEager } from "IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_LIST_SLICE extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<Integer, Operator<Integer, iArrayEager<IntegratedValue>>>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:list_slice",
      nicknames: ["listSlice", "slice"],
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
              from: {
                type: "Integer",
              },
              to: { type: "List", listType: { type: "Any", typeID: 1 } },
            },
          },
        },
        globalMap
      ),
      symbol: "slice",
      interactName: "listSlice",
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<Integer, TypeLambda<Integer, iArray<IntegratedValue>>> => {
        return (
          start: Integer
        ): TypeLambda<Integer, iArray<IntegratedValue>> => {
          return (end: Integer): iArray<IntegratedValue> => {
            if (
              start.lt(Integer.ZERO) ||
              end.gt(list.size()) ||
              start.gt(end)
            ) {
              throw new Error(
                `Invalid slice range: [${start.toString()}, ${end.toString()}) for list of length ${list.size().toString()}`
              );
            }
            return list.slice(start, end);
          };
        };
      },
    });
  }
}
