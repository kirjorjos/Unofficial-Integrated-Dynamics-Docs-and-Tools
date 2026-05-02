import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "lib/IntegratedDynamicsClasses/typeWrappers/iArray";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_STRING_JOIN extends BaseOperator<
  iString,
  Operator<iArray<iString>, iString>
> {
  static override internalName = "integrateddynamics:string_join" as const;
  static override numericID = 198;
  static override nicknames = [
    "generalJoin",
    "join",
    "stringJoin",
    "general_join",
    "string_join",
  ];
  static override symbol = "join";
  static override interactName = "stringJoin";
  static override operatorName = "join" as const;
  static override displayName = "Join" as const;
  static override fullDisplayName = "General Join" as const;
  static override kind = "general" as const;
  static override renderPattern = "PREFIX_2" as const;
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
            from: { type: "List", listType: { type: "String" } },
            to: {
              type: "String",
            },
          },
        },
        normalizeSignature
      ),
      function: (delimiter: iString): TypeLambda<iArray<iString>, iString> => {
        return (stringList: iArray<iString>): iString => {
          if (
            stringList
              .valueOf()
              .some((item) => typeof item.valueOf() !== "string")
          ) {
            throw new Error("stringJoin expects a list of strings");
          }
          return new iString(
            stringList
              .valueOf()
              .map((s) => s.valueOf())
              .join(delimiter.valueOf())
          );
        };
      },
    });
  }
}
