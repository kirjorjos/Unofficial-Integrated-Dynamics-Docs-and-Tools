import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class OPERATOR_STRING_ERROR extends BaseOperator<
  iString,
  IntegratedValue
> {
  static override internalName =
    "integrateddynamics:string_string_error" as const;
  constructor() {
    super({
      nicknames: ["error", "string_error"],
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "String",
        },
        to: { type: "Any", typeID: 1 },
      }),
      symbol: "error",
      interactName: "stringStringError",
      function: (message: iString): never => {
        throw new Error(`Error: ${message.valueOf()}`);
      },
    });
  }
}
