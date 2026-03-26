import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Operator } from "../Operator";

export class OPERATOR_STRING_JOIN extends BaseOperator<
  iString,
  Operator<iArray<iString>, iString>
> {
  static override internalName = "integrateddynamics:string_join" as const;
  static override numericID = 198;
  static override nicknames = ["stringJoin"];
  static override symbol = "join";
  static override interactName = "stringJoin";
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
