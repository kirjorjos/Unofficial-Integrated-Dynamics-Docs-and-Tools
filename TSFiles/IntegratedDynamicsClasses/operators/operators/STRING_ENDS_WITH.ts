import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "../Operator";

export class OPERATOR_STRING_ENDS_WITH extends BaseOperator<
  iString,
  Operator<iString, iBoolean>
> {
  static override internalName = "integrateddynamics:string_ends_with" as const;
  static override nicknames = ["endsWith", "stringEndsWith"];
  static override symbol = "ends_with";
  static override interactName = "stringEndsWith";
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
            to: {
              type: "Boolean",
            },
          },
        },
        normalizeSignature
      ),
      function: (substring: iString): TypeLambda<iString, iBoolean> => {
        return (fullString: iString): iBoolean => {
          return new iBoolean(
            fullString.valueOf().endsWith(substring.valueOf())
          );
        };
      },
    });
  }
}
