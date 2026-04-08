import { BaseOperator } from "lib/IntegratedDynamicsClasses/operators/BaseOperator";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

export class OPERATOR_STRING_STARTS_WITH extends BaseOperator<
  iString,
  Operator<iString, iBoolean>
> {
  static override internalName =
    "integrateddynamics:string_starts_with" as const;
  static override numericID = 162;
  static override nicknames = [
    "startsWith",
    "stringStartsWith",
    "starts_with",
    "stringStarts_with",
  ];
  static override symbol = "starts_with";
  static override interactName = "stringStartsWith";
  static override operatorName = "starts_with" as const;
  static override displayName = "Starts With" as const;
  static override fullDisplayName = "String Starts With" as const;
  static override tooltipInfo =
    "If the given substring matches the start of the given string." as const;

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
            fullString.valueOf().startsWith(substring.valueOf())
          );
        };
      },
    });
  }
}
