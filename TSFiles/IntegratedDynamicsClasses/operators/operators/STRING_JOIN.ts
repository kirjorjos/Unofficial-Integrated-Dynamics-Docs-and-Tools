import { TypeMap } from "HelperClasses/TypeMap";
import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iArray } from "IntegratedDynamicsClasses/typeWrappers/iArray";
import { Operator } from "../Operator";

export class OPERATOR_STRING_JOIN extends BaseOperator<
  iString,
  Operator<iArray<iString>, iString>
> {
  constructor(globalMap: TypeMap) {
    super({
      internalName: "integrateddynamics:string_join",
      nicknames: ["stringJoin"],
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
        globalMap
      ),
      symbol: "join",
      interactName: "stringJoin",
      function: (delimiter: iString): TypeLambda<iArray<iString>, iString> => {
        return (stringList: iArray<iString>): iString => {
          if (
            stringList
              .getRawValue()
              .some((item) => typeof item.valueOf() !== "string")
          ) {
            throw new Error("stringJoin expects a list of strings");
          }
          return new iString(
            stringList
              .getRawValue()
              .map((s) => s.valueOf())
              .join(delimiter.valueOf())
          );
        };
      },
    });
  }
}
