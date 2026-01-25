import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Operator } from "../Operator";

export class OPERATOR_STRING_STARTS_WITH extends BaseOperator<
  iString,
  Operator<iString, iBoolean>
> {
  static override internalName =
    "integrateddynamics:string_starts_with" as const;
  constructor() {
    super({
      nicknames: ["startsWith", "stringStartsWith"],
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
      symbol: "starts_with",
      interactName: "stringStartsWith",
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
