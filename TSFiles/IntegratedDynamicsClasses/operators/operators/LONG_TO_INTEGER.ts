import { BaseOperator } from "../BaseOperator";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Long } from "JavaNumberClasses/Long";
import { Integer } from "JavaNumberClasses/Integer";

export class OPERATOR_LONG_TO_INTEGER extends BaseOperator<Long, Integer> {
  static override internalName =
    "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_integer" as const;
  static override nicknames = ["longToInt", "longInteger", "longToInteger"];
  static override symbol = "()";
  static override interactName = "longLongToInteger";
  constructor() {
    super({
      parsedSignature: new ParsedSignature({
        type: "Function",
        from: {
          type: "Long",
        },
        to: {
          type: "Integer",
        },
      }),
      function: (long: Long): Integer => {
        return long.toInteger();
      },
    });
  }
}
