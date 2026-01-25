import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "../Operator";

export class OPERATOR_STRING_CONTAINS extends BaseOperator<
  iString,
  Operator<iString, iBoolean>
> {
  static override internalName = "integrateddynamics:string_contains" as const;
  constructor() {
    super({
      nicknames: ["stringContains"],
      parsedSignature: new ParsedSignature({
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
      }),
      symbol: "contains",
      interactName: "stringContains",
      function: (substring: iString): TypeLambda<iString, iBoolean> => {
        return (fullString: iString): iBoolean => {
          return new iBoolean(
            fullString.valueOf().includes(substring.valueOf())
          );
        };
      },
    });
  }
}
