import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_STRING_SPLIT_ON extends BaseOperator<
  iString,
  Operator<iString, iArray<iString>>
> {
  static override internalName = "integrateddynamics:string_split_on" as const;
  static override numericID = 160;
  static override nicknames = ["stringSplitOn", "split_on", "stringSplit_on"];
  static override symbol = "split_on";
  static override interactName = "stringSplitOn";
  static override operatorName = "split_on" as const;
  static override kind = "string" as const;
  static override renderPattern = "INFIX" as const;
  constructor(normalizeSignature = true) {
    super({
      parsedSignature: new ParsedSignature(
        {
          type: "Function",
          from: {
            type: "String",
          },
          to: {
            type: "Function",
            from: {
              type: "String",
            },
            to: { type: "List", listType: { type: "String" } },
          },
        },
        normalizeSignature
      ),
      function: (delimiter: iString): TypeLambda<iString, iArray<iString>> => {
        return (fullString: iString): iArray<iString> => {
          return new iArrayEager(
            fullString
              .valueOf()
              .split(delimiter.valueOf())
              .map((s) => new iString(s))
          );
        };
      },
    });
  }
}
