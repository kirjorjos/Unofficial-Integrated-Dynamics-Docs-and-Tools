import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";

export class OPERATOR_LIST_SLICE extends BaseOperator<
  iArray<IntegratedValue>,
  Operator<Integer, Operator<Integer, iArrayEager<IntegratedValue>>>
> {
  static override internalName = "integrateddynamics:list_slice" as const;
  static override numericID = 138;
  static override nicknames = ["listSlice", "slice"];
  static override symbol = "slice";
  static override interactName = "listSlice";
  static override operatorName = "slice" as const;
  static override displayName = "Slice" as const;
  static override fullDisplayName = "List Slice" as const;
  static override kind = "list" as const;
  static override renderPattern = "PREFIX_3" as const;
  constructor(normalizeSignature = true) {
    super({
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
        normalizeSignature
      ),
      function: (
        list: iArray<IntegratedValue>
      ): TypeLambda<Integer, TypeLambda<Integer, iArray<IntegratedValue>>> => {
        return (
          start: Integer
        ): TypeLambda<Integer, iArray<IntegratedValue>> => {
          return (end: Integer): iArray<IntegratedValue> => {
            if (start.lt(Integer.ZERO) || start.gte(end)) {
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
